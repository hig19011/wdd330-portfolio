export default class BooksView {

  constructor() {
    this.favoriteStar = `<svg viewBox="0 0 48 48">
      <polygon class="star-shape" points="24 4 30.18 16.52 44 18.54 34 28.28 36.36 42.04 24 35.54 11.64 42.04 14 28.28 4 18.54 17.82 16.52 24 4"></polygon>            
      </svg>`;

    this.bookReadSvg =`<svg viewBox="0 0 700 480" xmlns="http://www.w3.org/2000/svg">
      <path class="book-cover-top" d="M686.5 221.8a8.4 8.4 0 00-4.2-4.7L397 100.8l-1.3-.7-1.3-1a17.3 17.3 0 01-2.9-3.1 36.4 36.4 0 01-4.6-7.7 77.4 77.4 0 01-6.1-16.9 124.4 124.4 0 01-4.1-38.2 65 65 0 012.5-13 25.6 25.6 0 012-4.4 12.8 12.8 0 012.4-2.8 6.8 6.8 0 011-.6l-370.4 198a3.7 3.7 0 00-.8.4l-1 1.1-.9 1.6a16.2 16.2 0 00-1.3 4.4 75.1 75.1 0 000 22.3 146.9 146.9 0 005.3 24.9 173.8 173.8 0 009.9 25.6 86 86 0 006.7 10.6 24 24 0 002.8 2.8l1.2.9 279.7 156.7c.6.4 1.3.8 1.8 1.4a12.3 12.3 0 013.3 6.3v1.8l-.4.7-.4.4 365.6-245.6a2.5 2.5 0 001-1.1l.2-.8v-1c0-.6-.1-1.3-.4-2h0z" stroke-width="2" stroke="#003f7f" fill="#003f7f"/>
      <path class="book-cover-bottom" d="M297.2 395a165.9 165.9 0 0018.4 56.9L42 299.8c-.4-.3-.9-.5-1.3-.9a15 15 0 01-2.8-2.8 38.1 38.1 0 01-4-5.9 84.5 84.5 0 01-5.3-10.3 135.7 135.7 0 01-7.3-20.1 176.2 176.2 0 01-5.2-25 111.6 111.6 0 01-.8-16.3 42 42 0 011.4-8.5 16.2 16.2 0 011.7-3.6 6 6 0 011-1.1l1-.7a3.4 3.4 0 012.3-.1c.4 0 .8.2 1.3.4l278.8 144.8c-.7.8-1.3 1.7-1.9 2.7a26.4 26.4 0 00-2.8 7.1 52.3 52.3 0 00-1.8 11 93 93 0 00-.1 15.6l.9 8.9z" fill="#3f973e"/>
      <path class="book-pages-bottom" d="M298.2 396a165.9 165.9 0 0018.4 56.9L43 300.8c-.4-.3-.9-.5-1.3-.9a15 15 0 01-2.8-2.8 38.1 38.1 0 01-4-5.9 84.5 84.5 0 01-5.3-10.3 135.7 135.7 0 01-7.3-20.1 176.2 176.2 0 01-5.2-25 111.6 111.6 0 01-.8-16.3 42 42 0 011.4-8.5 16.2 16.2 0 011.7-3.6 6 6 0 011-1.1l1-.7a3.4 3.4 0 012.3-.1c.4 0 .8.2 1.3.4l278.8 144.8c-.7.8-1.3 1.7-1.9 2.7a26.4 26.4 0 00-2.8 7.1 52.3 52.3 0 00-1.8 11 93 93 0 00-.1 15.6l.9 8.9z" fill="#fff"/>
      <path class="book-cover-bottom" d="M379.6 16.2a5.9 5.9 0 00-2-.4 4.5 4.5 0 00-2.1.6L21.3 205.7a3.5 3.5 0 012.8-.2l1 .4 278.8 144.8 360.4-227L379.6 16.3z" fill="#3f973e"/>
      <path class="book-pages-side" d="M665.6 217.4a75.8 75.8 0 01-3.6-7.6 106.1 106.1 0 01-6-20 129.3 129.3 0 01-2-38.4 84.8 84.8 0 014.3-17.8 41.2 41.2 0 013.7-7c.7-1 1.5-2 2.3-2.8l-360.4 227c-.7.7-1.3 1.6-1.9 2.6a26.4 26.4 0 00-2.8 7.1 52.3 52.3 0 00-1.8 11 93 93 0 00-.1 15.6 144.4 144.4 0 002.9 21 171 171 0 0013.4 39.4 111.4 111.4 0 003 5.4l350.3-233-1.3-2.5z" fill="#e2e3e4"/>
      <g>
        <path class="book-edges" d="M16 200.4l285.7 148.5a8 8 0 011.8 1.3 11.9 11.9 0 013.5 6.5 5 5 0 01-.1 2c-.2.5-.4 1-.8 1.2a2 2 0 01-1.3.4 4 4 0 01-1.7-.5L17.9 210.5l-1.2-.5h-1.1c-.4 0-.8 0-1.1.2-.4.1-.8.3-1.1.6l-1 1.1-.9 1.6a16.2 16.2 0 00-1.3 4.4 75.1 75.1 0 000 22.3 146.9 146.9 0 005.3 24.9 173.8 173.8 0 009.9 25.6 86 86 0 006.7 10.6 24 24 0 002.8 2.8l1.2.9 279.7 156.7c.6.4 1.3.8 1.8 1.4a12.3 12.3 0 013.3 6.3v1.8a2 2 0 01-.8 1.1 2 2 0 01-1.3.3c-.5 0-1-.2-1.7-.6L38 314.5a31.6 31.6 0 01-8-7.2 57.2 57.2 0 01-7.4-10.8 112.5 112.5 0 01-8.5-18.2 184.8 184.8 0 01-12-54.8 81 81 0 01.5-11.8l1-4.6c.5-1.4 1-2.6 1.6-3.7.6-1 1.3-2 2-2.7a6.4 6.4 0 013.8-1.5c.8 0 1.5 0 2.3.2.9.2 1.7.5 2.6 1z" stroke-width="2" stroke="#003f7f" fill="#00007f"/>
      </g>
      <path class="book-cover-top" d="M684 116.1a8.6 8.6 0 00-2.5-3.6c-.5-.5-1.1-.8-1.8-1L387.7 2.6a12 12 0 00-4.3-.7 9 9 0 00-3.8 1L8.6 200a6 6 0 013.3-.7l2 .3 2 .9 285.8 148.5a8 8 0 011.8 1.3 11.9 11.9 0 013.5 6.5v1.1c0 .4 0 .7-.2 1 0 .3-.2.5-.3.7a2 2 0 01-.6.5L683 121.5a2.8 2.8 0 001.1-1.3l.3-.9v-1c0-.7-.1-1.5-.3-2.2h0z" stroke-width="2" stroke="#003f7f" fill="#003f7f"/>
      </svg>`;
  }

  buildBookListing = (books, displayBookCallback, myBooks) => {
    let searchCards = document.getElementsByClassName("search");
        if(searchCards[0] != null){
      searchCards[0].classList.remove("hide-me");
    }

    let header = document.getElementById('mainHeader');
    header.innerText = "Search Results";

    this.displayBookListing();

    let bookListing = document.getElementsByClassName("book-listing")[0];
    bookListing.innerHTML = '';
    for (let i = 0; i < books.length; i++) {
      bookListing.appendChild(this.buildSearchCard(books[i], displayBookCallback, myBooks));
    }
  }

  buildSearchCard = (book, displayBookCallback, myBooks) => {
    let sectionCard = document.createElement('section');
    sectionCard.classList.add("search-card");
    sectionCard.addEventListener('click', () => displayBookCallback(book));

    let bookTitle = document.createElement('h3');
    bookTitle.innerText = book.Title;
    sectionCard.appendChild(bookTitle);

    let readSpan = this.createReadSpan(book, myBooks);
    sectionCard.appendChild(readSpan);

    let favoriteSpan = this.createFavoriteSpan(book, myBooks);
    sectionCard.appendChild(favoriteSpan);

    let coverImage = this.createCoverImage(book);
    sectionCard.appendChild(coverImage);

    let sectionDetails = document.createElement('section');
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

  addDetailName = (name) => {
    let span = document.createElement('span');
    span.classList.add('detail-name');
    span.innerText = name;
    return span;
  }

  addDetailValue = (value) => {
    let span = document.createElement('span');
    span.classList.add('detail-value');
    span.innerText = value;
    return span;
  }

  isFavorite = (book, myBooks) => {
    let updatedList = [];
    if (book.Key.includes("works")) {
      updatedList = myBooks.filter(b => b.Key == book.Key && b.IsFavorite);
    }
    else {
      updatedList = myBooks.filter(b => b.ISBN == book.ISBN && b.IsFavorite);
    }
    return updatedList.length > 0 ? true : false;
  }

  isRead = (book, myBooks) => {
    let updatedList = [];
    if (book.Key.includes("works")) {
      updatedList = myBooks.filter(b => b.Key == book.Key && b.IsRead);
    }
    else {      
      updatedList = myBooks.filter(b => b.ISBN == book.ISBN && b.IsRead);
    }
    return updatedList.length > 0 ? true : false;
  }


  createFavoriteSpan = (book, myBooks) => {
    let favoriteSpan = document.createElement('span');
    favoriteSpan.innerHTML = this.favoriteStar;
    favoriteSpan.classList.add("favorite");

    if (this.isFavorite(book, myBooks)) {
      favoriteSpan.classList.add('animate');
    }
    favoriteSpan.addEventListener('click', function (ev) {
      if (favoriteSpan.classList.contains('animate')) {
        favoriteSpan.classList.remove('animate');
        book.removeFromFavorites();
      } else {
        favoriteSpan.classList.add('animate');
        book.addToFavorites();
      }
      ev.stopPropagation();
    });

    var toolTipSpan = document.createElement('span');
    toolTipSpan.innerText = "Favorite!";
    toolTipSpan.classList.add("tooltip")
    favoriteSpan.appendChild(toolTipSpan);

    return favoriteSpan;
  }

  createReadSpan(book, myBooks) {
    let readSpan = document.createElement('span');
    readSpan.innerHTML = this.bookReadSvg;
    
    const isRead = this.isRead(book, myBooks);
    if (isRead) {
      readSpan.classList.add('book-read');
    } else {
      readSpan.classList.add('book-not-read');
    }

    readSpan.addEventListener('click', function (ev) {
      if (isRead) {
        readSpan.classList.remove('book-read');
        readSpan.classList.add('book-not-read');
        book.bookNotRead();
      } else {
        readSpan.classList.remove('book-not-read');
        readSpan.classList.add('book-read');
        book.bookRead();
      }
      ev.stopPropagation();
    });

    var toolTipSpan = document.createElement('span');
    toolTipSpan.innerText = "Finished";
    toolTipSpan.classList.add("tooltip")
    readSpan.appendChild(toolTipSpan);

    return readSpan;    
  }

  createCoverImage(book) {
    let coverImage = document.createElement('img');
    if (book.Cover !== "") {
      coverImage.src = "https://covers.openlibrary.org/b/id/" + book.Cover + "-M.jpg";
      coverImage.onload = (e) => {
        if (coverImage.naturalWidth == 1) {
          e.target = 'images/book-placeholder.png'
        }
      }
    }
    else if (book.ISBN !== "") {
      coverImage.src = "https://covers.openlibrary.org/b/isbn/" + book.ISBN + "-M.jpg";
      coverImage.onload = (e) => {
        if (coverImage.naturalWidth == 1) {
          e.target.src = 'images/book-placeholder.png'
        }
      }
    }
    else {
      coverImage.src = "images/book-placeholder.png";
    }

    return coverImage;
  }


  buildPagination = (totalBooks, booksPerPage, currentPage, gotoPageCallback, target) => {

    const totalPages = Math.ceil(totalBooks / booksPerPage);
    let minPage = currentPage - 3;
    if (minPage < 1) {
      minPage = 1;
    }
    let maxPage = minPage + 6;
    if (maxPage > totalPages) {
      maxPage = totalPages;
    }
    let previousPage = currentPage - 1;
    if (previousPage < 1) {
      previousPage = 1
    }
    let nextPage = currentPage + 1;
    if (nextPage > totalPages) {
      nextPage = totalPages;
    }

    const section = document.createElement('section');
    section.id = target;
    section.classList.add("pagination");

    const list = document.createElement('ul');
    let item = this.createPageLink(previousPage, "<< Prev", gotoPageCallback);
    list.appendChild(item);

    for (let i = minPage; i <= maxPage; i++) {
      item = this.createPageLink(i, i, gotoPageCallback);
      if (i === currentPage) {
        item.classList.add("currentPage");
      }
      list.appendChild(item);
    }

    item = this.createPageLink(nextPage, "Next >>", gotoPageCallback);
    list.appendChild(item);
    section.appendChild(list);

    let sectionExisting = document.getElementById(target);
    sectionExisting.parentNode.replaceChild(section, sectionExisting);

  }

  createPageLink = (pageNumber, pageText, gotoPageCallback) => {
    const item = document.createElement('li');
    item.innerText = pageText;
    item.addEventListener('click', () => gotoPageCallback(pageNumber));
    return item;
  }

  buildBookDisplay = (book, myBooks, onBackCallback) => {
    bookDisplay.innerHTML = "";
    this.displayBookDetails();

    let sectionCard = document.createElement('section');
    sectionCard.classList.add("book-card");

    let backButton = document.createElement("button");
    backButton.innerText = "Back to Listing";
    backButton.addEventListener('click', () =>{
      onBackCallback()
    });
    sectionCard.appendChild(backButton);

    let bookTitle = document.createElement('h3');
    bookTitle.innerText = book.Title;
    sectionCard.appendChild(bookTitle);

    let readSpan = this.createReadSpan(book, myBooks);
    sectionCard.appendChild(readSpan);

    let favoriteSpan = this.createFavoriteSpan(book, myBooks);
    sectionCard.appendChild(favoriteSpan);

    let coverImage = this.createCoverImage(book);
    sectionCard.appendChild(coverImage);

    let sectionDetails = document.createElement('section');
    sectionDetails.classList.add('book-details');

    sectionDetails.appendChild(this.addDetailName("Author"));
    sectionDetails.appendChild(this.addDetailValue(book.Author));
    if (book.AuthorBirthDay !== "") {
      sectionDetails.appendChild(this.addDetailName("Author Birth On"));
      sectionDetails.appendChild(this.addDetailValue(book.AuthorBirthDay));
    }
    if (book.AuthorDeathDay !== "") {
      sectionDetails.appendChild(this.addDetailName("Author Death On"));
      sectionDetails.appendChild(this.addDetailValue(book.AuthorDeathDay));
    }
    sectionDetails.appendChild(this.addDetailName("ISBN"));
    sectionDetails.appendChild(this.addDetailValue(book.ISBN));
    sectionDetails.appendChild(this.addDetailName("Publisher"));
    sectionDetails.appendChild(this.addDetailValue(book.Publisher));
    sectionDetails.appendChild(this.addDetailName("Published"));
    sectionDetails.appendChild(this.addDetailValue(book.Published));
    if (book.Languages !== "") {
      sectionDetails.appendChild(this.addDetailName("Language"));
      sectionDetails.appendChild(this.addDetailValue(book.Languages));
    }
    sectionDetails.appendChild(this.addDetailName("Subject"));
    sectionDetails.appendChild(this.addDetailValue(book.Subject));

    sectionCard.appendChild(sectionDetails);

    let description = this.addDetailValue(book.Description);
    description.classList.add('description')
    sectionCard.appendChild(description);

    bookDisplay.appendChild(sectionCard);
  }

  displayBookListing = () => {
    let searchContent = document.getElementById("content");
    searchContent.classList.remove('hide-me');
    let bookDisplay = document.getElementById('bookDisplay');
    bookDisplay.classList.add('hide-me');    
  }

  displayBookDetails() {
    let searchContent = document.getElementById("content");
    searchContent.classList.add('hide-me');
    let bookDisplay = document.getElementById('bookDisplay');
    bookDisplay.classList.remove('hide-me');
  }

  buildMyBooksPage(books, displayBookCallback, myBooks) {

    let searchCards = document.getElementsByClassName("search");
    if(searchCards[0] != null){
      searchCards[0].classList.add("hide-me");
    }

    let header = document.getElementById('mainHeader');
    header.innerText = "My Books";

    this.displayBookListing();

    let bookListing = document.getElementsByClassName("book-listing")[0];
    bookListing.innerHTML = '';
    for (let i = 0; i < books.length; i++) {
      if(books[i].IsFavorite){
        bookListing.appendChild(this.buildSearchCard(books[i], displayBookCallback, myBooks));
      }
    }
  }

}