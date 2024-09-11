import { validateForms } from './../functions/validate-forms.js';
import JustValidate from 'just-validate';
import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js";
const checks1 = [
  {
    selector: ".quiz-check-1",
    errorMessage: "Выберите чекбоксы",
  },
  {
    selector: ".quiz-check-2",
    errorMessage: "Выберите чекбоксы",
  }
];
const checks2 = [
  {
    selector: ".quiz-check-3",
    errorMessage: "Выберите чекбоксы",
  },
  {
    selector: ".quiz-check-4",
    errorMessage: "Выберите чекбоксы",
  }
];
const rules1 = [
  {
    ruleSelector: '.input-name',
    rules: [
      {
        rule: 'minLength',
        value: 3
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните имя!'
      }
    ]
  },
  {
    ruleSelector: '.main-quiz-tel',
    tel: true,
    telError: 'Введите корректный телефон',
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните телефон!'
      }
    ]
  },
  {
    ruleSelector: '.input-email',
    rules: [
      {
        rule: 'required',
      },
      {
        rule: 'email',
      }
    ]
  },
];

const rules2 = [{
  ruleSelector: '.sec-quiz-tel',
  tel: true,
  telError: 'Введите корректный телефон',
  rules: [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Заполните телефон!'
    }
  ]
},]

const afterForm = () => {
  console.log('Произошла отправка, тут можно писать любые действия');
};


// validateForms('.quiz-form-wrap', rules1, checks1, afterForm);
// validateForms('.quiz-form-wrap', rules2, checks2, afterForm);

const quizFormWrap = document.querySelector('.quiz-form-wrap')



const validation = new JustValidate(quizFormWrap);

function setValidation(validator, rules, checks, phoneSelector, afterSend){
  validator = new JustValidate(quizFormWrap);
  const telSelector = document.querySelector(phoneSelector)
  if (telSelector) {
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    for (let item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: 'function',
          validator: function() {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: item.telError
        });
      }
    }
  }

  for (let item of rules) {
    validator
      .addField(item.ruleSelector, item.rules);
  }

  if (checks.length) {
    for (let item of checks) {
      validator
        .addRequiredGroup(
          `${item.selector}`,
          `${item.errorMessage}`
        )
    }
  }

  validator.onSuccess((ev) => {
    let formData = new FormData(ev.target);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (afterSend) {
            afterSend();
          }
          console.log('Отправлено');
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    ev.target.reset();
  })
}






setValidation(validation, rules1, checks1, '.main-quiz-tel')










const socialsBtn = document.querySelector('.quiz__socials-btn')
const socModal = document.querySelector('.quiz-soc')

const backToAll = document.querySelector('.quiz-soc__backall')
const backToSoc = document.querySelector('.quiz-soc__backsoc')

const quizBody1 = document.querySelector('.quiz-soc__body[data-soc-page="1"]')
const quizBody2 = document.querySelector('.quiz-soc__body[data-soc-page="2"]')

socialsBtn?.addEventListener('click', e => {
  validation.destroy()
  setValidation(validation, rules2, checks2, '.sec-quiz-tel')



  socModal.classList.add('active')
  let value = null;

  const quizSocItems = quizBody1.querySelectorAll('.quiz-soc__item')

  quizSocItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()
      value = item.dataset.value
      quizBody1.style.opacity = 0

      quizBody2.querySelector('.quiz-soc__choice').innerHTML = getWayToContact(value)

      setTimeout(() => {
        quizBody1.classList.remove('active')
        quizBody2.classList.add('active')
      }, 300)

      setTimeout(() => {
        quizBody2.style.opacity = 1
      }, 330)
    })
  })
})

function getWayToContact(way){
  let img = ''
  let name = ''
  if(way == 'whatsapp'){
    img = './img/whatsapp.svg'
    name = 'Whatsapp'
  } else if (way == 'телефон'){
    img = './img/tel.svg'
    name = 'Телефон'
  }

  return `
      <div class="quiz-soc__item quiz-soc__item--one">
        <div class="quiz-soc__icon">
          <img src="${img}" alt="" />
        </div>
        <span>${name}</span>
      </div>
  `;
}

backToAll?.addEventListener('click', e => {
  validation.destroy()
  setValidation(validation, rules1, checks1, '.main-quiz-tel')
  socModal.classList.remove('active')
})
backToSoc?.addEventListener('click', e => {
  quizBody2.style.opacity = 0

  setTimeout(() => {
    quizBody2.classList.remove('active')
    quizBody1.classList.add('active')
  }, 300)

  setTimeout(() => {
    quizBody1.style.opacity = 1
  }, 330)
})
