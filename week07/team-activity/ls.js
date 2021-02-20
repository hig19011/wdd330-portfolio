export default class ls {
  

  constructor(){
    this.commentsKey = 'comments';
  }

  saveComment = (comment) => {
    const comments = this.getComments();
    comments.push(comment);
    localStorage.setItem(this.commentsKey, JSON.stringify(comments));
  };

  deleteComment = (id) => {
    const comments= this.getComments();
    const updatedList = comments.filter(comment => comment.id != id) ;
    localStorage.setItem(this.commentsKey, JSON.stringify(updatedList));
  }

  getComments = () => {
    const commentsString = localStorage.getItem(this.commentsKey);
    let comments = [];
    if(commentsString)
      comments = JSON.parse(commentsString);

    return comments;
  }

}