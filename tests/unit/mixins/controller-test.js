import EmberObject from '@ember/object';
import ControllerMixin from 'uncharted-pagination/mixins/controller';
import { module, test } from 'qunit';

module('Unit | Mixin | controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let ControllerObject = EmberObject.extend(ControllerMixin());
  let subject = ControllerObject.create();
  assert.ok(subject);
});
