const imagesArea = document.querySelector('.images');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


const getImages = async(query) => {
  const key = `2969642-24632dc125be58398215519d7`;
  const url = `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo`;
  loadingSpinner();
  try {
    const promise = await fetch(url);
    const data = await promise.json();
    showImages(data.hits);
  }
  catch (error) {
    displayErrorMassage("Something went wrong load this song!! please try again later");
    
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
  loadingSpinner();
  const footerTitle = document.getElementById('footer-title');
  footerTitle.innerHTML = '';
  footerTitle.innerHTML += `<p  class="text-center text-danger">Copyright&copy; 2021. All Rights Reserve | Programming Hero Team</p> `;
  
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
  }
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

  const duration = document.getElementById('duration');
  // const newDuration = parseInt(duration.value) || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100" src="${slide}" alt="">`;
    sliderContainer.appendChild(item)
  })

  changeSlide(0)

  timer = setInterval(function () {
    changeSlide(slideIndex);
    slideIndex++;
  }, 1000);
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
  const footerTitle = document.getElementById('footer-title');
  footerTitle.innerHTML = '';
  // const duration = document.getElementById('duration');
  // timer = setInterval(function () {
  //   changeSlide(slideIndex);
  //   slideIndex++;
  // }, duration);
  createSlider();
})

// This function create for show display error massage 
const displayErrorMassage = (error) => {
  const getError = document.getElementById('error-massage');
  console.log(getError);
  getError.innerText = error;
}

// This function create for  display show loading icon spinner
const loadingSpinner = () => {
  const spinner = document.getElementById('load-spinner');
  spinner.classList.toggle('d-none');
}



// const imagesArea = document.querySelector('.images');

// const galleryHeader = document.querySelector('.gallery-header');
// const searchBtn = document.getElementById('search-btn');
// const sliderBtn = document.getElementById('create-slider');
// const sliderContainer = document.getElementById('sliders');
// // selected image 
// let sliders = [];



// // If this key doesn't work
// // Find the name in the url and go to their website
// // to create your own api key
// // const KEY = '15674931-a9d714b6e9d654524df198e00&q';
// const key = `2969642-24632dc125be58398215519d7`;

// const getImages = (query) => {
//   const url = `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo`;
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       showImages(data.hits)
//       // console.log('check data', data.hits);
//     })
//     .catch(err => console.log(err))
// }


// // show images 
// const showImages = (images) => {
//   imagesArea.style.display = 'block';
//   const gallery = document.querySelector('.gallery');
//   gallery.innerHTML = '';

//   // show gallery title
//   galleryHeader.style.display = 'flex';
//   // console.log('check', images.tags);

//   images.forEach(image => {
//     let imgDiv = document.createElement('div');
//     imgDiv.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
//     imgDiv.innerHTML += ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") 
//     src="${image.webformatURL}" alt="${image.tags}">`;
//     gallery.appendChild(imgDiv);
//   })

// }

// // select item 
// let slideIndex = 0;
// const selectItem = (event, img) => {
//   let element = event.target;

//   element.classList.toggle('added');


//   let item = sliders.indexOf(img);
//   console.log('check items', item);
//   if (item == -1) {
//     sliders.push(img);
//   } //else {
//   //   alert('Hey, Already added !')
//   // }
// }


// // slider timing 
// let timer;
// const createSlider = () => {

//   // check slider image length
//   if (sliders.length < 2) {
//     alert('Select at least 2 image.')
//     return;
//   }

//   // crate slider previous next area
//   sliderContainer.innerHTML = '';
//   const prevNext = document.createElement('div');
//   prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
//   prevNext.innerHTML = ` 
//   <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
//   <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
//   `;

//   sliderContainer.appendChild(prevNext)
//   document.querySelector('.main').style.display = 'block';

//   // hide image aria
//   imagesArea.style.display = 'none';

//   const duration = document.getElementById('duration') || 1000;
//   // const newDuration = parseInt(duration.value) || 1000;
//   sliders.forEach(slide => {
//     let item = document.createElement('div')
//     item.className = "slider-item";
//     item.innerHTML = `<img class="w-100" src="${slide}" alt="">`;
//     sliderContainer.appendChild(item)
//   })
//   updateSlider(duration)
//   changeSlide(0)

//   // timer = setInterval(function () {
//   //   slideIndex++;
//   //   changeSlide(slideIndex);
//   // }, duration);

// }
// let speed = 0;
// function updateSlider(slideAmount) {
//   speed = slideAmount;
// }
// function load() {
//   downloadUrl("points.xml", function (data) {
//     /* code */
//     abc(data);
//   });
//   function abc() {
//     function track() {
//       /* code */
//       downloadUrl("points.xml", function (data) {
//         var xml = data.responseXML;
//         var points = xml.documentElement.getElementsByTagName("point");
//         var i = 0;
//         setInterval(function () {
//           if (i != points.length) {
//             alert(speed);
//           }
//           i++;
//         }, speed);
//       });
//     }
//     track();
//   }
// }


// // change slider index 
// const changeItem = index => {
//   changeSlide(slideIndex += index);
// }


// // change slide item
// const changeSlide = (index) => {
//   const items = document.querySelectorAll('.slider-item');
//   if (index <= 0) {
//     slideIndex = items.length + 1
//     index = slideIndex;
//   };
//   if (index > items.length) {
//     slideIndex = 1;
//   }
//   items.forEach(item => {
//     item.style.display = "none";
//   })
//   items[slideIndex - 1].style.display = "block";
//   console.log('check change slide', items);
// }
// changeSlide();


// searchBtn.addEventListener('click', function () {
//   document.querySelector('.main').style.display = 'none';
//   clearInterval(timer);
//   const search = document.getElementById('search').value;
//   getImages(search);
//   sliders.length = 1;
// })

// // handler for keyPress 
// document.getElementById('search').addEventListener('keypress', function (event) {
//   if (event.key === 'Enter') {
//     document.getElementById('search-btn').click();
//   }
// });


// sliderBtn.addEventListener('click', function () {
//   createSlider();
// })