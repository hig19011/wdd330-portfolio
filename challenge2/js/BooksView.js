

export default class BooksView {

  buildSearchResults (books, displayBookCallback) {
    let searchContent = document.getElementById("content");
    searchContent.classList.remove('hide-me');
    let bookDisplay = document.getElementById('bookDisplay');
    bookDisplay.classList.add('hide-me');

    let searchResults = document.getElementsByClassName("search-results")[0];
    searchResults.innerHTML = '';
    for(let i=0; i<books.length; i++){
      searchResults.appendChild(this.buildSearchCard(books[i], displayBookCallback));
    }
  }

  buildSearchCard = (book, displayBookCallback) => {
    let sectionCard = document.createElement('section');
    sectionCard.classList.add("search-card");
    sectionCard.addEventListener('click', ()=>displayBookCallback(book));

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


  buildPagination = (totalBooks, booksPerPage, currentPage, gotoPageCallback, target) => {
    
    const totalPages = Math.ceil(totalBooks/booksPerPage);
    let minPage = currentPage - 3;
    if(minPage < 1){
      minPage = 1;
    }
    let maxPage = minPage + 6;
    if(maxPage > totalPages) {
      maxPage = totalPages;
    }
    let previousPage = currentPage - 1;
    if(previousPage<1){
      previousPage = 1
    }
    let nextPage = currentPage + 1;
    if(nextPage>totalPages){
      nextPage = totalPages;
    }

    const section = document.createElement('section');
    section.id = target;
    section.classList.add("pagination");

    const list = document.createElement('ul');    
    let item = this.createPageLink(previousPage, "<< Prev", gotoPageCallback);
    list.appendChild(item);
    
    for(let i=minPage; i<=maxPage; i++){     
      item = this.createPageLink(i, i, gotoPageCallback);
      if(i===currentPage){
        item.classList.add("currentPage");
      }
      list.appendChild(item);
    }
   
    item = this.createPageLink(nextPage, "Next >>", gotoPageCallback);
    list.appendChild(item);
    section.appendChild(list);

    let sectionExisting = document.getElementById(target);
    sectionExisting.parentNode.replaceChild(section,sectionExisting);

    //section.innerHTML = "";
    //section.appendChild(list);    
  }

  createPageLink = (pageNumber, pageText, gotoPageCallback) => {
    const item = document.createElement('li');
    item.innerText = pageText;
    item.addEventListener('click',()=>gotoPageCallback(pageNumber));
    return item;
  }


  buildBookDisplay = (details) => {
    let searchContent = document.getElementById("content");
    searchContent.classList.add('hide-me');
    let bookDisplay = document.getElementById('bookDisplay');
    bookDisplay.classList.remove('hide-me');
    
  }
}