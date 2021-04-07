import BookStorage from "./BookStorage.js"

export default class Book {

  constructor() {
    this.baseSearchUrl = "http://openlibrary.org/search.json?"
    this.baseBookUrl = "http://openlibrary.org"

    this.Author = "";
    this.AuthorBirthDay = "";
    this.AuthorDeathDay = "";
    this.Title = "Unknown";
    this.ISBN = "Unknown";
    this.Published = "Unknown";
    this.Subject = "Unknown";
    this.Description = "Description is unavailable";
 
    this.Series = "Unknown";
    this.Pages = "Unknown";
    this.Languages = "";
    this.Publishers = "Unknown";
    this.Key = "";
    this.EditionKey = "";

    this.Cover = "";

    this.Author = "";
    this.AuthorBirthDay = "";
 
  }

  // need to use "Works API" to get description and other fields, 
  // may need to make additional API calls for author and other data.
  fillBook = async (data, book) => {
    if(book == undefined){
      book = new Book();
    }

    if(data.title){
      book.Title = data.title;
    }

    if(data.cover_i){
      book.Cover = data.cover_i;
    } else if(data.covers){
      book.Cover = data.covers[0];
    }

    if(data.isbn) {
      book.ISBN = data.isbn[0];
    }

    if(data.author_name){      
      book.Author = data.author_name[0];
    }
    if(data.authors){
      let authorData = await this.getAuthorDetails(data.authors[0].author.key);
      book.Author = authorData.name;
      book.AuthorBirthDay = authorData.birth_date;
      book.AuthorDeathDay = authorData.death_date;
    }

    if(data.first_publish_year){
      book.Published = data.first_publish_year; 
    }
    else if(book.publish_date){
      book.Published = data.publish_date[0];
    }
   
    if (data.subjects) {
      book.Subject = data.subjects.reduce( (accum, curVal, curIdx, array ) =>{return accum+curVal+', '}, "");
    } else  if (data.subject) {
      book.Subject = data.subject.reduce( (accum, curVal, curIdx, array ) =>{return accum+curVal+', '}, "");
    } 

    if(data.key){
      book.Key = data.key;
    }
    if(data.edition_key){
      book.EditionKey = data.edition_key;
    }

    if(data.description){
      if(typeof data.description === "string"){
        book.Description = data.description;
      } else if(data.description.value){
        book.Description = data.description.value;
      }
    }

    if(data.language){
      book.Languages = data.language[0];
    }

    if(data.publisher){
      book.Publisher = data.publisher[0];
    }
    
    return book;
  }

  searchForBooks = async (keyWords, subject, title, author, page=1) => {
    if (keyWords == "" || (!subject && !title && !author)) {
      this.searchedBooks = [];
      return;
    }

    let url = this.baseSearchUrl;
    let searchParams = "";
    let encodedKeyWorks = encodeURIComponent(keyWords);
    if (subject) {
      searchParams = "subject=" + encodedKeyWorks;
    }
    if (title) {
      if (searchParams.length > 0) {
        searchParams += "&";
      }
      searchParams += "title=" + encodedKeyWorks;
    }
    if (author) {
      if (searchParams.length > 0) {
        searchParams += "&";
      }
      searchParams += "author=" + encodedKeyWorks;
    }

    if (searchParams.length > 0) {
      searchParams += "&";
    }
    searchParams += "page="+page;

    url = url + searchParams;
    this.totalBooksFound = 0;
    let searchedBooks = await fetch(url)
      .then(response => response.json())
      .then(data =>{
        this.totalBooksFound = data.num_found;        
        let result = Promise.all(data.docs.map(d => this.fillBook(d)));
        return result;
      })
      .then (filledBook => filledBook)
      .catch(e => console.log(e));

      searchedBooks = searchedBooks.sort(this.sortByPublishDate);

      return { totalBooksFound: this.totalBooksFound, searchedBooks: searchedBooks };
  }

  getBookDetails = async (book) => {
    let id = book.edition_key;
    id = book.Key;
    let url = this.baseBookUrl + id + ".json";
    let bookDetails = await fetch(url)
      .then(response => response.json())
      .then(async data => await this.fillBook(data, book))
      .catch(e => console.log(e));
    if(bookDetails == undefined)
      return book;
    return bookDetails;
  }

  getAuthorDetails = async (authorKey) => {
    let url = this.baseBookUrl + authorKey + ".json";
    this.authorData = await fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(e => console.log(e));

    return this.authorData;
  }

  addToFavorites = () => {
    let storage = new BookStorage();
    storage.saveBook(this);
  }

  removeFromFavorites = () => {
    let storage = new BookStorage();
    storage.deleteBook(this);
  }

  getMyBooks = () => {
    let storage = new BookStorage();
    let myBooks = storage.getBooks();
    if(myBooks === undefined) {
      myBooks = [];
    }

    myBooks = myBooks.map((x)=>{
      let newBook = new Book();
      newBook.Author = x.Author;      
      newBook.Cover = x.Cover;
      newBook.Description = x.Description;
      newBook.EditionKey = x.EditionKey;
      newBook.ISBN = x.ISBN;
      newBook.Key = x.Key;
      newBook.Languages = x.Languages;
      newBook.Pages = x.Pages;
      newBook.Published = x.Published;
      newBook.Publishers = x.Publishers;
      newBook.Series = x.Series;
      newBook.Subject = x.Subject;
      newBook.Title = x.Title;
      return newBook;      
    })
    myBooks = myBooks.sort(this.sortByPublishDate);    
    return myBooks;
  }

  sortByPublishDate = (a,b) => {
    let x = a.Published == "Unknown" ? "9999" : a.Published;
    let y = b.Published == "Unknown" ? "9999" : b.Published;
    return x > y ? 1 : -1 
  }

}