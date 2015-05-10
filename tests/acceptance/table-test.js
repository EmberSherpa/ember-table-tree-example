import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'ember-table-tree-example/tests/helpers/start-app';

let application, controller, model, firstRow, data;
let set = Ember.set;
let get = Ember.get;

module('Acceptance: Table', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
  andThen(function(){
    controller = lookup('controller:index');
    firstRow = controller.get('model.data.firstObject');
    assert.equal(get(firstRow, 'open'), 549.9061342592593, "open value of first row is as expected");
    set(firstRow, 'open', 52);
  });
  andThen(function(){
    assert.equal(cell(0, 1).text().trim(), "52", "value of open cell in first row is now 52");

    data = controller.get('model.data');
    data.replace(1, 1, [{id: 2, open: 123, close: 246, highest: 246}]);
  });
  andThen(function(){
    assert.equal(cell(1, 1).text().trim(), 123, "value of open cell in second row is 123 after row was replaced");
  });
  // andThen(function(){
  //   return new Ember.RSVP.Promise(function(){ debugger; });
  // });
  // return pauseTest();
});
