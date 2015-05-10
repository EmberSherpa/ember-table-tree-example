import Ember from 'ember';

Ember.Test.registerHelper('cell', function(app, row, cell){
  return app.$(`.ember-table-body-container .ember-table-table-row:eq(${row})`).find(`.ember-table-cell:eq(${cell})`);
});
