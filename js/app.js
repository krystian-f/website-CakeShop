"use strict";
// Data
import galleryImgs from '../js/gallery.json' assert {type: 'json'};
import { generateGallery, 
  getPaginationNumbers,
  setActivePage,
  addPageNumbers,
  navigationButtons,
  enlargeItem }  
from './gallery.js';

// DOM
const overlay = document.querySelector('overlay');

// Call functions
window.addEventListener("load", () => {
  const subPageName = window.location.pathname;
  if( subPageName === '/gallery.html' ) {
    generateGallery(galleryImgs);
    getPaginationNumbers();
    setActivePage(1);
    navigationButtons();
    addPageNumbers();
    enlargeItem(galleryImgs);
    // galleryButtonsEffects();
  } 

  if( subPageName === '/shop.html'){
    console.log('shop');
  }

  if( subPageName === '/blog.html'){
    console.log('blog');
  }

  if( subPageName === '/contact.html'){
    console.log('contact');
  }
  });
