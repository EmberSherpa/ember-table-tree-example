import TableCellView from 'ember-table/views/table-cell';

export default TableCellView.extend({
  templateName: 'tree-table/collapsible-table-cell',
  classNameBindings: [
    'row.isCollapsed:is-collapsed:is-not-collapsed',
    'row.isLoading:is-loading'
    ]
});
