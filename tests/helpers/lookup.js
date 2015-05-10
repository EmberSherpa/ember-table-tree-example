import Ember from 'ember';

Ember.Test.registerHelper('lookup', function(app, type){
  return app.__container__.lookup(type);
});
