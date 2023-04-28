import { Task } from "./task";

export class RenderTomato {
    constructor(app, tomato) {
        this.app = app;
        this.tomato = tomato;
        this.init();
    }

    init() {
        this.wrapper = document.querySelector('.main__container');
        this.activeTaskWindow = document.createElement('div');
        this.activeTaskWindow.classList.add('pomodoro-form', 'window');
        this.listTask = document.createElement('div');
        this.listTask.classList.add('pomodoro-tasks');
        this.renderTomato();
    }

    renderTomato() {
        this.wrapper.textContent = '';
        this.activeTaskWindow.textContent = '';
        this.listTask.textContent = '';
        const tasksList = this.createListTasks();
        const instruction = this.createInstruction();
        const addTaskForm = this.createForm();
        const activeTask = this.createActiveTask();
        this.activeTaskWindow.append(activeTask, addTaskForm);
        this.listTask.append(instruction, tasksList);
        this.wrapper.append(this.activeTaskWindow, this.listTask);

    }

    createListTasks() {
        const list = document.createElement('ul');
        list.className = 'pomodoro-tasks__quest-tasks';

        this.tomato.tasks.forEach(task => {
            const item = document.createElement('li');
            item.classList.add('pomodoro-tasks__list-task', `${task.importance}`);
            item.setAttribute('id', `${task.id}`);
            const span = document.createElement('span');
            span.classList.add('count-number');
            span.textContent = `${task.counter}`;
            const taskName = document.createElement('button');
            taskName.classList.add('pomodoro-tasks__task-text');
            taskName.textContent = `${task.getTaskName()}`;
            if (task === this.tomato.aktiveTask) {
                taskName.classList.add('pomodoro-tasks__task-text_active');
            } else {
                taskName.classList.remove('pomodoro-tasks__task-text_active');
            }
            const btnPopup = document.createElement('button');
            btnPopup.classList.add('pomodoro-tasks__task-button');
            const popup = document.createElement('div');
            popup.classList.add('burger-popup');
            const btnEdit = document.createElement('button');
            btnEdit.classList.add('popup-button', 'burger-popup__edit-button');
            btnEdit.textContent = 'Редактировать';
            const btnDel = document.createElement('button');
            btnDel.classList.add('burger-popup__delete-button', 'popup-button');
            btnDel.textContent = 'Удалить';
            popup.append(btnEdit, btnDel);

            item.append(span, taskName, btnPopup, popup);
            list.append(item);
        })

        return list;
    }

    createInstruction() {
        const fragment = document.createDocumentFragment();
        const p = document.createElement('p');
        p.classList.add('pomodoro-tasks__header-title');
        p.textContent = 'Инструкция:';
        const ul = document.createElement('ul');
        ul.classList.add('pomodoro-tasks__quest-list');
       
        ul.innerHTML = `
        <li class="pomodoro-tasks__list-item">Напишите название задачи чтобы её добавить</li>
        <li class="pomodoro-tasks__list-item">Чтобы задачу активировать, выберите её из списка</li>
        <li class="pomodoro-tasks__list-item">Запустите таймер</li>
        <li class="pomodoro-tasks__list-item">Работайте пока таймер не прозвонит</li>
        <li class="pomodoro-tasks__list-item">Сделайте короткий перерыв (5 минут)</li>
        <li class="pomodoro-tasks__list-item">Продолжайте работать, пока задача не будет выполнена.</li>
        <li class="pomodoro-tasks__list-item">Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).</li>`

      fragment.appendChild(p);
      fragment.appendChild(ul);
      console.log(fragment);
      return fragment;
    }

    createForm() {
        const form = document.createElement('form');
        form.classList.add('task-form');

        form.innerHTML = `
            <input type="text" class="task-name input-primary" name="task" id="task-name" placeholder="название задачи">
            <button type="button" class="button button-importance default" aria-label="Указать важность"></button>
            <button type="submit" class="button button-primary task-form__add-button">Добавить</button>
        `
        return form;
    }

    createActiveTask() {
        this.activeTaskWindow.innerHTML = `
        <div class="window__panel">
            <p class="window__panel-title">${this.tomato.aktiveTask.taskName || ''} </p>
            <p class="window__panel-task-text">Томат ${this.tomato.aktiveTask.counter || ''}</p>
        </div>
        <div class="window__body">
            <p class="window__timer-text">00:00</p>
        <div class="window__buttons">
            <button class="button button-primary">Старт</button>
            <button class="button button-secondary">Стоп</button>
        </div>`
    }
}