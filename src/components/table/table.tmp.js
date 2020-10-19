const CODES = {
  A: 65,
  Z: 90,
};
const createCell = (row, col) => {
  return `
      <div 
        class="cell" 
        contenteditable 
        spellcheck="false" 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
      >
      </div>
  `;
};
const createColumn = (el, index) => {
  return `
      <div class="column" data-type="resazible" data-col="${index}">
        ${el}
        <div class="col-resize" data-resize="col"></div>
      </div>
  `;
};
const createRow = (idx, content) => {
  const resizer = idx ? '<div class="row-resize" data-resize="row"></div>': '';
  return `
      <div class="row" data-type="resazible">
        <div class="row-info">
          ${idx ? idx : ''}
          ${ resizer }
        </div>
        <div class="row-data">${content}</div>
      </div>
  `;
};
const toChar = (_, idx) => {
  return String.fromCharCode(CODES.A + idx);
};

export const createTable = (rowsCnt=15) => {
  const colsCnt = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCnt)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('');
  const rows = [];
  rows.push(createRow(null, cols));
  for (let row = 0; row <= rowsCnt; row++) {
    const cells = new Array(colsCnt)
        .fill('')
        .map((_, col) => createCell(row, col))
        .join('');
    rows.push(createRow(row + 1, cells));
  }
  return rows.join('');
};
