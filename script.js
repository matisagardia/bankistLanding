'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


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





