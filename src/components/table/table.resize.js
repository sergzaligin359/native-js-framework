
import {$} from '@core/utils/dom';
export const tableResizeHandler = ($root, event) => {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resazible"]');
    const coords = $parent.getCoords();
    const type = $resizer.data.resize;
    let value = 0;
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
    const sideProp = type === 'col' ? 'bottom' : 'right';
    $resizer.css({
      opacity: 1,
      zIndex: 1000,
      [sideProp]: -5000 + 'px',
    });
    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({
          right: -delta + 'px',
        });
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({
          bottom: -delta + 'px',
        });
      }
    };
    document.onmouseup = (e) => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (type === 'col') {
        cells.forEach((element) => {
          element.style.width = value + 'px';
        });
      } else {
        $parent.css({
          height: value + 'px',
        });
      }

      resolve({
        value,
        id: type === 'col' ? $parent.data.col : null,
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
};
