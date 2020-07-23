function initDynamicComponents() {

  const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  const navBox = document.querySelector('.main-nav-container');

  function addEventListenersForModals() {

    // Common functions for all modal
    function openModal(modal) {
      modal.style.display = 'block';
    }

    function closeModal(modal) {
      modal.style.animation = 'fadeOut 0.5s';
      setTimeout(()=> {
        modal.style.display = 'none';
        modal.style.animation = 'fadeIn 0.6s';
      }, 400);
    }

    function closeModalOnBackgroundClick(modal) {
      document.body.addEventListener('click', (e) => {
        if(e.target == modal) {
          closeModal(modal);
        }
      });
    }

    function forContactModal() {
      const contactBtns = document.querySelectorAll('.contact-modal-btn');
      const contactModal = document.querySelector('#contact-modal');
      const closeBtn = document.querySelector('#contact-modal-close-btn');

      for(btn of contactBtns) {
        btn.addEventListener('click', () => openModal(contactModal));
      }

      closeBtn.addEventListener('click', () => closeModal(contactModal));

      document.body.addEventListener('click', () => closeModalOnBackgroundClick(contactModal) );
    }

    forContactModal();
  }

  function addEventListenerForTabs() {

    function openServiceBox(evt, targetId) {
      let i, tabcontent, tablinks;

      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      document.getElementById(targetId).style.display = "block";
      evt.currentTarget.className += " active";
    }

    // n-th button corresponds to n-th tabContent
    let tabButtons = Array.from(document.querySelector('.service-tabs').children);
    let tabContents = Array.from(document.querySelector('.tabcontent-container').children);

    for(let i in tabButtons) {
      tabButtons[i].addEventListener('click', function(e) {
        openServiceBox(e, tabContents[i].id);
      });
    }

    tabButtons[0].click(); //force clicking open first tab initially
  }

  function initiateSlideShows() {
    function slideShow(carousal) {
      const imageArray = Array.from(carousal.querySelectorAll('.photo-container'));
      for(let i=0; i<imageArray.length ; i++) {
        const isItActive = Array.from(imageArray[i].classList).includes('active');
        if(isItActive) {
          imageArray[i].classList.remove('active');
          if(++i < imageArray.length) { //check next index
            imageArray[i].classList.add('active');
          } else {
            imageArray[0].classList.add('active');
          }
          break;
        }
      }
    }

    const carousals = document.querySelectorAll('.carousal');

    // add interval for all carousals
    for(let i = 0 ; i < carousals.length ; i++) {
      setInterval(()=> {
        slideShow(carousals[i])
      }, 3000);
    }
  }

  function addEventListenersForHamburger() {
    const hamburgerContainer = document.querySelector('.hamburger-btn');
    const hamburger = document.querySelector('.hamburger');

    function closeNav() {
      navBox.style.right = '-100%';
      hamburger.classList.toggle('is-active');
    }

    function openNav() {
      navBox.style.right = '0';
      hamburger.classList.toggle('is-active');
    }

    hamburgerContainer.addEventListener('click', ()=> {
      if(navBox.getBoundingClientRect().left == 0) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close nav when one of nav item is tapped
    if (width <= 767) {
      const navItems = Array.from(document.querySelector('.main-nav').children);
      for(let i in navItems) {
        navItems[i].addEventListener('click',() => {
          closeNav();
        });
      }
    }
  }

  function addStickyNav() {
    if(width > 767) {

      function scrollFunction() {
        if (document.body.scrollTop > window.innerHeight - 20 || document.documentElement.scrollTop > window.innerHeight - 20) {
          navBox.classList.add('sticky-nav');
        } else {
          navBox.classList.remove('sticky-nav');
        }
      }

      window.addEventListener('scroll', scrollFunction);
    }
  }

  // backup images (locally stored on web server) in format of api response (in case instagram api fails)
  const backupImages = [
    {images: {standard_resolution: {url: "./backup_media/p1.jpg"}}},
    {images: {standard_resolution: {url: "./backup_media/p2.jpg"}}},
    {images: {standard_resolution: {url: "./backup_media/p3.jpg"}}},
    {images: {standard_resolution: {url: "./backup_media/p4.jpg"}}},
    {images: {standard_resolution: {url: "./backup_media/p5.jpg"}}},
    {images: {standard_resolution: {url: "./backup_media/p6.jpg"}}},
    {images: {standard_resolution: {url: "./backup_media/p7.jpg"}}},
    {images: {standard_resolution: {url: "./backup_media/p8.jpg"}}},
    {images: {standard_resolution: {url: "./backup_media/p9.jpg"}}},
    {images: {standard_resolution: {url: "./backup_media/p10.jpg"}}},
  ];

  function fetchImages() {
    const count = 12;
    const url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=15455632614.5d920c2.c9acf1d6f418412385084524d2d8c3c7&count="+count;
    const gallery = document.querySelector('.gallery-container');
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      let resItems = res.data;
      if(!resItems) {
        console.log('Failed to fetch images from Instagram');
        console.log('Loading backup images');
        resItems = backupImages;
      }
      for(const item of resItems) {
        let container;
        if (item.type === "video") {
          container = document.createElement("video");
          const source = document.createElement("source");
          source.src = item.videos.low_resolution.url;
          container.autoplay = "true";
          container.loop = "true";
          container.setAttribute("controls","controls")
          container.appendChild(source);
        } else { // images and other kinds of posts
          container = document.createElement("img");
          container.src = item.images.standard_resolution.url;
        }
        let deg = Math.random() * 10;
        deg *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
        container.style.transform = 'rotate('+deg+'deg)';
        container.classList.add("gallery-item");
        gallery.appendChild(container);
      }
    });

  }

  function addPopUpAnimations() {
    const items = [];

    // for client boxes
    items.push(...document.querySelectorAll('.tablinks'));
    items.push(...document.querySelectorAll('.gallery-item'));
    items.push(...document.querySelectorAll('.logo-container'));
    for(const item of items) {
      item.classList.add("wow","zoomIn");
    }
  }

  addEventListenersForModals();
  addEventListenerForTabs();
  initiateSlideShows();
  addEventListenersForHamburger();
  addStickyNav();
  fetchImages();
  // addPopUpAnimations();
}

function loadingFinished() {
  const loader = document.querySelector('.loader-container');
  const megacontainer = document.querySelector('.mega-container');
  loader.style.animation = 'fadeOut 1s';
  setTimeout(()=> {
    loader.style.display = 'none';
  }, 800);
  megacontainer.style.display = 'block';
}

window.onload = function() {
  initDynamicComponents();
  loadingFinished();
  // new WOW().init();
};