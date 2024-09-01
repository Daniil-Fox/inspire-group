import { projSlider } from "./sliders.js";

const accordItems = document.querySelectorAll('.w-item')
accordItems[0]?.classList.add('active')
function clearActive(){
  accordItems.forEach((item, i) => {
    const content = item.querySelector('.w-item__body')
    content.style.maxHeight = null
    item.classList.remove('active')
  })
}

accordItems.forEach((item, i) => {
  const btn = item.querySelector('.w-item__header')
  const content = item.querySelector('.w-item__body')

  if(item.classList.contains('active')){
    content.style.maxHeight = content.scrollHeight + 'px'
  }


  btn.addEventListener('click', e => {
    clearActive()
    let isActive = item.classList.add('active')
    content.style.maxHeight = content.scrollHeight + 'px'
    projSlider.slideTo(i)
  })
})
