import Ember from 'ember';

export default function(model_name) {
  return Ember.Mixin.create({
    record_count: Ember.computed(model_name + '.meta.{record-count,count}', function() {
      if (Ember.isPresent(this.get(model_name + '.meta.count'))) {
        return this.get(model_name + '.meta.count');
      }
      return this.get(model_name + '.meta.record-count');
    }),

    page_count: Ember.computed('record_count', 'page_size', function() {
      return Math.ceil(this.get('record_count') / this.get('page_size'));
    }),

    page_size: 10,
    page: 1,

    page_prev: Ember.computed('page', function() {
      if (this.get('page') > 1) {
        return this.get('page') - 1;
      }

      return null;
    }),

    page_next: Ember.computed('page', function() {
      if (this.get('page') < this.get('page_count')) {
        return this.get('page') + 1;
      }

      return null;
    }),

    is_page_first: Ember.computed.equal('page_prev', null),
    is_page_last: Ember.computed.equal('page_next', null),
    has_pages: Ember.computed.gt('page_count', 1),

    visible_pages: Ember.computed('page_count', 'page', function() {
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
