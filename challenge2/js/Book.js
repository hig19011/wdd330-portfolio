
export default class Book {

  constructor() {
    this.baseSearchUrl = "http://openlibrary.org/search.json?"
    this.baseBookUrl = "https://openlibrary.org"

    this.Title = "Unknown";
    this.ISBN = "Unknown";
    this.Published = "Unknown";
    this.Subject = "Unknown";
    this.Description = "Unknown";
 
    this.Series = "Unknown";
    this.Pages = "Unknown";
    this.Languages = "Unknown";
    this.Publishers = "Unknown";
    this.Key = "";
    this.EditionKey = "";

    this.Cover = "";
    //this.Covers = [];

    this.searchedBooks = [];
  }

 

  //  need to use "Works API" to get description and other fields, may need to make additional API calls for author and other data.
  fillBook = (data, book) => {
    //console.log(data);
    if(book == undefined){
      var book = new Book();
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
    
    // if (searchParams.length > 0) {
    //   searchParams += "&";
    // }
    // searchParams += "details=true"
    
    if (searchParams.length > 0) {
      searchParams += "&";
    }
    searchParams += "page="+page;

    url = url + searchParams;
    this.totalBooksFound = 0;
    this.searchedBooks = await fetch(url)
      .then(response => response.json())
      .then(data =>{
        this.totalBooksFound = data.num_found;
        return Array.from(data.docs).map(x => this.fillBook(x));
      })
      .catch(e => console.log(e));

    //console.log(this.searchedBooks);

    return { totalBooksFound: this.totalBooksFound, searchedBooks: this.searchedBooks };
  }

  getBookDetails = async (book) => {
    let id = book.edition_key;
    id = book.Key;
    let url = this.baseBookUrl + id + ".json";
    console.log(url);
    //url = "https://openlibrary.org/works/OL19749687W.json"
    console.log(url);
    this.bookDetails = await fetch(url)
      .then(response => response.json())
      .then(data => this.fillBook(data, book))
      .catch(e => console.log(e));

    return this.bookDetails;
  }











}