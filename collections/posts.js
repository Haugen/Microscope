// Collection for storing posts
Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
})

Posts.deny({
  update: function(userId, post, fieldNames) {
    // May only edit the following two fields.
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
})

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url});

    // Ensure the user is logged in.
    if (!user)
      throw new Meteor.Error(401, 'Dude, you need to log in to do that.');

    // Ensure the post has a title.
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Dude, your post needs a title.');

    // Ensure the post has an url.
    if (!postAttributes.url)
      throw new Meteor.Error(422, 'Dude, your post needs an url.');

    // Check that there are no previous posts with the same link.
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302,
        'Dude, this link has already been posted',
        postWithSameLink._id);
    }

    // Pick out the whitelisted key
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  }
})
