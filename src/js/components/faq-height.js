const faqItems = document.querySelectorAll('.faq__item')

if(faqItems.length > 0){
  let maxHeight = 0;
  faqItems.forEach(item => {
    maxHeight = Math.max(item.scrollHeight, maxHeight)
  })

  faqItems.forEach(item => {
    item.style.setProperty('--item-height', maxHeight + 'px')
  })
}
