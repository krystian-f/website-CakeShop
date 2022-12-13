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
const sliderBtns = document.querySelectorAll('.slider__btn')
const sliderBtnPrev = document.querySelector('.slider__btn-prev');
const sliderBtnNext = document.querySelector('.slider__btn-next');
const slides =  document.querySelectorAll('.slide');

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
    // Map
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
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
