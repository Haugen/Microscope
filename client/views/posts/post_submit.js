Template.postSubmit.events({
  'submit form.main': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
      message: $(e.target).find('[name=message]').val()
    }

    Meteor.call('post', post, function(error, id) {
      if (error) {
        // Add and display error to the user
        Errors.throw(error.reason);
        if (error.error === 302)
          Router.go('postPage', {_id: error.details});
      }
      else {
        Router.go('postPage', {_id: id});
      }
    });
  }
});
