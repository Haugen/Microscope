// Check that the userId actually owns the document.
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}
