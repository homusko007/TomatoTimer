import { ImportantTask, DefaultTask, UnImportantTask } from "./task";
import { RenderTomato } from './renderTomato';
import { ControllerTomato } from './controller';

export class Tomato {
    constructor(time, renderApp = null) {
        if (Tomato.instance) {
            return Tomato.instance;
        }
        this.time = time;
        this.work = time.timeWorking;
        this.break = time.timePause;
        this.rest = time.timeBigPause;
        this.timeLeft = time.timeWorking * 60;
        this.status = 'work';
        this.tasks = [];
        this.aktiveTask = [];
        this.aktiveTimer = false;
        this.renderApp = renderApp;
        this.renderTomato = null;
        this.controllerTomato = null;
        Tomato.instance = this;
    }

    setRenderTomato() {
        if (this.renderApp) {
            this.renderTomato = new RenderTomato(this.renderApp, this);
        }
    }

    setControllerTomato() {
        if (this.renderApp) {
            this.renderTomato = new ControllerTomato(this.renderApp, this);
        }
    }

    addTask(taskName, counter, importance) {
        let task;
        if (importance === 'important') {
            task = new ImportantTask(taskName, counter, importance);

        } else if (importance === 'default') {
            task = new DefaultTask(taskName, counter, importance);
        } if (importance === 'so-so') {
            task = new UnImportantTask(taskName, counter, importance);
        }
        this.tasks.push(task);
        this.setRenderTomato();
        this.setControllerTomato();
    }

    init() {
        this.setRenderTomato();
        this.setControllerTomato();
    }

    aktivationTask(id) {
        this.tasks.forEach(task => {
            if (id == task.id) {
                this.aktiveTask = task;
                this.setRenderTomato();
                this.setControllerTomato();
            }
        })
    }

    disactiveTask() {
        this.aktiveTask = [];
        this.setRenderTomato();
        this.setControllerTomato();
        }

    change(id) {
        this.tasks.forEach(task => {
            if (id == task.id) {
                task.changeCounter();
                this.setRenderTomato()
                this.setControllerTomato();
            }
        })
    };

   showTime(time) {
    const timerWrap = document.querySelector('.window__timer-text');
    let seconds = time % 60;
    let minutes = Math.trunc(time / 60);
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
        timerWrap.textContent = `${minutes}:${seconds}`;
    }


   startTimer() {
        if (this.timeLeft > 0 && this.aktiveTimer) {
        const timerId = setInterval(() => {
            this.showTime(this.timeLeft);
            this.timeLeft--;
            if (!this.aktiveTimer) {
                console.log('Пауза');
                clearInterval(timerId);
            }
            if (this.timeLeft === 0) {
               clearInterval(timerId);

               if (this.status === 'work') {
                this.change(this.aktiveTask.id);

                if (this.aktiveTask.counter % 3 == 0) {
                    this.status = 'break';
                } else {
                    this.status = 'rest';
                }
               } else {
                this.status = 'work';
               }

               this.timeLeft = this[this.status] * 60;
                this.startTimer();
            }
        }, 100);
     }
    }
}
