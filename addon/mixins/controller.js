import { equal, gt } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default function(model_name) {
  return Mixin.create({
    record_count: computed(model_name + '.meta.{record-count,count}', function() {
      if (isPresent(this.get(model_name + '.meta.count'))) {
        return this.get(model_name + '.meta.count');
      }
      return this.get(model_name + '.meta.record-count');
    }),

    page_count: computed('record_count', 'page_size', function() {
      return Math.ceil(this.get('record_count') / this.get('page_size'));
    }),

    page_size: 10,
    page: 1,

    page_prev: computed('page', function() {
      if (this.get('page') > 1) {
        return this.get('page') - 1;
      }

      return null;
    }),

    page_next: computed('page', function() {
      if (this.get('page') < this.get('page_count')) {
        return this.get('page') + 1;
      }

      return null;
    }),

    is_page_first: equal('page_prev', null),
    is_page_last: equal('page_next', null),
    has_pages: gt('page_count', 1),

    visible_pages: computed('page_count', 'page', function() {
      var page = this.get('page');
      var page_count = this.get('page_count');
      var first = page - 2 < 1 ? 1 : page - 2;

      var records = [];
      for (var i = first; i <= page_count; i++) {
        records.push(i);
        if (records.length >= 5) {
          break;
        }
      }

      return records;
    })
  });
}
