import './index.html';
import './scss/index.scss';


let count = 0;
const imp = ['default', 'important', 'so-so']
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
  count += 1;
  if (count >= imp.length) {
    count = 0
  }

  for (let i = 0; i < imp.length; i++) {
    if (count === i) {
      target.classList.add(imp[i])
    } else {
      target.classList.remove(imp[i])
    }
  }
})

class Task {
    constructor(name, counter) {
        this.name = name;
        this.counter = 0;
        this.id = String(Math.round(Math.random() * (100 + 1)));
    }

    changeCounter() {
      return ++this.counter;
    }
    setName(name) {
      this.name = name; 
      return this;
    }
};

const task1 = new Task('Сходить в магазин');
task1.changeCounter();
console.log(task1);
task1.setName('Читать');
console.log(task1);
