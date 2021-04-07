export default class BooksView {

  constructor() {
    this.favoriteStar = `<svg viewBox="0 0 48 48">
      <polygon class="star-shape" points="24 4 30.18 16.52 44 18.54 34 28.28 36.36 42.04 24 35.54 11.64 42.04 14 28.28 4 18.54 17.82 16.52 24 4"></polygon>            
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
      let isFav = this.isFavorite(books[i], myBooks);
      bookListing.appendChild(this.buildSearchCard(books[i], displayBookCallback, isFav));
    }
  }

  buildSearchCard = (book, displayBookCallback, isFavorite) => {
    let sectionCard = document.createElement('section');
    sectionCard.classList.add("search-card");
    sectionCard.addEventListener('click', () => displayBookCallback(book));

    let bookTitle = document.createElement('h3');
    bookTitle.innerText = book.Title;
    sectionCard.appendChild(bookTitle);

    let favoriteSpan = this.createFavoriteSpan(book, isFavorite);
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
      updatedList = myBooks.filter(b => b.ISBN == book.ISBN);
    }
    else {
      updatedList = myBooks.filter(b => b.Key == book.Key);
    }
    return updatedList.length > 0 ? true : false;
  }

  createFavoriteSpan = (book, isFavorite) => {
    let favoriteSpan = document.createElement('span');
    favoriteSpan.innerHTML = this.favoriteStar;
    favoriteSpan.classList.add("favorite");

    if (isFavorite) {
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

  buildBookDisplay = (book, onBackCallback) => {
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

    let myBooks = book.getMyBooks();
    let isFavorite = this.isFavorite(book, myBooks);

    let favoriteSpan = this.createFavoriteSpan(book, isFavorite);
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

  buildMyBooksPage(books, displayBookCallback) {

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
      bookListing.appendChild(this.buildSearchCard(books[i], displayBookCallback, true));
    }
  }

}