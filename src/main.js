import './index.html';
import './scss/index.scss';
import { Tomato } from './js/tomato.js';

const tomato = new Tomato({ timeWorking: 25, timePause: 5, timeBigPause: 15 }, '.main__container');

const tsak01 =  tomato.addTask( 'Купить машину', 2, 'important');
const tsak02 = tomato.addTask( 'Постричь газон', 1, 'default');

tomato.init();
