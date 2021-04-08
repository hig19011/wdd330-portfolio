export default class BookStorage {
  
  constructor(){
    this.booksKey = 'myBooks';
  }

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

  getBooks = () => {
    const booksString = localStorage.getItem(this.booksKey);
    let books = [];
    if(booksString)
      books = JSON.parse(booksString);

    return books;
  }

}