import EmberTableComponent from 'ember-table/components/ember-table';
import CollapsibleRow from '../utils/collapsible-row';

var get = Ember.get;

export default EmberTableComponent.extend({
  layoutName: 'components/ember-table',
  "fetch-data": null,
  actions: {
      toggleCollapse(row) {
        let isCollapsed = get(row, 'isCollapsed');
        if (isCollapsed) {
          this.expand(row);
        } else {
          this.collapse(row);
        }
      }
  },
  createRows: Ember.on('didInsertElement', function(){
    let rows = this.get('content').map((rowData)=>{
      return this.createRow(rowData);
    });
    this.set('rows', rows);
  }),
  bodyContent: Ember.computed.filterBy('rows', 'isShowing', true),
  expand(row) {
    let isLoaded = get(row, 'isLoaded');
    if (isLoaded) {
      row.expand();
      this.notifyPropertyChange('rows');
      return;
    }
    row.set('isLoading', true);
    let fetchDataCallback = this.get('fetch-data');
    fetchDataCallback(row)
      .then((data)=>{
        this.inject(row, data);
        row.set('isLoaded', true);
        row.expand();
        this.notifyPropertyChange('rows');
      })
      .finally(()=>{
        row.set('isLoading', false);
      });
  },
  collapse(row) {
    row.collapse();
    this.notifyPropertyChange('rows');
  },
  createRow(rowData, parent) {
    return CollapsibleRow.create({
      parentController: this,
      content: rowData,
      parent: parent
    });
  },
  inject(parent, data) {
    let newRows = data.map((rowData)=>{
      return this.createRow(rowData, parent);
    });
    parent.set('children', newRows);
    let rows = this.get('rows');
    var merged = rows.reduce(function(accumulator, current){
      accumulator.pushObject(current);
      if (current === parent) {
        accumulator = accumulator.concat(newRows);
      }
      return accumulator;
    }, []);
    this.set('rows', merged);
  }
});
