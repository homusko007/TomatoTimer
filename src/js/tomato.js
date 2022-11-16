import { ImportantTask, DefaultTask, UnImportantTask } from "./task";
import { RenderTomato } from './renderTomato';
import { ControllerTomato } from './controller';

export class Tomato {
    constructor(time, renderApp = null) {
        if (Tomato.instance) {
            return Tomato.instance;
        }
        this.time = time;
        this.tasks = [];
        this.aktiveTask = [];
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

    change(id) {
        this.tasks.forEach(task => {
            if (id == task.id) {
                task.changeCounter();
                this.setRenderTomato()
                this.setControllerTomato();
            }
        })
    };

    startTimer() {
        const timerWrap = document.querySelector('.window__timer-text');
        let timeStart = parseInt(this.time.timeWorking) * 60;
        const timerId = setInterval(() => {
            let seconds = timeStart % 60 // Получаем секунды
            let minutes = timeStart / 60 % 60// Получаем минуты
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            let strTimer = `${Math.trunc(minutes)}:${seconds}`;
            timerWrap.innerHTML = strTimer;
            timeStart--;
            if (timeStart === 0) {
                console.log('Времы выполнения задачи истекло');
                this.change(this.aktiveTask.id);
                clearInterval(timerId);
                this.setRenderTomato()
                let timePause;
                if (this.aktiveTask.counter % 3 == 0) {
                    timePause = parseInt(this.time.timeBigPause) * 60;
                } else {
                    timePause = parseInt(this.time.timePause) * 60;
                }
                const timerPause = setInterval(() => {
                    console.log(timePause);
                    timerWrap.innerHTML = `${Math.trunc(timePause / 60 % 60)}:${timePause % 60}`;
                    timePause--;
                    if (timePause <= 0) {
                        clearInterval(timerPause);
                        console.log('пауза закончилась, можно продолжить');
                    }
                }, 100);
            }
        }, 100);
    }
}

