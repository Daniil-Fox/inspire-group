const footerMenu = document.querySelector('.footer__list')

if(footerMenu){
  const footerItems = footerMenu.querySelectorAll('.footer-item')
  function clear(){
      footerItems.forEach(item => {
        const btn = item.querySelector('.footer-item__page')

        const content = item.querySelector('ul')

        item.style.height = null
        content.style.maxHeight = null
        content.style.overflow = null;
      })
  }
  footerItems.forEach(item => {
    const btn = item.querySelector('.footer-item__page')

    const content = item.querySelector('ul')

    const contentHeight = content.scrollHeight
    const allHeight = btn.scrollHeight + contentHeight


    content.style.top = btn.scrollHeight + 13 + 'px'



    btn.addEventListener('click', e => {
      let isActive = item.classList.toggle('active')

      if(isActive){
        clear()
        item.style.height = allHeight + 'px'
        content.style.maxHeight = contentHeight + 'px'
        content.style.overflow = 'visible'

      } else {
        item.style.height = null
        content.style.maxHeight = null
        content.style.overflow = null;
      }
    })
  })
}
