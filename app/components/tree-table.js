import Ember from 'ember';
import EmberTableComponent from 'ember-table/components/ember-table';
import Row from 'ember-table/controllers/row';
import insert from '../utils/insert';

var get = Ember.get;

export default EmberTableComponent.extend({
  layoutName: 'components/ember-table',
  "fetch-data": null,
  expanded: [],
  loaded: [],
  loading: [],
  bodyContent: Ember.computed.filterBy('rows', 'isShowing', true),
  rows: Ember.computed('content.@each', 'expanded.@each', 'loading.@each', function(){
    let content = this.get('content');
    if (content == null) {
      return [];
    }
    let expanded = this.get('expanded');
    let loading = this.get('loading');
    return content.map((data)=>{
      let parent = get(data, 'parent');
      return Row.create({
        parentController: this,
        content: data,
        isCollapsed: expanded.indexOf(data) === -1,
        isShowing: parent == null || ( parent != null && expanded.indexOf(parent) !== -1 ),
        isLoading: loading.indexOf(data) !== -1
      });
    });
  }),
  isLoaded(data) {
    return this.get('loaded').indexOf(data) !== -1;
  },
  markLoaded(data) {
    return this.get('loaded').pushObject(data);
  },
  isExpanded(data) {
    return this.get('expanded').indexOf(data) !== -1;
  },
  collapse(data) {
    let expanded = this.get('expanded');
    let children = this.findChildren(expanded, data);
    let withoutChildren = expanded.without(parent).filter(function(item){
      return children.indexOf(item) === -1;
    });
    expanded.setObjects(withoutChildren);
  },
  findChildren(arr, parent) {
    return Array.prototype.concat.apply([parent], arr.filterBy('parent', parent).map((child)=>{
      return this.findChildren(arr, child);
    }));
  },
  expand(data) {
    this.get('expanded').pushObject(data);
  },
  showLoadingIndicator(data) {
    this.get('loading').pushObject(data);
  },
  hideLoadingIndicator(data) {
    let loading = this.get('loading');
    loading.setObjects(loading.without(data));
  },
  fetch(parent) {
    return new Ember.RSVP.Promise((resolve, reject)=>{
      let fetchData = this.get('fetch-data');
      if (fetchData == null) {
        reject('fetch-data is not implemented or not passed to tree-table component');
      }
      fetchData(parent).then(resolve, reject);
    });
  },
  inject(parent, data) {
    let contexted = data.map((datum)=>{
      return Ember.ObjectProxy.create({
        content: datum,
        parent: parent,
        indentation: ( get(parent, 'indentation') || 0 ) + 10
      });
    });
    let content = this.get('content');
    let parentIndex = content.indexOf(parent);
    insert(content, parentIndex+1, contexted);
  },
  actions: {
      toggleCollapse(parent) {
        if (this.isExpanded(parent)) {
          this.collapse(parent);
        } else if (this.isLoaded(parent)){
          this.expand(parent);
        } else {
          this.showLoadingIndicator(parent);
          this.fetch(parent)
            .then((data)=>{
              this.inject(parent, data);
              this.markLoaded(parent);
            })
            .finally(()=>{
              this.hideLoadingIndicator(parent);
            });
          this.expand(parent);
        }
      }
  }
});
