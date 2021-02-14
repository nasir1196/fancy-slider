const imagesArea = document.querySelector('.images');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


const getImages = async (query) => {
  const key = `2969642-24632dc125be58398215519d7`;
  const url = `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo`;
  loadingSpinner();
  try {
    const promise = await fetch(url);
    const data = await promise.json();
    showImages(data.hits);
  }
  catch (error) {
    displayErrorMassage(`Something went wrong!!! Please Try Again Later D:)`);
    loadingSpinner();
  }
}


// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  // show gallery title
  galleryHeader.style.display = 'flex';

  images.forEach(image => {
    let imgDiv = document.createElement('div');
    imgDiv.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    imgDiv.innerHTML += ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") 
    src="${image.webformatURL}" alt="${image.tags}">
    `;
    gallery.appendChild(imgDiv);

  })
  const footerTitle = document.getElementById('footer-title');
  footerTitle.innerHTML = '';
  footerTitle.innerHTML += `<p  class="text-center text-danger">Copyright&copy; 2021. All Rights Reserve | Programming Hero Team</p> `;
  loadingSpinner();
}


// select item 
let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;

  element.classList.toggle('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    sliders = sliders.filter(item => item.indexOf(img));
  }
}


// slider timing 
var timer;
const createSlider = () => {

  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }

  // crate slider previous next area
  const duration = document.getElementById('duration').value || 1000;
  if (duration >= 1000) {
    sliderContainer.innerHTML = '';
    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

    sliderContainer.appendChild(prevNext)
    document.querySelector('.main').style.display = 'block';

    // hide image aria
    imagesArea.style.display = 'none';

    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100" src="${slide}" alt="">`;
      sliderContainer.appendChild(item)
    })

    changeSlide(0)

    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  } else {
    alert('Please Input Positive Value');
  }
}


// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}


// change slide item
const changeSlide = (index) => {
  const items = document.querySelectorAll('.slider-item');
  if (index <= 0) {
    slideIndex = items.length + 1
    index = slideIndex;
  };
  if (index > items.length) {
    slideIndex = 1;
  }
  items.forEach(item => {
    item.style.display = "none";
  })
  items[slideIndex - 1].style.display = "block";
}


// click handler for search button 
searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search').value;
  getImages(search);
  sliders.length = 0;

  document.getElementById('search').value = '';
})

// handler for keyPress 
const keyPress = document.getElementById('search')
keyPress.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    document.getElementById('search-btn').click();
  }
});


sliderBtn.addEventListener('click', function () {
  // const footerTitle = document.getElementById('footer-title');
  // footerTitle.innerHTML = '';
  createSlider();
})


// This function create for  display show loading icon spinner
const loadingSpinner = () => {
  const spinner = document.getElementById('load-spinner');
  spinner.classList.toggle('d-none');
}


// This function create for show display error massage 
const displayErrorMassage = (massage) => {
  const getError = document.getElementById('display-error');
  getError.innerHTML = massage;
}