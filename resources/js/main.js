function initDynamicComponents() {

  function addEventListenersForModals() {

    // Common functions for all modal
    function openModal(modal) {
      modal.style.display = 'block';
    }

    function closeModal(modal) {
      modal.style.animation = 'fadeOut 0.5s';
      setTimeout(()=> {
        modal.style.display = 'none';
        modal.style.animation = 'fadeIn 1s';
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

  function addEventListenersForSmoothScrolls() {

    function smoothScroll(target, duration) {
      target = document.querySelector(target);
      let targetPosition = target.getBoundingClientRect().top;
      let startPosition = window.pageYOffset;
      let distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
        if(startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
      }

      function ease(t, b, c, d) {
        t /= d / 2;
        if(t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * ( t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }

    document.querySelector('#nav-btn-client').addEventListener('click', () => {
      smoothScroll('.section-clients', 1000);
    });

    document.querySelector('#nav-btn-services').addEventListener('click', ()=> {
      smoothScroll('.section-services', 1000);
    });

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

  addEventListenersForModals();
  addEventListenersForSmoothScrolls();
  addEventListenerForTabs();
}

window.onload = function() {
  initDynamicComponents();
};