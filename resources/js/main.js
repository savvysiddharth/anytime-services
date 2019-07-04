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

  function fetchImages() {
    const count = 6;
    const url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=15455632614.5d920c2.e349afc3967d46d3835912174daec263&count="+count;

  }

  addEventListenersForModals();
  addEventListenerForTabs();
  initiateSlideShows();
  addEventListenersForHamburger();
  addStickyNav();
}

function loadingFinished() {
  const loader = document.querySelector('.loader-container');
  loader.style.animation = 'fadeOut 1s';
  setTimeout(()=> {
    loader.style.display = 'none';
  }, 800);
}

window.onload = function() {
  initDynamicComponents();
  loadingFinished();
};