import './_components.js';

const header = document.querySelector('header')

window.addEventListener('scroll', e => {
  if(window.scrollY > 10){
    header.classList.add('scroll')
  } else {
    header.classList.remove('scroll')
  }
})
