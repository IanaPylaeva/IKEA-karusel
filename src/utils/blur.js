export const setOnClickBlur = () => {
  const blurClickSelectors = [`a[href]`, `button`];

  document.addEventListener(`click`, (evt) => {
    blurClickSelectors.forEach((selector) => {
      const clickedElement = evt.target.closest(selector);

      if (clickedElement && clickedElement === document.activeElement) {
        clickedElement.blur(); //Метод blur снимает фокус с элемента
      }
    });
  });
};