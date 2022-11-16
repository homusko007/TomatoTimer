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
        this.startTask()
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
                console.log(activTask);
                console.log(taskID);
                this.tomato.aktivationTask(`${taskID}`);
                console.log(this.tomato);
            }
            if (target.closest('.pomodoro-tasks__task-button')) {
                const popup = target.closest('.burger-popup');
                console.log(popup);
                popup.classList.add('burger-popup_active');
            }
        });
    }

    startTask() {
        const btnStartTask = document.querySelector('.button-primary');
        btnStartTask.addEventListener('click', () => {
            if (this.tomato.aktiveTask.length !== 0) {
                this.tomato.startTimer();
            } else {
                alert('Выберите задачу');
            }
        });
    }
}