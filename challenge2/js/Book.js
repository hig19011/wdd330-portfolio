
export default class Book {

  constructor() {
    this.baseUrl = "http://openlibrary.org/search.json?"

    this.Title = "";
    this.ISBN = "";
    this.Published = "";
    this.Subject = "";
    this.Description = "";
    this.CoverSmall = "";
    this.CoverLarge = "";
    this.Series = "";
    this.Pages = "";
    this.Languages = "";
    this.Publishers = "";

    this.searchedBooks = [];
  }

  searchForBooks = (keyWords, subject, title, author) => {
    if (keyWords == "" || (!subject && !title && !author)) {
      this.searchedBooks = [];
      return;
    }

    let url = this.baseUrl;
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
    searchParams += "details=true"
    


    url = url + searchParams;
    this.searchedBooks = fetch(url)
      .then(response => response.json())
      .then(data => Array.from(data.docs).map(x => this.fillBook(x)))
      .catch(e => console.log(e));
  }

  //  need to use "Works API" to get description and other fields, may need to make additional API calls for author and other data.
  fillBook = (data) => {
    console.log(data);
    var book = new Book();
    book.Title = data.title;
    if(data.isbn) {
      book.ISBN = data.isbn[0];
    }
    book.Published = data.publish_date[0];
    book.Subject = data.subject.reduce( (accum, curVal, curIdx, array ) =>{return accum+curVal+', '}, "");
    book.Description = data.text
    return book;
  }
}