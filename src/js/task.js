export class Task {
  #id
  constructor(taskName, counter = null) {
    this.taskName = taskName;
    this.counter = counter;
    this.#id = String(Math.round(Math.random() * (100 + 1)));
  }

  changeCounter() {
    return ++this.counter;
  }

  taskNameChange(newTask) {
    this.taskName = newTask;
    return this;
  }

  get id() {
    return this.#id;
  }

  getTaskName() {
    return this.taskName;
  }
};


export class ImportantTask extends Task {
  importance = 'important';
  constructor(taskName, counter, id) {
    super(taskName, counter, id);
  }
}

export class DefaultTask extends Task {
  importance = 'default';
  constructor(taskName, counter, id) {
    super(taskName, counter, id);
  }
}

export class UnImportantTask extends Task {
  importance = 'so-so';
  constructor(taskName, counter, id) {
    super(taskName, counter, id);
  }
}