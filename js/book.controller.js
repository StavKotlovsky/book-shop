'use strict'

function onInit() {
  renderBooks()
}

function renderBooks() {
  var books = getBooks()
  var strHTML = books.map(book =>
    `<tr>
   <td>#${book.id}</td>
   <td>${book.name.charAt(0).toUpperCase() + book.name.slice(1)}</td>
    <td>${book.price}$</td>
    <td class="cover-pic"><img class="book-cover" src="${book.imgUrl}"></td>
    <td>
    <button data-trans="actions-read" onclick="onReadBook('${book.id}')">Read</button>
    <button data-trans="actions-update" onclick="onUpdateBook('${book.id}')">Update</button>
    <button data-trans="actions-delete" onclick="onRemoveBook('${book.id}')">Delete</button>
    </td>
    </tr>`
  ).join('')

  document.querySelector('.books-container').innerHTML = strHTML
  doTrans()
}

function onAddBook() {
  var name = prompt('Enter the name of the book...')
  var price = prompt('Enter the price of the book...')
  if (name) {
    const book = addBook(name, price)
    renderBooks()
    openMsg(`You added a new book (Name: ${book.name})`)
  }
}

function onRemoveBook(bookId) {
  removeBook(bookId)
  renderBooks()
  openMsg(`Book ${bookId} Deleted!`)
}

function onUpdateBook(bookId) {
  var book = getBookById(bookId)
  var newBookPrice = +prompt('Wats your new Price?', book.price)
  if (newBookPrice ** book.price !== newBookPrice) {
    const book = updateBook(bookId, newBookPrice)
    renderBooks()
    openMsg(`Book Price Updated To: ${book.price}`)
  }
}

function onReadBook(bookId) {
  var book = getBookById(bookId)
  var elModal = document.querySelector('.book-modal')
  elModal.querySelector('h3').innerText = book.name
  elModal.querySelector('h4 .price').innerText = book.price + '$'
  elModal.querySelector('p').innerText = book.desc
  elModal.querySelector('.rating-container').innerHTML = `<button class="min-btn" onclick="onRatingChange('${bookId}',-1)"
  >➖</button><span>${book.rate}</span><button
  class="plus-btn" onclick="onRatingChange('${bookId}',1)">➕</button>`
  elModal.classList.add('open-modal')
}

function onRatingChange(bookId, diff) {
  setBookRate(bookId, diff)
  onReadBook(bookId)

}

function onCloseModal() {
  document.querySelector('.book-modal').classList.remove('open-modal')
}

function openMsg(msg) {
  const el = document.querySelector('.user-msg')
  el.innerText = msg
  el.classList.add('msg-open')
  setTimeout(() => {
    el.classList.remove('msg-open')
  }, 3200)
}

function onSortBy(value) {
  setSortBy(value)
  renderBooks()
}

function onSetFilterBy(filterBy) {
  filterBy = setBookFilter(filterBy)

  renderBooks()
}

function onSetLang(lang) {
  setLang(lang)
  if (lang === "he") document.body.classList.add("rtl")
  else document.body.classList.remove("rtl")
  renderBooks()
  doTrans()
}

function onNextPage() {
  console.log('hii')
  nextPage()
  renderBooks()
}
