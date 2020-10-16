
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.tmp';
import {tableResizeHandler} from './table.resize';
import {shouldResize} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      listeners: ['mousedown'],
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event);
    }
  }

  toHTML() {
    return createTable();
  }
}
