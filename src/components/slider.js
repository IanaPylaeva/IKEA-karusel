import {debounce} from '../utils/debounce.js';

let elementsInSlide = 5;
const buttonDebounceInterval = 50;
const defaultTransition = `transform 0.6s ease`;

const placingPositionStart = `start`;
const placingPositionEnd = `end`;

const directionRight = -1;
const directionLeft = 1;

export const slider = (root) => {
  const sliderRoot = root;
  const sliderWrapper = sliderRoot.querySelector(`.slider__wrapper`);
  const sliderList = sliderRoot.querySelector(`.goods__list`);
  const sliderItem = sliderList.querySelector(`.slider__item`);
  const sliderNextButton = sliderRoot.querySelector(`.slider__button--next`);
  const sliderPrevButton = sliderRoot.querySelector(`.slider__button--prev`);

  let sliderChildren = sliderList.children; //дочерний элемент из слайдера (1 карточка)
  let sliderDirection = directionRight;
  

  /* Установить шаг сдвига слайдера (5 карточек) при нажатии на стрелки */
  const sliderStep = sliderItem.offsetWidth * elementsInSlide; //offsetWidth возвращает ширину элемента

  const getTranslate = (shiftX = 0, shiftY = 0, shiftZ = 0) => {
    return `translate3d(${shiftX}px, ${shiftY}px, ${shiftZ}px)`; //translate3d - сдвигает элемент на заданное значение в трёхмерном пространстве.
  };

  /* Установить трансформацию объекта */
  const setTransform = (direction) => {
    sliderList.style.transform = getTranslate(direction * sliderStep);
  };

  const replaceElements = (placing) => {
    const sliderElements = Array.from(sliderChildren); // принимает объект, проверяет, является ли он итерируемым объектом или псевдомассивом, затем создаёт новый массив и копирует туда все элементы.

    const newFragment = document.createDocumentFragment();
    const sliderLastGroup = sliderElements.slice(-elementsInSlide); //метод slice возвращает новый массив, в который копирует элементы, начиная с -5 до конца.
    const sliderFirstGroup = sliderElements.slice(0, elementsInSlide);

    if (placing === placingPositionStart) {
      for (const el of sliderLastGroup) {
        newFragment.appendChild(el); //Метод appendChild вставка в конец
      }

      sliderList.prepend(newFragment);//Метод appendChild вставка элемента в начало
    }

    if (placing === placingPositionEnd) {
      for (const el of sliderFirstGroup) {
        newFragment.appendChild(el);
      }

      sliderList.append(newFragment);
    }
  };
  
  /* Слушатель к стрелке - следующий */
  sliderNextButton.addEventListener(`click`, debounce(() => {
    if (sliderDirection === directionLeft) {
      sliderDirection = directionRight;
      replaceElements(placingPositionStart);
    }

    sliderWrapper.style.justifyContent = `flex-start`;
    sliderList.style.justifyContent = `flex-start`;
    setTransform(sliderDirection);
  }, buttonDebounceInterval));
  
  /* Слушатель к стрелке - предыдущий */
  sliderPrevButton.addEventListener(`click`, debounce(() => {
    if (sliderDirection === directionRight) {
      sliderDirection = directionLeft;
      replaceElements(placingPositionEnd);
    }

    sliderWrapper.style.justifyContent = `flex-end`;
    sliderList.style.justifyContent = `flex-end`;
    setTransform(sliderDirection);
  }, buttonDebounceInterval));

  /* Обработчик на несколько анимаций */
  sliderList.addEventListener(`transitionend`, (evt) => {
    if (evt.target === sliderList) {
      replaceElements(sliderDirection === directionLeft ? placingPositionStart : placingPositionEnd);

      sliderList.style.transition = `none`;
      setTransform(0);
      setTimeout(() => {
        sliderList.style.transition = defaultTransition;
      });
    }
  });
};