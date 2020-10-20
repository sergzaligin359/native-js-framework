import {Excel} from '@components/excel/Excel';
import {Header} from '@components/header/Header';
import {Toolbar} from '@components/toolbar/Toolbar';
import {Formula} from '@components/formula/Formula';
import {Table} from '@components/table/Table';

import './scss/index.scss';
import {createStore} from '@core/createStore';
import {rootReducer} from './redux/rootReducer';
import {storage} from '@core/utils/common';

const store = createStore(rootReducer, storage('exel=state') || {colState: {}});

store.subscribe((state) => {
  console.log('STORE', store.getState());
  storage('exel=state', state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

console.log('Excel parent component', excel);
excel.render();
