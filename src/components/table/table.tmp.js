const CODES = {
  A: 65,
  Z: 90,
};
const createCell = () => {
  return `
      <div class="cell" contenteditable spellcheck="false"></div>
  `;
};
const createCol = (el) => {
  return `
      <div class="column">${el}</div>
  `;
};
const createRow = (idx, content) => {
  return `
      <div class="row">
        <div class="row-info">${idx ? idx : ''}</div>
        <div class="row-data">${content}</div>
      </div>
  `;
};
const toChar = (_, idx) => {
  return String.fromCharCode(CODES.A + idx);
};

export const createTable = (rowsCnt=15) => {
  const colsCnt = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCnt).fill('')
      .map(toChar)
      .map(createCol).join('');
  const rows = [];
  rows.push(createRow(null, cols));
  for (let i = 0; i<= rowsCnt; i++) {
    const cells = new Array(colsCnt)
        .fill('')
        .map(createCell)
        .join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
};
