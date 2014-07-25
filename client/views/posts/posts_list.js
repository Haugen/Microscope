// Helper function to make all posts available in postList template
Template.postsList.helpers({
  posts: function() {
    return Posts.find();
  }
});