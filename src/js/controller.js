export class ControllerTomato {
    constructor(app, tomato) {
        this.app = app;
        this.tomato = tomato;
        this.init();
    }

    init() {
        this.addNewTask();
        this.addActiveTask();
        this.addImportnace();
        this.startTask();
        this.stopTask();
    }

    addNewTask() {
        const form = document.querySelector('.task-form');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const input = document.getElementById('task-name');
            if (input.value !== '') {
                const taskName = input.value;
                let imp = document.querySelector('.button-importance').getAttribute('aria-label');
                if (imp === "Указать важность") {
                    imp = 'default';
                }
                let count = 1;
                this.tomato.addTask(taskName, count, imp);
                form.reset();
            } else alert('Укажите задачу');
        });
    }

    addImportnace() {
        let count = 0;
        const imp = ['default', 'important', 'so-so']
        document.querySelector('.button-importance').addEventListener('click', ({ target }) => {
            count += 1;
            if (count >= imp.length) {
                count = 0
            }

            for (let i = 0; i < imp.length; i++) {
                if (count === i) {
                    target.classList.add(imp[i]);
                    target.setAttribute('aria-label', imp[i])
                } else {
                    target.classList.remove(imp[i]);
                }
            }
        });
    }

    addActiveTask() {
        const list = document.querySelector('.pomodoro-tasks__quest-tasks');
        list.addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.pomodoro-tasks__task-text')) {
                const activTask = target.closest('.pomodoro-tasks__task-text');
                activTask.classList.add('pomodoro-tasks__task-text-active');
                const taskID = target.closest('.pomodoro-tasks__list-task').getAttribute('id');
                this.tomato.aktivationTask(`${taskID}`);
            }
            if (target.closest('.pomodoro-tasks__task-button')) {
                const popup = document.querySelector('.burger-popup');
                popup.classList.add('burger-popup_active'),
                setTimeout(() => 
                popup.classList.remove('burger-popup_active'),
                2000);
            }
        });
    }

    startTask() {
        const btnStartTask = document.querySelector('.button-primary');
        btnStartTask.addEventListener('click', () => {
            if (this.tomato.aktiveTask.length !== 0) {
                if (this.tomato.aktiveTimer) {
                    this.tomato.aktiveTimer = false;
                    btnStartTask.textContent = 'Старт';
                } else { 
                    this.tomato.aktiveTimer = true;
                    this.tomato.startTimer();
                    btnStartTask.textContent = 'Пауза';
                }
            } else {
                alert('Выберите задачу');
            }
        });
    }

    stopTask() {
        const btnStopTask = document.querySelector('.button-secondary');
        const btnStartTask = document.querySelector('.button-primary');
        btnStopTask.addEventListener('click', () => {
        if (this.tomato.aktiveTask.length !== 0) {
            this.tomato.disactiveTask();
            this.tomato.aktiveTimer = false;
            console.log('stop');
            btnStartTask.textContent = 'Старт';
            this.tomato.timeLeft = this.tomato.time.timeWorking * 60;
            this.tomato.showTime(this.tomato.timeLeft);
        }
        })
}

}