

export default class BooksView {

  buildSearchResults (books) {
    let searchResults = document.getElementsByClassName("search-results")[0];
    searchResults.innerHTML = '';
    for(let i=0; i<books.length; i++){
      searchResults.appendChild(this.buildSearchCard(books[i]));
    }
  }

  buildSearchCard = (book) => {
    let sectionCard = document.createElement('section');
    sectionCard.classList.add("search-card");

    let bookTitle = document.createElement('h3');
    bookTitle.innerText = book.Title;
    sectionCard.appendChild(bookTitle);

    let coverImage = document.createElement('img');
    if(book.Cover !== ""){
      coverImage.src = "http://covers.openlibrary.org/b/id/"+book.Cover+"-M.jpg"+"?default=false";      
      coverImage.onerror=(e)=> {e.target='images/book-placeholder.png'; e.preventDefault();}
    }
    else if(book.ISBN !== ""){
      coverImage.src = "http://covers.openlibrary.org/b/isbn/"+book.ISBN+"-M.jpg"+"?default=false";
      coverImage.onerror=(e)=> {e.target.src='images/book-placeholder.png'; e.preventDefault();}
    }
    else{
      coverImage.src = "images/book-placeholder.png";
    }
    sectionCard.appendChild(coverImage);

    var sectionDetails = document.createElement('section');
    sectionDetails.classList.add('book-details');

    sectionDetails.appendChild(this.addDetailName("Author"));
    sectionDetails.appendChild(this.addDetailValue(book.Author));
    sectionDetails.appendChild(this.addDetailName("ISBN"));
    sectionDetails.appendChild(this.addDetailValue(book.ISBN));
    sectionDetails.appendChild(this.addDetailName("Published"));
    sectionDetails.appendChild(this.addDetailValue(book.Published));
    sectionDetails.appendChild(this.addDetailName("Subject"));
    sectionDetails.appendChild(this.addDetailValue(book.Subject));
    
    sectionCard.appendChild(sectionDetails);

    return sectionCard;   
  }

  addDetailName = (name) =>{
    var span = document.createElement('span');
    span.classList.add('detail-name');
    span.innerText = name;
    return span;
  }

  addDetailValue = (value) =>{
    var span = document.createElement('span');
    span.classList.add('detail-value');
    span.innerText = value;
    return span;
  }

}