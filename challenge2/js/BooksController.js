import Book from "./Book.js"
import BooksView from "./BooksView.js";


export default class BooksController {

  constructor(){
    this.books = new Book();
    this.booksView = new BooksView();
    this.searchButton = document.getElementById("buttonSearch");
    this.searchButton.addEventListener('click', async () =>{
      var books = await this.searchForNewBooks();
      if(books !== undefined){
        this.booksView.buildSearchResults(books);
      }
    })
  }

  searchForNewBooks = () => {
    const checkSubject = document.getElementById("checkSubject");
    const searchSubject = checkSubject.checked;
    const checkTitle = document.getElementById("checkTitle");
    const searchTitle = checkTitle.checked;
    const checkAuthor = document.getElementById("checkAuthor");
    const searchAuthor = checkAuthor.checked;

    const textSearch = document.getElementById("textSearch");
    let searchWords = textSearch.value;


    return this.books.searchForBooks(searchWords, searchSubject, searchTitle, searchAuthor);
  }

  testGetBookDetails = async (id) => {
    let details = await this.books.getBookDetails(id);
    let d1 = details;
  }
}