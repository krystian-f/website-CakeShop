const paginationNumbers = document.querySelector('.pagination-numbers');
const itemsContainer = document.querySelector('.blog__list');
const itemsList = document.querySelectorAll('.blog__item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let paginationLimit = 5;
let pageCount = Math.ceil(itemsList.length / paginationLimit);
let currentPage; 

//  Functions
const generatePagination = function generatepaginationNumbers(index){
  const pageNumber = document.createElement('button');
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  paginationNumbers.appendChild(pageNumber);
}

const getPagination = function getPaginationFromIndex(){
  for(let i = 1; i <= pageCount; i++){
    generatePagination(i);
  }
}

const setBlogPage = function dsplayActivePage(pageNum){
  currentPage = pageNum;
  addPageNumbersBlog();
  handlePageButtons();

  let prevRange = (pageNum - 1) * paginationLimit;
  let currentRange = pageNum * paginationLimit;

  itemsList.forEach((item, index) => {
    item.classList.add('hidden');
    if(index >= prevRange && index < currentRange) {
      item.classList.remove('hidden');
    }
  })
}

const addPageNumbersBlog = function addpageNumbersToButtons(){
  const pageNumbers = document.querySelectorAll('.pagination-number');
  pageNumbers.forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index")); 

    if(pageIndex) {
      button.addEventListener('click', ()=> {
        setBlogPage(pageIndex);
      })
    }
  })
}

const blogNavigationButtons = function prevNextButtonsActions(){
  prevBtn.addEventListener('click', () => {
    setBlogPage(currentPage -1);
  })

  nextBtn.addEventListener('click', () => {
    setBlogPage(currentPage + 1);
  })
 }

const blogDisableButtons = function disableButtons(button){
  button.classList.add('disabled');
  button.setAttribute('disabled', true);
}

const blogActivateButtons = function activateButtons(button){
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
}


const handlePageButtons = function handlePageButtonsState () {
  if(currentPage === 1){
    blogDisableButtons(prevBtn);
  } else {
    blogActivateButtons(prevBtn);
  }

  if(pageCount === currentPage){
    blogDisableButtons(nextBtn);
  } else {
    blogActivateButtons(nextBtn);
  }
}

export {                                                                                                                                      
  getPagination,
  setBlogPage,
  addPageNumbersBlog,
  blogNavigationButtons
}