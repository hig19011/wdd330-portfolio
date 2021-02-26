import ls from './ls.js'

export default class Comments {
  constructor() {
    this.storage = new ls();
    let comments = this.getAllComments();
    // if(comments.length == 0) {
    //   this.addComment("Type? This is just to allow us to re-use this code. Later you might want to expand on this application and add something like favorite parks or climbs, etc. It would be nice to re-use this module for each of those. Adding a type flag allows us to add comments for different things and grab all of them or keep them separate.", "Bechler Falls", "hike");
    //   this.addComment('Complete the following assignment as a team. Designate one team member as the "main driver" and collaborate on their copy of the code. Everyone on the team should be actively engaged in writing the code and contributing to the solution. Once the solution is working, make sure that everyone on the team gets a copy of the code. Each week let someone else be the "main driver" of the coding.', "Bechler Falls", "hike");
    //   this.addComment("Review the code to refresh your memory on the structure we have used. Discuss with your group what methods and properties you might need to implement your comments. A comment should consist of at least the name of the hike it is for, a date, and the actual text of the comment. You will also need a comment type to use as a key for when we store these to local storage.", "Teton Canyon", "hike");
    //   this.addComment("As you start thinking about implementing your module...think back to the Todo list we made. This is in many ways similar to that. We need a form to gather some user input, we need a button with a listener to store that into an array (and eventually LocalStorage), and we need to display a list of our comments. The biggest difference here is that we don't always want to show the entry form, and we want our module to be reusable.", "Denanda Falls", "hike");
    // }
  }

  getAllComments = () => {
    let comments = this.storage.getComments();
    return comments;
  }

  filterCommentsByName = (comments, name) => {
    let filtered =  comments.filter( x => x.name == name);
    return filtered;
  }

  addComment = (content, hikeName, type) => {
    let newComment = {name:hikeName, date: new Date(), content: content, type: type};
    this.storage.saveComment(newComment);

  }

  renderComments = (hikeName) => {
    let commentList = this.getAllComments();
    let hikeComments = this.filterCommentsByName(commentList, hikeName)
    let commentsHTML = `<div class="comments">`
    hikeComments.forEach(x=> {
      commentsHTML += `<div> <span class="comment-date">${new Date(x.date).toDateString()}</span> - ${x.content} </div>`;
    })
    commentsHTML += `</div>`;
    return commentsHTML;
  }

  renderAddComment = () => {
    let content = `<div>
      <label for="commentContent">Add New Comment</label>
      <input id="commentContent" type="text"/>
      <button id="addContent">Add Comment</button>
    </div>`;
    return content;
  }
   
  createComment = (hikeName) => {   
    let content = document.getElementById("commentContent").value;
    this.addComment(content, hikeName, "hike");
  }

}


