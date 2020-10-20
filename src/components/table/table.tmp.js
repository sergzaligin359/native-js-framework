const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;

const createCell = (state, row, col) => {
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

const createColumn = ({col, index, width}) => {
  return `
      <div class="column" data-type="resazible" data-col="${index}" style="width: ${width}">
        ${col}
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

const getWidth = (state, index) => {
  return (state[index] || DEFAULT_WIDTH) + 'px';
};

const withWidthFrom = (state) => {
  return (col, index) => {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
};

export const createTable = (rowsCnt=15, state={}) => {
  const colsCnt = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCnt)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createColumn)
      .join('');
  const rows = [];
  rows.push(createRow(null, cols));
  for (let row = 0; row <= rowsCnt; row++) {
    const cells = new Array(colsCnt)
        .fill('')
        .map((_, col) => createCell(state, row, col))
        .join('');
    rows.push(createRow(row + 1, cells));
  }
  return rows.join('');
};
