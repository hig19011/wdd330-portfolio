import BooksController from './BooksController.js'
import BooksView from './BooksView.js';


const booksController = new BooksController()
const booksView = new BooksView();



let books = await booksController.searchForNewBooks();
if(books !== undefined)
  booksView.buildSearchResults(books);

//booksController.testGetBookDetails("OL20293534W");

// var src = `<span id="favorite">          
// <svg viewBox="0 0 24 24">
//   <polygon class="star" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>            
// </svg>
// </span>`;

// var lis = document.getElementsByClassName("hold-favorite");
// lis[0].innerHTML = src;

// var favorite = document.getElementById("favorite");

// favorite.addEventListener('click', function () {
//   if (favorite.classList.contains('fav')) {
//     favorite.classList.remove('fav');
//   } else {
//     favorite.classList.add('fav');
//   }
// });