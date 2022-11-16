import './index.html';
import './scss/index.scss';
import { Tomato } from './js/tomato.js';

const tomato = new Tomato({ timeWorking: 3, timePause: 1, timeBigPause: 2 }, '.main__container');

const tsak01 =  tomato.addTask( 'Купить машину', 2, 'important');
const tsak02 = tomato.addTask( 'Постричь газон', 1, 'default');

tomato.init();
