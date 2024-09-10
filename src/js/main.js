import './_components.js';

const header = document.querySelector('header')

window.addEventListener('scroll', e => {
  if(window.scrollY > 10){
    header.classList.add('scroll')
  } else {
    header.classList.remove('scroll')
  }
})

const portfolioItems = document.querySelectorAll('.ph-item')

if(portfolioItems.length > 0 && window.matchMedia("(max-width: 1024px)").matches){
  const observer = new IntersectionObserver((entries, observer) => {
    const info = entries[0].target.querySelector('.ph-item__info')
    if(entries[0].isIntersecting){
      info.classList.add('active')
    } else {
      info.classList.remove('active')
    }
  }, {
    threshold: [0.3, 1]
  })
  portfolioItems.forEach(el => {
    observer.observe(el)
  })
}
