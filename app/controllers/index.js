import Ember from 'ember';
import Column from 'ember-table/models/column-definition';
import createData from '../utils/create-data';

var get = Ember.get;

export default Ember.Controller.extend({
  columns: Ember.computed.map('model.columns', function(column){
    var attrs = {};
    if (get(column, 'headerCellName') === 'Name') {
      attrs = {
        tableCellView: 'tree-table/collapsible-table-cell',
        textAlign: 'text-align-left'
      };
    }
    var attributes = Ember.merge(column, attrs);
    return Column.create(attributes);
  }),
  fetchDataCallback: Ember.computed('model.columns', function(){
    var columns = this.get('model.columns');
    return (row)=>{
      return Ember.RSVP.Promise((resolve)=>{
        Ember.run.later(()=>{
          resolve(createData(columns, 100, get(row, 'id')));
        }, 2000)
      });
    }
  })
});
