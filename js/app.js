const imagesArea = document.querySelector('.images');

const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];



// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
// const KEY = '15674931-a9d714b6e9d654524df198e00&q';
const key = `2969642-24632dc125be58398215519d7`;

const getImages = (query) => {
  const url = `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      showImages(data.hits)
      // console.log('check data', data.hits);
    })
    .catch(err => console.log(err))
}


// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  // show gallery title
  galleryHeader.style.display = 'flex';
  // console.log('check', images.tags);

  images.forEach(image => {
    let imgDiv = document.createElement('div');
    imgDiv.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    imgDiv.innerHTML += ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") 
    src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(imgDiv);
  })

}

// select item 
let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;

  element.classList.toggle('added');


  let item = sliders.indexOf(img);
  console.log('check items', item);
  if (item == -1) {
    sliders.push(img);
  } //else {
  //   alert('Hey, Already added !')
  // }
}


// slider timing 
let timer;
const createSlider = () => {

  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }

  // crate slider previous next area
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

  const duration = document.getElementById('duration') || 1000;
  // const newDuration = parseInt(duration.value) || 1000;
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


searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search').value;
  getImages(search);
  sliders.length = 0;
})

// handler for keyPress 
document.getElementById('search').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    document.getElementById('search-btn').click();
  }
});


sliderBtn.addEventListener('click', function () {
  createSlider();
})
