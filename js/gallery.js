// DOM
const paginationNumber = document.querySelector('.gallery__pagination-numbers');
const galleryList = document.querySelector('.gallery__list');
const prevBtn = document.querySelector('.gallery__btn-prev');
const nextBtn = document.querySelector('.gallery__btn-next');
const largeContainer = document.querySelector('.gallery__large-container');
const btnCloseGallery = document.querySelector('.btn__close-img');
const btnImgPrev = document.querySelector('.btn__prev__img');
const btnImgNext = document.querySelector('.btn__next__img');
const overlay = document.querySelector('.overlay');

// Global
let galleryItemsNumber;
let galleryItems;
let galleryLimit = 12;
let pageCount;
let currentPage;

const generateGallery = function generateGalleryListOnPage(imgs){
  imgs.galleryImgs.forEach((item) => {
    const galleryItem = document.createElement('li');
    galleryItem.className = 'gallery__item';
    galleryItem.innerHTML = `<img src="${item.img}" alt="" class="gallery__img">`;
    galleryList.appendChild(galleryItem);
  }) 

  galleryItemsNumber = imgs.galleryImgs.length;
  pageCount = Math.ceil(galleryItemsNumber / galleryLimit);
  galleryItems = document.querySelectorAll('.gallery__item');
}



const appendPageNumber = function createAndAddPageNumbers(index){
  const pageNumber = document.createElement('button');
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  paginationNumber.appendChild(pageNumber);
};

const getPaginationNumbers = function getPaginationNumbersFromPageCount() {
  for(let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setActivePage = function displayActivePage(pageNum){
  currentPage = pageNum;

  activePageNumber();
  handlePageButtons();

  let prevRange = (pageNum - 1) * galleryLimit;
  let currentRange = pageNum * galleryLimit;

  galleryItems.forEach((item, index) => {
    item.classList.add('hidden');
    if(index >= prevRange && index < currentRange) {
      item.classList.remove('hidden');
    }
  })
};

 const addPageNumbers = function addPageNumbersToGeneratedButtons(){
  const pageNumbers = document.querySelectorAll('.pagination-number');

  pageNumbers.forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

  if(pageIndex) {
    button.addEventListener('click', () => {
      setActivePage(pageIndex);
    })
    }    
  })

 };

 const activePageNumber = function activePageNumber(){
  const pageNumbers = document.querySelectorAll('.pagination-number');
  pageNumbers.forEach((button) => {
    button.classList.remove('active');

  const pageIndex = Number(button.getAttribute("page-index"));
  if(pageIndex == currentPage) {
    button.classList.add('active');
    }    
  })
 };

 const navigationButtons = function prevNextButtonsActions(){
  prevBtn.addEventListener('click', () => {
    setActivePage(currentPage -1);
  })

  nextBtn.addEventListener('click', () => {
    setActivePage(currentPage + 1);
  })
 }

const disableButtons = function disableButtons(button){
  button.classList.add('disabled');
  button.setAttribute('disabled', true);
}

const activateButtons = function activateButtons(button){
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
}

const handlePageButtons = function handlePageButtonsState () {
  if(currentPage === 1){
    disableButtons(prevBtn);
  } else {
    activateButtons(prevBtn);
  }

  if(pageCount === currentPage){
    disableButtons(nextBtn);
  } else {
    activateButtons(nextBtn);
  }
}

const enlargeItem = function enlargeClickedImage(imgs) {
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', ()=>{
      let imgSrc = imgs.galleryImgs[index].img;
      
      if(!largeContainer.classList.contains('active')) {
        largeContainer.classList.add('active');
        overlay.classList.add('active');
      }

      let enlrargedImg = document.createElement('img');
      enlrargedImg.className = 'enlrarged__img';
      enlrargedImg.src = imgSrc;
      largeContainer.appendChild(enlrargedImg);

      galleryButtonsEffects(imgs, index);
    })
  })
}

const galleryButtonsEffects = function enlargedGalleryButtonsFunctions(imgs, index){
  console.log(index);
  btnCloseGallery.addEventListener('click', () => {

    let enlrargedImg = document.querySelector('.enlrarged__img');
    enlrargedImg.remove();
    largeContainer.classList.remove('active');  
    overlay.classList.remove('active');
    });

    btnImgPrev.addEventListener('click', () => {
      
      console.log(index)
      if(index === 0) {
        btnImgPrev.classList.add('disabled');

      } else {
        index = index - 1;
        btnImgPrev.classList.remove('disabled');
        let imgSrc = imgs.galleryImgs[index].img;

        let enlrargedImg = document.querySelector('.enlrarged__img');
        enlrargedImg.remove();

        enlrargedImg = document.createElement('img');
        enlrargedImg.className = 'enlrarged__img';
        enlrargedImg.src = imgSrc;
        largeContainer.appendChild(enlrargedImg); 
      }


    });

    btnImgNext.addEventListener('click', () => {
      if( index === imgs.galleryImgs.length - 1) {
        btnImgNext.classList.add('disabled');   
      } else {
        index = index + 1;
        btnImgNext.classList.remove('disabled');
        let imgSrc = imgs.galleryImgs[index].img;
        let enlrargedImg = document.querySelector('.enlrarged__img');
        enlrargedImg.remove();

        enlrargedImg = document.createElement('img');
        enlrargedImg.className = 'enlrarged__img';
        enlrargedImg.src = imgSrc;
        largeContainer.appendChild(enlrargedImg);  
      }

    });
}


export { 
  generateGallery,
  appendPageNumber, 
  getPaginationNumbers,
  setActivePage,
  addPageNumbers,
  navigationButtons,
  enlargeItem
};



