'use strict'

const STORAGE_KEY = 'booksDB'
const gBooksImgs = [
  'img/0.jpg', 'img/1.jpg', 'img/2.jpg',
  'img/3.jpg', 'img/4.jpg', 'img/5.png'
]
const PAGE_SIZE = 3

var gBooks
var gFilterBy = { price: 0, rate: 0, txt: '' }
var gPageIdx = 0

_creatBooks()

function nextPage() {
  gPageIdx++
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0
  }
}

function addBook(name, price) {
  const newBook = _creatBook(name)
  newBook.price = price
  newBook.imgUrl = 'img/2.jpg'
  gBooks.push(newBook)
  _saveBooksToStorage()
  return newBook
}

function removeBook(bookId) {
  var deleteMsg = 'are you sure you want to delete?'
  if (!confirm(deleteMsg)) return
  const bookIdx = gBooks.findIndex(book => book.id === bookId)
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage()
}

function getBooks() {
  var books = gBooks.filter(book => book.name.startsWith(gFilterBy.txt))
  if (gFilterBy.price) books = books.filter((book) => book.price > gFilterBy.price)
  if (gFilterBy.rate) books = books.filter((book) => book.rate > gFilterBy.rate)

  const startIdx = gPageIdx * PAGE_SIZE
  books = books.slice(startIdx, startIdx + PAGE_SIZE)

  return books
}

function updateBook(bookId, newPrice) {
  const book = gBooks.find(book => book.id === bookId)
  book.price = newPrice
  _saveBooksToStorage()
  return book
}

function getBookById(bookId) {
  const book = gBooks.find(book => bookId === book.id)
  return book
}

function setBookRate(bookId, diff) {
  const book = gBooks.find(book => bookId === book.id)
  const newBookRate = book.rate + diff
  if (newBookRate > 10 || newBookRate < 0) return
  book.rate += diff
  _saveBooksToStorage()

  return book
}

function setSortBy(value) {
  var books = gBooks
  if (value === 'price') return books.sort((book1, book2) =>
    book2.price - book1.price)
  if (value === 'name') return books.sort((book1, book2) =>
    book1.name.localeCompare(book2.name))
}

function setBookFilter(filterBy = {}) {
  if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
  if (filterBy.rate !== undefined) gFilterBy.rate = filterBy.rate
  if (filterBy.txt !== undefined) {
    var letter = filterBy.txt
    letter = letter.charAt(0).toUpperCase() + letter.slice(1)
    gFilterBy.txt = letter
  }
  return gFilterBy
}

function _creatBook(name, idx) {
  return {
    id: makeId(),
    name,
    price: (getRandomIntInclusive(0, 10000) / 100),
    imgUrl: gBooksImgs[idx],
    desc: makeLorem(),
    rate: 0
  }
}

function _creatBooks() {
  var books = loadFromStorage(STORAGE_KEY)
  if (!books || !books.length) {
    books = [
      _creatBook('Twilight', 0),
      _creatBook('The Notebook', 1),
      _creatBook('Harry Potter', 2),
      _creatBook('My Sisters Keeper', 3),
      _creatBook('Marley and me', 4),
      _creatBook('Wonder', 5)
    ]
  }
  gBooks = books
  _saveBooksToStorage()
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks)
}