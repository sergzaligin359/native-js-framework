
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.tmp';
import {tableResizeHandler} from './table.resize';
import {isCell, shouldResize, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/utils/dom';
import {range} from '../../core/utils/common';
import {tableReize} from '../../redux/actions';
export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    this.$on('formula:input', (text) => this.selection.current.text(text));
    this.$on('formula:done', () => this.selection.current.focus());
  }

  async resizeTable($root, event) {
    try {
      const data = await tableResizeHandler($root, event);
      // console.log('Resize data', data);
      this.$dispatch(tableReize(data));
    } catch (error) {
      throw new Error(error);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(this.$root, event);
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
        // this.$dispatch({type: 'TEST'});
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
      this.$emit('table:select', next);
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
  toHTML() {
    return createTable(20, this.store.getState());
  }
}

