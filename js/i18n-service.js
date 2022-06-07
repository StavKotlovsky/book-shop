'use strict'

var gTrans = {
  title: {
    en: 'My books shop',
    es: 'Mi biblioteca',
    he: 'הספריה שלי'
  },
  id: {
    en: 'Id',
    es: 'Identidad',
    he: 'מס זיהוי'
  },
  name: {
    en: 'Name',
    es: 'Nombre',
    he: 'שם'
  },
  price: {
    en: 'Price',
    es: 'precio',
    he: 'מחיר'
  },
  'book-cover': {
    en: 'Book cover',
    es: 'Tapa del libro',
    he: 'כריכה של הספר'
  },
  actions: {
    en: 'Actions',
    es: 'Acciónes',
    he: 'פעולות'
  },
  'actions-read': {
    en: 'Read',
    es: 'Leer',
    he: 'לקרוא'
  },
  'actions-delete': {
    en: 'Delete',
    es: 'Borrar',
    he: 'למחוק'
  },
  'actions-update': {
    en: 'Update',
    es: 'Actualizar',
    he: 'לעדכן'
  },
  'filter-title': {
    en: 'title',
    es: 'Título',
    he: 'כותרת',
  },
  'filter-price': {
    en: 'Filter by price',
    es: 'Filter de precio',
    he: 'פילטור במחיר'
  },
  'filter-rate': {
    en: 'Filter By Rate',
    es: 'Filtrar por tarifa',
    he: 'פילטור בשם',
  },
  'filter-label': {
    en: 'Filter By Name',
    es: 'Filtro nombrado',
    he: 'פילטור בשם',
  },
  'add-book': {
    en: 'Add book',
    es: 'Aggregar libro',
    he: 'הוסף ספר',
  },
  'add-filter-placeholder': {
    en: 'Type Something...',
    es: 'Escribe algo...',
    he: '...תקלידו משהו'
  },
  'book description': {
    en: 'Book Description',
    es: 'Descripción del libro',
    he: 'תיאור של הספר'
  }
}

var gCurrLang = 'en'

function getTrans(transKey) {
  var keyTrans = gTrans[transKey]
  if (!keyTrans) return "UNKNOWN"

  var txt = keyTrans[gCurrLang]
  if (!txt) txt = keyTrans.en

  return txt
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]')
  els.forEach(el => {
    var transKey = el.dataset.trans
    var txt = getTrans(transKey)

    if (el.localName === "input") {
      el.placeholder = txt
    } else el.innerText = txt
  })
}

function setLang(lang) {
  gCurrLang = lang
}

