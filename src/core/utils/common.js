export const capitalize = (str) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toLocaleUpperCase() + str.substr(1);
};
/**
 * Range
 * @param {number} start
 * @param {number} end
 * @return {array}
 */
export const range = (start, end) => {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index);
};

export const storage = (key, data=null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
