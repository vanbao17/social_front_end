export const formatArr = (comment) => {
  return {
    id: comment.ID,
    text: comment.content,
    author: comment.Name,
    idReply: comment.id_reply,
    level: 0,
    IDAccount: comment.IDAccount,
    replies: [],
  };
};

export const filterComment = (arr, target) => {
  return arr
    .map((comment) => {
      if (comment.id == target.IDComment) {
        return null;
      }
      if (comment.replies.length != 0) {
        return filterComment(comment.replies, target);
      }
      return comment;
    })
    .filter((comment) => comment != null);
};
