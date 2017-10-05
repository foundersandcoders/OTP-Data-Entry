const eventsController = {
  getAll: require('./get_all.js'),
  getSpecific: require('./get_specific.js'),
  deleteEvent: require('./delete_event.js'),
  addEvent: require('./modify_content.js'),
  renderForm: require('./render_form.js'),
  renderEditForm: require('./render_edit_form.js')
};

module.exports = eventsController;
