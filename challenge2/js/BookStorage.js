export default class BookStorage {
  

  constructor(){
    this.booksKey = 'myBooks';
  }

  saveBook = (book) => {
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem(this.booksKey, JSON.stringify(books));
  };

  deleteBook = (book) => {
    const books= this.getBooks();
    let updatedList = [];
    if(book.Key.includes("works")){
      updatedList = books.filter(b => b.ISBN != book.ISBN);
    }
    else{
      updatedList = books.filter(b => b.Key != book.Key);    }
    
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