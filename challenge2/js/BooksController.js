import Book from "./Book.js"
import BooksView from "./BooksView.js";


export default class BooksController {  

  constructor(){
    this.books = new Book();
    this.booksView = new BooksView();
    this.searchButton = document.getElementById("buttonSearch");    
    this.searchButton.addEventListener('click', async () =>{
       await this.searchForNewBooks();
    })    

    this.currentPage = 1;
    this.totalBooks = 0;
    this.searchedBooks = [];
  }

  buildSearchPage(){
    if(this.searchedBooks === undefined) {
      return;
    }
    this.booksView.buildSearchResults(this.searchedBooks, this.displayBook);
    this.booksView.buildPagination(this.totalBooks, 100, this.currentPage, this.gotoPage, "topPagination");
    this.booksView.buildPagination(this.totalBooks, 100, this.currentPage, this.gotoPage, "bottomPagination");
  }

  gotoPage = async (page) =>{
    this.currentPage = page;

    const searchParams = this.getSearchParameters();
    var searchResults = await this.books.searchForBooks(searchParams.searchWords, searchParams.searchSubject, searchParams.searchTitle, searchParams.searchAuthor, this.currentPage);
    this.totalBooks = searchResults.totalBooksFound;
    this.searchedBooks = searchResults.searchedBooks;

    this.buildSearchPage();
  }
  
  searchForNewBooks = async () => {    
    this.currentPage = 1;

    const searchParams = this.getSearchParameters();
    var searchResults = await this.books.searchForBooks(searchParams.searchWords, searchParams.searchSubject, searchParams.searchTitle, searchParams.searchAuthor, this.currentPage);
    this.totalBooks = searchResults.totalBooksFound;
    this.searchedBooks = searchResults.searchedBooks;    

    this.buildSearchPage(); 
  }
  
  getSearchParameters(){
    const checkSubject = document.getElementById("checkSubject");
    const searchSubject = checkSubject.checked;
    const checkTitle = document.getElementById("checkTitle");
    const searchTitle = checkTitle.checked;
    const checkAuthor = document.getElementById("checkAuthor");
    const searchAuthor = checkAuthor.checked;

    const textSearch = document.getElementById("textSearch");
    let searchWords = textSearch.value;

    return { searchWords, searchSubject, searchTitle, searchAuthor };
  }
  

  testGetBookDetails = async (id) => {
    let details = await this.books.getBookDetails(id);
    let d1 = details;
  }

  displayBook = async (book) => {
    let details = await this.books.getBookDetails(book);
    this.booksView.buildBookDisplay(details);
  }
}