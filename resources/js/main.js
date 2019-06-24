function initDynamicComponents() {

  const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

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
      const contactBtn = document.querySelector('#contact-modal-btn');
      const contactModal = document.querySelector('#contact-modal');
      const closeBtn = document.querySelector('#contact-modal-close-btn');

      contactBtn.addEventListener('click', () => openModal(contactModal));
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

    tabButtons[0].click(); //force clicking open first tab
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

    for(let i = 0 ; i < carousals.length ; i++) {
      setInterval(()=> {
        slideShow(carousals[i])
      }, 3000);
    }
  }

  function addEventListenersForHamburger() {
    const hamburger = document.querySelector('.hamburger-btn');
    const navBox = document.querySelector('.main-nav-container');

    function closeNav() {
      navBox.style.right = '-100%';
      hamburger.innerHTML = '<i class="ion-navicon"></i>';
    }

    function openNav() {
      navBox.style.right = '0';
      hamburger.innerHTML = '<i class="ion-ios-close-empty"></i>';
    }

    hamburger.addEventListener('click', ()=> {
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

  function addBackToTopButton() {
    if(width > 767) {
      const toTopBtn = document.querySelector("#back-to-top");

      function scrollFunction() {
        if (document.body.scrollTop > window.innerHeight - 20 || document.documentElement.scrollTop > window.innerHeight - 10) {
          toTopBtn.style.display = "block";
        } else {
          toTopBtn.style.display = 'none';
        }
      }

      function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }

      window.addEventListener('scroll', scrollFunction);

      toTopBtn.addEventListener('click', topFunction);
    }
  }

  addEventListenersForModals();
  addEventListenerForTabs();
  initiateSlideShows();
  addEventListenersForHamburger();
  addBackToTopButton();
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