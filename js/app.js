"use strict";
// Data
import galleryImgs from '../js/gallery.json' assert {type: 'json'};
import { generateGallery, 
  getPaginationNumbers,
  setActivePage,
  addPageNumbers,
  navigationButtons,
  enlargeItem,
  galleryButtonsEffects
 }  
from '../js/gallery.js';
import {getPagination, setBlogPage, addPageNumbersBlog, blogNavigationButtons} from '../js/blog.js';


// DOM
const overlay = document.querySelector('.overlay');
const sliderBtns = document.querySelectorAll('.slider__btn')
const sliderBtnPrev = document.querySelector('.slider__btn-prev');
const sliderBtnNext = document.querySelector('.slider__btn-next');
const slides =  document.querySelectorAll('.slide');
const navBtn = document.querySelector('.nav__hamburger');
const nav = document.querySelector('.nav__main-container');

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
    galleryButtonsEffects();
  } 

  if( subPageName === '/shop.html'){
    console.log('shop');
  }

  if( subPageName === '/blog.html'){
    console.log('blog');
    getPagination();
    setBlogPage(1);
    addPageNumbersBlog();
    blogNavigationButtons();
  }

  if( subPageName === '/contact.html'){
    console.log('contact');
    // Map
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('Our Location. Please visit us!')
        .openPopup();    
  }
  });



// Header Slider 
let currentSlide = 0;
let maxSlides = slides.length - 1;

const displaySlide = function displayCurrentSlide(){
  slides.forEach ((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;   
  })
}

slides.forEach((slide, index) =>{
  slide.style.transform = `translateX(${index * 100}%)`;
})

sliderBtns.forEach((btn)=>{
  if(btn.classList.contains('slider__btn-prev')) {
    btn.addEventListener('click', ()=>{

      if (currentSlide === 0) {
        currentSlide = maxSlides;
      } else {
        currentSlide -= 1;        
      }
      displaySlide()
    }) 
  } else if (btn.classList.contains('slider__btn-next')) {
    btn.addEventListener('click', () =>{

      if (currentSlide === maxSlides) {
        currentSlide = 0;
      } else {
        currentSlide += 1;        
      }
      displaySlide();
    })
  }
})

// Navigation hamburger
navBtn.addEventListener('click', () =>{
  nav.classList.toggle('active');
  overlay.classList.toggle('active');
})