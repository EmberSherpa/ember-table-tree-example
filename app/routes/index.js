import Ember from 'ember';
import createData from '../utils/create-data';

export default Ember.Route.extend({
  model() {
    let columns = [
      {headerCellName: 'Name', contentPath: 'name'},
      {headerCellName: 'Open', contentPath: 'open'},
      {headerCellName: 'Close', contentPath: 'close'},
      {headerCellName: 'Highest', contentPath: 'highest'}
    ];
    return {
      columns: columns,
      data: createData(columns)
    }
  }
});
