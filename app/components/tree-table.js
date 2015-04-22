import EmberTableComponent from 'ember-table/components/ember-table';

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
      .then(()=>{
        this.inject(row, data);
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
  }
});
