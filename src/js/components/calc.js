const prices = {
  'plan' : {
    price: 500,
    active: true
  },
  '3D' : {
    price: 450,
    active: true,
  },
  'docs' : {
    price: 300,
    active: true,
  },
  'material' : {
    price: 150,
    active: true,
  },
  "observer" : {
    price: 1000,
    active: true,
  }
}

const inputCalc = document.querySelector('.calc-cost__number')

if(inputCalc){

  const inp = inputCalc.querySelector('input')
  const btnMinus = inputCalc.querySelector('.minus')
  const btnPlus = inputCalc.querySelector('.plus')

  const min = +inp.min;
  const max = +inp.max;
  let inputValue = inp.value


  const squareContainer = document.querySelector('[data-calc="square"]').querySelector('.calc-cost__price>span')
  const totalContainer = document.querySelector('.calc-cost__result').querySelector('.calc-cost__price>span')

  const calcItems = document.querySelectorAll('.calc-cost__service')

  const calcChecboxes = document.querySelectorAll('.calc-radio__radio')


  const initChecks = () => {
    calcChecboxes.forEach(check => {
      const checkVal = check.value
      check.addEventListener('change', e => {
        if(e.currentTarget.checked){
          toggleEl(checkVal, false)
        } else {
          toggleEl(checkVal, true)
        }

        prices[checkVal].active = e.currentTarget.checked

        setTotal(inputValue)
      })
    })
  }

  const checkValue = (input) => {
    if (inputValue > max) {
      input.value = max
      inputValue = input.value
    }
    else if (inputValue < min) {
      input.value = min
      inputValue = input.value
    }
  }

  const plusSquare = (input) => {
    input.value++
    inputValue = input.value
    checkValue(input)
  }

  const minusSquare = (input) => {
    input.value--
    inputValue = input.value
    checkValue(input)
  }

  const toggleEl = (selector, flag) => {
    const el = document.querySelector(`[data-calc="${selector}"]`)
    if(flag){
      el.classList.add('hide')
    } else {
      el.classList.remove('hide')
    }
  }

  const calcPriceItem = (selector, square) => {
    return prices[selector].price * square;
  }
  const calcTotal = (square) => {
    let S = 0;
    for(let i = 0; i < Object.keys(prices).length; i++){
      const itr = Object.values(prices)[i]
      S += itr.active ? square * itr.price : 0
    }

    return S;
  }

  const setSquare = (value) => {
    squareContainer.textContent = value
  }
  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  const setTotal = (value) => {
    value = calcTotal(value)
    totalContainer.textContent = numberWithSpaces(value)
  }
  const reculcItems = () => {
    calcItems.forEach(item => {
      const itemType = item.dataset.calc
      const priceContainer = item.querySelector('.calc-cost__price>span')

      priceContainer.textContent = calcPriceItem(itemType, inputValue)

    })
  }



  inp.addEventListener('input', (e) => {
    inputValue = +inp.value;
    checkValue(e.currentTarget)
    setSquare(inputValue)
    reculcItems()
    setTotal(inputValue)
  })

  btnMinus.addEventListener('click', e => {
    minusSquare(inp)
    setSquare(inp.value)
    reculcItems()
    setTotal(inputValue)
  })

  btnPlus.addEventListener('click', e => {
    plusSquare(inp)
    setSquare(inp.value)
    reculcItems()
    setTotal(inputValue)
  })
  initChecks()
  setTotal(inputValue)
}
