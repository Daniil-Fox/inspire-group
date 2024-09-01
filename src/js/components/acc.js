const accordions = document.querySelectorAll('[data-acc-container="1"]')

if(accordions.length > 0){
  accordions.forEach(ac => {
    const btn = ac.querySelector('[data-acc-btn]')
    const content = ac.querySelector('[data-acc-content]')

    btn.addEventListener('click', e => {
      e.preventDefault()

      let isActive = ac.classList.toggle('active')

      if(isActive){
        content.style.maxHeight = content.scrollHeight + 'px'
      } else {
        content.style.maxHeight = null
      }
    })
  })
}
