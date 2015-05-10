import Ember from 'ember';

Ember.Test.registerHelper('row', function(app, index){
  return app.$(`.ember-table-body-container .ember-table-table-row:eq(${index})`);
});
