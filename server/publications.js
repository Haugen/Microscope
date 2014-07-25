// Make all posts via publish function.
Meteor.publish('posts', function() {
  return Posts.find();
})