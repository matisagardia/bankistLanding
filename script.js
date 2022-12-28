'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');




const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scrolling when clicking on the learn more button, with the getboundingclientrect method we get the coordinates of the button that we are clicking

btnScrollTo.addEventListener('click', (e) => {
    //getting coordinates
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
    console.log(window.scrollX, scrollY);
    //scrolling
    section1.scrollIntoView({behavior:'smooth'});
});


// smooth scrolling when clicking on the nav bar buttons. Prevents the default behavior (href anchor), then gets the href attribute which
// points to the id of each section and apply the scrollIntoView method to reach that section. However, as there is a forEach method
// we are running this function on each button, which would be not the best way in case of having a lot of buttons.
// Because of that, we take advantage of the event propagation concept and use the parent container as event propagator to the buttons.

// const navButtons = document.querySelectorAll('.nav__link');

// navButtons.forEach(function(el) {
//     el.addEventListener('click', function(e) {
//         e.preventDefault();
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//     })
// });

// To fix the previous, we write an eventListener to the parent, and look to where has the event been triggered, and there is the clicked child.
// As we want to work with the button where the click happened, we apply the Matching Strategy to match exactly the places where we want 
// to catch the event in the if statement. Then, we apply the same as the case above.


document.querySelector('.nav__links').addEventListener('click', function (e){
    if(e.target.classList.contains('nav__link')) {
        e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
});

// Adding functions to the functionalities buttons. We could do of course a for each method, but again, it is a bad practice because we could
// have a lot of buttons and making one callback function for each of them is not efficient.
// Instead, we call the function on the common parent of each button.

tabsContainer.addEventListener('click', function(e) {

// below, if we select e.target, it is okay but when clicking the buttons there is a span element, which is the number
// we don't want to receive that span element, so, by passing  closest to the method, we select the closest parent with that name only.
const clicked = e.target.closest('.operations__tab');

  // Guard clause. This is for the case that we click on the parent element instead of the buttons, because it will return NULL as it does not have
  // any parent.
if(!clicked) return;

  // we remove the active class in all of the buttons and then we add it to the clicked button.
tabs.forEach(t => t.classList.remove('operations__tab--active'));
clicked.classList.add('operations__tab--active');

  // Activate content area
tabsContent.forEach(t => t.classList.remove('operations__content--active'));
document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});


  // Menu fade animation

  const handleHover = function(e, opacity) {
    if(e.target.classList.contains('nav__link')) {

      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach(s => {
        if(s !== link) s.style.opacity = opacity;
      });
      logo.style.opacity = opacity;
    }
  };

  // Passing an argument to an event handler function

nav.addEventListener('mouseover', e => handleHover(e, 0.5));

nav.addEventListener('mouseout', e => handleHover(e, 1));

// Sticky navigation

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;


const stickyNav = function (entries){
  const [entry] = entries;
  if(!entry.isIntersecting)  nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);