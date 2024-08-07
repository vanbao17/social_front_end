export const formatArr = (comment) => {
  return {
    id: comment.ID,
    text: comment.content,
    author: comment.Name,
    idReply: comment.id_reply,
    level: 0,
    IDAccount: comment.IDAccount,
    image_user: comment.image_user,
    MSV: comment.MSV,
    idComment: comment.idComment,
    replies: [],
  };
};
export const addComments = (comments, itemComent) => {
  return comments.map((comment) => {
    if (itemComent.id_reply == comment.idComment) {
      const newItem = {
        IDAccount: itemComent.IDAccount,
        MSV: itemComent.MSV,
        author: itemComent.Name,
        idComment: itemComent.idComment,
        idReply: itemComent.id_reply,
        image_user: itemComent.image_user,
        level: comment.level + 1,
        text: itemComent.content,
        replies: [],
      };
      comment.replies.push(newItem);
      return comment;
    }
    if (comment.replies.length != 0) {
      return addComments(comment.replies, itemComent);
    }
    return comment;
  });
};
export const filterComment = (arr, target) => {
  return arr
    .map((comment) => {
      if (comment.idComment == target.IDComment) {
        return null;
      }
      if (comment.replies.length != 0) {
        comment.replies = filterComment(comment.replies, target);
      }
      return comment;
    })
    .filter((comment) => comment != null);
};
export const updateCommentList = (arr, target) => {
  return arr.map((comment) => {
    if (comment.idComment == target.IDComment) {
      comment.text = target.content;
    }
    if (comment.replies.length != 0) {
      comment.replies = filterComment(comment.replies, target);
    }
    return comment;
  });
};
