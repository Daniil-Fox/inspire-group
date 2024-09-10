import {Swiper} from 'swiper'
import { Navigation, EffectFlip, EffectFade, Thumbs, Pagination, Keyboard } from 'swiper/modules'

Swiper.use([Navigation, EffectFlip, EffectFade, Thumbs, Pagination, Keyboard])


const projSlider = new Swiper('.working__slider', {
  slidesPerView: 1,
  spaceBetween: 40,
  speed: 400,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
})

const portfolioName = document.querySelector('.portfolio__name')

const portfolioSlider = new Swiper('.portfolio__slider', {
  slidesPerView: 1,
  spaceBetween: 40,
  speed: 400,
  navigation: {
    prevEl: '.portfolio-prev',
    nextEl: '.portfolio-next',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  on: {
    slideChangeTransitionStart: swiper => {
      if(portfolioName){
        portfolioName.style.opacity = 0
      }
    },
    slideChangeTransitionEnd: swiper => {
      if(portfolioName){
         const active = swiper.hostEl.querySelector('.swiper-slide-active')
        portfolioName.textContent = active.dataset.projectName ?? "Имя заведения"
        portfolioName.style.opacity = 1
      }
    }
  }
})




const tabs = document.querySelectorAll('.portfolio__tab')
const tabsContent = document.querySelectorAll('.portfolio__content')


function clearActive(){
  tabsContent.forEach(el => el.classList.remove('active'))
  tabs.forEach(el => el.classList.remove('active'))
}


tabs.forEach(t => {
  t.addEventListener('click', e => {
    e.preventDefault()
    const dataset = t.dataset.tab

    clearActive()
    const current = document.querySelector(`.portfolio__content[data-tab-content="${dataset}"]`)
    t.classList.add('active')
    current.classList.add('active')


  })
})



window.addEventListener('DOMContentLoaded', () => {

  const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function(className, settings) {
      swiper = new Swiper(className, settings);

      if (callback) {
        callback(swiper);
      }
    }

    const checker = function() {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener('change', checker);
    checker();
  }

  const someFunc = (instance) => {
    if (instance) {
      instance.on('slideChange', function (e) {
        console.log('*** mySwiper.activeIndex', instance.activeIndex);
      });
    }
  };

  resizableSwiper(
    '(max-width: 576px)',
    '.other__slider',
    {
      spaceBetween: 16,
      slidesPerView: 'auto',
      pagination: {
        el: '.other-pagination',
        clickable: true,
      },
    },
    someFunc
  );
});


const testiItems = new Swiper('.testi__items', {
  slidesPerView: 1,
  spaceBetween: 40,

  navigation: {
    prevEl: '.testi-prev',
    nextEl: '.testi-next',
  },
  pagination: {
    el: '.testi__pagination',
    clickable: true
  }
})

const testiContainers = document.querySelectorAll('.testi__container')

testiContainers.forEach(cont => {
  const thumbs = cont.querySelector('.testi__thumbs')
  const main = cont.querySelector('.testi__slider')

  const testiThumbs = new Swiper(thumbs, {
    slidesPerView: 4,
    spaceBetween: 10,
  })

  const testiSlider = new Swiper(main, {
    slidesPerView: 1,
    spaceBetween: 40,
    nested: true,
    thumbs: {
      swiper: thumbs,
    }
  })

})



const quizSlider = new Swiper('.quiz__slider', {
  slidesPerView: 1,
  spaceBetween: 40,

  navigation: {
    nextEl: '.quiz-next',
    prevEl: '.quiz-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
})

const quizControl = document.querySelector('.quiz-control')
const slidesCount = document.querySelectorAll('.quiz__slider .swiper-slide').length

quizSlider.on('slideChange', swiper => {
  if(swiper.activeIndex != 0 && swiper.activeIndex != slidesCount-1){
    quizControl.classList.add('active')
  } else {
    quizControl.classList.remove('active')
  }
})

quizSlider.on('keyPress', (swiper, keyCode) => {
  switch (keyCode) {
    case 13:
      swiper.slideNext();
      break;
  }
})



export {projSlider}

