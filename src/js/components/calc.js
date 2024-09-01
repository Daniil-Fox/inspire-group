const prices = {
  'plan' : 500,
  '3D' : 450,
  'docs' : 300,
  'material' : 150,
  "author" : 1000
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

  const showItem = (price, type) => {
    const current = document.querySelector(`[data-calc="${type}"]`)
    const currentPrice = current.querySelector('.calc-cost__price>span')
    currentPrice.textContent = price

    current.classList.add('visible')
  }

  const calcPriceItem = (selector, square) => {
    return prices[selector] * square;
  }
  const calcTotal = (square) => {
    let S = 0;
    for(let i = 0; i < Object.keys(prices).length; i++){
      S += square * Object.values(prices)[i]
    }

    return S;
  }

  const setSquare = (value) => {
    squareContainer.textContent = value
  }



  inp.addEventListener('input', (e) => {
    inputValue = +inp.value;
    checkValue(e.currentTarget)
    setSquare(inputValue)
  })

  btnMinus.addEventListener('click', e => {
    minusSquare(inp)
    setSquare(inp.value)
  })

  btnPlus.addEventListener('click', e => {
    plusSquare(inp)
    setSquare(inp.value)
  })

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  totalContainer.textContent = numberWithSpaces(calcTotal(inputValue))
}
