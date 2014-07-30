// Local error collection
Errors = new Meteor.Collection(null);

// Add an Error
throwError = function(message) {
  Errors.insert({ message: message, seen: false });
}
// Clear seen errors
clearErrors = function() {
  Errors.remove({ seen: true });
}

Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
})

Template.errors.rendered = function() {
  var error = this.data;
  Meteor.defer = function() {
    Errors.update(error._id, {$set {seen: true}});
  }
}
