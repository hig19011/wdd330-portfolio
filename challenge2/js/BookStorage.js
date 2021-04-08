// gets all books, saves book and deletes books from local storage
// the list of books is saved as a JSON string.
export default class BookStorage {
  
  constructor(){
    this.booksKey = 'myBooks';
  }

  // get all saved books, keep all but instances of the book to save, 
  // add the book to save, save to local storage
  saveBook = (book) => {
    const books = this.getBooks();
    let updatedList = [];
    if(book.Key.includes("works")){
      updatedList = books.filter(b => b.Key != book.Key);  
    }
    else {      
      updatedList = books.filter(b => b.ISBN != book.ISBN);  
    }
    updatedList.push(book);
    localStorage.setItem(this.booksKey, JSON.stringify(updatedList));
  };

  // get books, remove any instances of book to remove, save remaining list
  deleteBook = (book) => {
    const books= this.getBooks();
    let updatedList = [];
    if(book.Key.includes("works")) {
      updatedList = books.filter(b => b.Key != book.Key);
    }
    else {      
      updatedList = books.filter(b => b.ISBN != book.ISBN);  
    }
    
    localStorage.setItem(this.booksKey, JSON.stringify(updatedList));
  }

  // get all book from local storage
  getBooks = () => {
    const booksString = localStorage.getItem(this.booksKey);
    let books = [];
    if(booksString)
      books = JSON.parse(booksString);

    return books;
  }

}