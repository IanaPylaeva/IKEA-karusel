const debounceInterval = 300;

export const debounce = (callback, wait = debounceInterval) => {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);//метод clearTimeout отменяет тайм-аут, ранее установленный вызовом в slider.js
    timeout = setTimeout(() => callback(...args), wait); //setTimeout задержка перед запуском кода
  };
};