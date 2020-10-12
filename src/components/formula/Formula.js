import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {name: 'Formula', listeners: ['input', 'click']});
  }

  onInput(event) {
    console.log('onInput Formula component', event);
  }
  onClick(event) {
    console.log('onClick Formula component', event);
  }
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false" ></div>
    `;
  }
}
