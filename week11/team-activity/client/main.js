import Auth from './Auth.js'
import { makeRequest } from './authHelpers.js';

const auth = new Auth();
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', () => {auth.login(getPosts);} );
const newPostButton = document.getElementById('newPostButton');
newPostButton.addEventListener('click', () => {addPost(); });


const addPost = async () => {
  let postData = {};
  postData.title = document.getElementById('newPostTitle').value;
  postData.content = document.getElementById('newPostContent').value;

  let newPost = await makeRequest('posts', 'POST', postData, auth.token);
  await getPosts();
}

const getPosts = async () => {
  var posts = await makeRequest('posts', 'GET', '', auth.token);
  buildPosts(posts);
}

const buildPosts = (posts) => {
  var postList = document.getElementById("postList");
  postList.innerText = "";
  posts.forEach( (post) => {
    var listItem = document.createElement("li");
    var titleHeader = document.createElement("h2");
    titleHeader.innerText = post.title;
    listItem.appendChild(titleHeader);

    var spanContent = document.createElement("span");
    spanContent.innerText = post.content;
    listItem.appendChild(spanContent);

    postList.appendChild(listItem);
  });

}
