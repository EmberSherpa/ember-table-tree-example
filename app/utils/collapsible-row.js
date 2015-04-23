import Row from 'ember-table/controllers/row';

export default Row.extend({
  isCollapsed: true,
  isLoaded: false,
  parent: null,
  children: null,
  collapse() {
    let children = this.get('children');
    if (children) {
      children.invoke('collapse');
      children.setEach('isShowing', false);
    }
    this.set('isCollapsed', true);
  },
  expand() {
    let children = this.get('children');
    if (children) {
      children.setEach('isShowing', true);
    }
    this.set('isCollapsed', false);
  }
});
