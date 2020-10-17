export const shouldResize = (event) => {
  return event.target.dataset.resize;
};

export const isCell = (event) => {
  return event.target.dataset.type === 'cell';
};
