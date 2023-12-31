// Importing CSS styles
import './style.css';
import {
  updateStatus,
  clearCompleted,
}
from './modules/liststatus.js';
import {
  render,
  addTask,
  editTask,
  removeTask,
} from './modules/handletodo.js';

render();
// add task when text is submitted
const taskinput = document.querySelector('.task-desc');
taskinput.addEventListener('change', (e) => {
  e.preventDefault();
  if (taskinput !== '') {
    const taskdesc = taskinput.value;
    addTask(taskdesc);
    taskinput.value = taskinput.ariaPlaceholder;
  }
});

// make task list editable with click
const tasks = document.querySelectorAll('.list-element');
tasks.forEach((task) => {
  task.addEventListener('click', () => {
    task.contentEditable = true;
    task.addEventListener('focus', () => {
      const iconMenu = task.lastChild;
      const icon = iconMenu.lastChild;
      icon.classList.add('fa-trash');
      const delteteTask = document.querySelector('.fa-trash');
      if (delteteTask !== null) {
        delteteTask.addEventListener('click', () => {
          // get index of the task to delete from parent node
          const delteIndex = task.firstChild.firstChild.getAttribute('id');
          removeTask(delteIndex);
          window.location.reload();
        });
      }
    });
  });
});

const taskblur = document.querySelectorAll('.list-element');
taskblur.forEach((task) => {
  task.addEventListener('blur', () => {
    const child1 = task.firstChild;
    const child2 = child1.lastChild;
    const editedtext = child2.innerText;
    const editedIndex = child2.getAttribute('id');
    editTask(editedtext, editedIndex);
    window.location.reload();
  });
});

const checkbox = document.querySelectorAll('input[type=checkbox]');
checkbox.forEach((box) => {
  box.addEventListener('change', () => {
    const selectedId = box.getAttribute('id');
    const boxStatus = box.checked;
    updateStatus(selectedId, boxStatus);
  });
});

const clearButton = document.querySelector('.clear-btn');
clearButton.addEventListener('click', (e) => {
  e.preventDefault();
  clearCompleted();
});
