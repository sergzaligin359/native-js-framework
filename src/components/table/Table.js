
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.tmp';
import {tableResizeHandler} from './table.resize';
import {isCell, shouldResize, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/utils/dom';
import {range} from '../../core/utils/common';
export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      listeners: ['mousedown', 'keydown'],
    });
  }
  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);
        const cols = range(current.col, target.col);
        const rows = range(current.row, target.row);
        const ids = cols.reduce((accum, col)=> {
          rows.forEach((row) => accum.push(`${row}:${col}`));
          return accum;
        }, []);
        const cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup(cells);
      } else {
        this.selection.select($target);
      }
    }
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const next = this.$root.find(nextSelector(key, id));
      this.selection.select(next);
    }
  }
  toHTML() {
    return createTable();
  }
}

