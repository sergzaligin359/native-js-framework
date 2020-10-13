import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.tmp';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      listeners: ['mousedown'],
    });
  }
  // onClick() {
  //   console.log('click');
  // }
  onMousedown(e) {
    if (e.target.dataset.resize) {
      console.log('start resizing');
    }
  }
  // onMouseup() {
  //   console.log('mouseup');
  // }
  // onMousemove() {
  //   console.log('mousemove');
  // }
  toHTML() {
    return createTable();
  }
}
