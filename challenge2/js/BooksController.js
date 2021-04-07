import Book from "./Book.js"
import BooksView from "./BooksView.js";


export default class BooksController {

  constructor() {
    this.books = new Book();
    this.booksView = new BooksView();

    this.searchButton = document.getElementById("buttonSearch");
    this.searchButton.addEventListener('click', async () => {
      await this.searchForNewBooks();
    });

    this.textSearch = document.getElementById("textSearch");  
    this.textSearch.addEventListener('keyup', async (ev) => {
      if(ev.code === "Enter" || ev.code === "NumpadEnter") {
        await this.searchForNewBooks();
      }
    });

    this.navFindBooks = document.getElementById("nav-find-books");
    this.navFindBooks.addEventListener("click", async () => {
      await this.searchForNewBooks();      
      this.buildSearchPage();
      this.showingMyBooks = false;
    });

    this.navMyBooks = document.getElementById("nav-my-books");
    this.navMyBooks.addEventListener("click", () => {
      this.currentPage = 1;
      this.buildMyBooksPage();
      this.showingMyBooks = true;
    });

    this.currentPage = 1;
    this.totalBooks = 0;
    this.searchedBooks = [];
    this.showingMyBooks = false;
  }

  buildSearchPage() {
    const myBooks = this.books.getMyBooks();
    if (this.searchedBooks === undefined) {
      return;
    }
    this.booksView.buildBookListing(this.searchedBooks, this.displayBook, myBooks);
    this.booksView.buildPagination(this.totalBooks, 100, this.currentPage, this.gotoPage, "topPagination");
    this.booksView.buildPagination(this.totalBooks, 100, this.currentPage, this.gotoPage, "bottomPagination");
  }

  buildMyBooksPage = () => {
    let myBooks = this.books.getMyBooks();

    let bookList = [];
    for (let i = 0; i < 10; i++) {
      let index = (this.currentPage - 1) * 10 + i;
      if (index >= myBooks.length)
        break;
      bookList[i] = myBooks[(this.currentPage - 1) * 10 + i];
    }

    this.booksView.buildMyBooksPage(bookList, this.displayBook, myBooks);

    this.booksView.buildPagination(myBooks.length, 10, this.currentPage, this.gotoMyBooksPage, "topPagination");
    this.booksView.buildPagination(myBooks.length, 10, this.currentPage, this.gotoMyBooksPage, "bottomPagination");
  }

  gotoPage = async (page) => {
    this.currentPage = page;

    const searchParams = this.getSearchParameters();
    let searchResults = await this.books.searchForBooks(searchParams.searchWords, searchParams.searchSubject, searchParams.searchTitle, searchParams.searchAuthor, this.currentPage);
    this.totalBooks = searchResults.totalBooksFound;
    this.searchedBooks = searchResults.searchedBooks;

    this.buildSearchPage();
  }

  gotoMyBooksPage = async (page) => {
    this.currentPage = page;
    this.buildMyBooksPage();
  }

  searchForNewBooks = async () => {
    this.currentPage = 1;

    const searchParams = this.getSearchParameters();
    let searchResults = await this.books.searchForBooks(searchParams.searchWords, searchParams.searchSubject, searchParams.searchTitle, searchParams.searchAuthor, this.currentPage);
    this.totalBooks = searchResults.totalBooksFound;
    this.searchedBooks = searchResults.searchedBooks;

    this.buildSearchPage();
  }

  getSearchParameters() {
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

  displayBook = async (book) => {
    let details = await this.books.getBookDetails(book);
    if(this.showingMyBooks){
      this.booksView.buildBookDisplay(details, async () => await this.gotoMyBooksPage(this.currentPage));
    } else {
      this.booksView.buildBookDisplay(details, async () => await this.gotoPage(this.currentPage));
    }
  }


}