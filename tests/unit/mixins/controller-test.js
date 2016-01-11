import Ember from 'ember';
import ControllerMixin from '../../../mixins/controller';
import { module, test } from 'qunit';

module('Unit | Mixin | controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let ControllerObject = Ember.Object.extend(ControllerMixin);
  let subject = ControllerObject.create();
  assert.ok(subject);
});
