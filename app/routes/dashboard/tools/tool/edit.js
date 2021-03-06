import Ember from 'ember';

export default Ember.Route.extend({



  model: function() {
    return Ember.RSVP.hash({
    tool: this.modelFor('dashboard.tools.tool'),
    employees: this.store.findAll('employee'),
  });

  },

  setupController: function(controller ,model) {
    controller.set('tool',model.tool);
    controller.set('employees', model.employees);
  }
});
