// Example data for our posts
var postsData = [
  {
    title: 'Introducing Telescope',
    author: 'Sacha Greif',
    url: 'http://sachagreif.com/introducing-telescope/'
  },
  {
    title: 'Meteor',
    author: 'Tom Coleman',
    url: 'http://meteor.com/'
  },
  {
    title: 'Haugens Github (aaw yeah)',
    author: 'Tobias Haugen',
    url: 'https://github.com/Haugen'
  }
];

Template.postsList.helpers({
  posts: postsData
});