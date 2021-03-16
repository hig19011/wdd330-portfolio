import Book from "./Book.js"
import BooksView from "./BooksView.js";


export default class BooksController {

  constructor(){
    this.books = new Book();
    this.booksView = new BooksView();
  }

  searchForNewBooks = () => {
    this.books.searchForBooks("Sword fiction", true, false, false);
  }
}