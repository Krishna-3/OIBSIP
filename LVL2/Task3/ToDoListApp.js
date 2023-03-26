const input = document.getElementById('input');
const desc = document.querySelector('#textarea');
const form = document.querySelector('#form');
const result = document.getElementById('result');
const r = document.getElementById('r');
let tasks = [];
let id = 0;


form.addEventListener('submit', (e) => e.preventDefault());
input.addEventListener('focus', (e) => result.style.backgroundColor = '#FFFFF0');
input.addEventListener('focusout', (e) => {
    result.style.backgroundColor = '#FCF55F';
    r.innerText = '';
});
input.addEventListener('input', (e) => r.innerText = 'title:' + e.target.value);
desc.addEventListener('focus', (e) => result.style.backgroundColor = '#FFFFF0');
desc.addEventListener('focusout', (e) => {
    result.style.backgroundColor = '#FCF55F';
    r.innerText = '';
});
desc.addEventListener('input', (e) => r.innerText = 'description:' + e.target.value);


const extractData = () => {
    if (input.value.trim()) {
        const d = new Date();
        const date = `${d.getDate()}\t${d.getMonth()}\t${d.getFullYear()}\t${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        let data = { id, date };
        data.title = input.value;
        data.description = desc.value;
        input.value = '';
        desc.value = '';
        tasks.push(data);
        createList(data);
        id++;
    }
    else {
        desc.value = '';
        alert('Enter title!');
    }
}

const del = (e) => {
    const task = tasks[e.id];
    const li = task.li;
    const parLi = document.getElementById('1');
    let sLi;
    let parSLi;
    sLi = task.penLi;
    if (!task.check)
        parSLi = document.getElementById('2');
    else
        parSLi = document.getElementById('3');
    li.style.transition = 'opacity 0.5s';
    li.style.opacity = '0';
    sLi.style.transition = 'opacity 0.5s';
    sLi.style.opacity = '0';
    setTimeout(() => {
        parLi.removeChild(li);
        parSLi.removeChild(sLi);
    }, 500);
    tasks.splice(id, 1);
}

const checked = (e) => {
    const task = tasks[e.id];
    const sLi = task.penLi;
    tasks[e.id].check = e.checked;
    if (e.checked) {
        const d = new Date();
        const date = `${d.getDate()}\t${d.getMonth()}\t${d.getFullYear()}\t${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        tasks[e.id].comDate = date;
        const parSLi = document.getElementById('2');
        sLi.style.transition = 'opacity 0.5s';
        sLi.style.opacity = '0';
        setTimeout(() => {
            parSLi.removeChild(sLi);
            document.getElementById('3').appendChild(sLi);
            sLi.style.transition = 'opacity 0.5s';
            sLi.style.opacity = '1';
        }, 500);
        const li = task.li;
        li.style.transition = 'opacity 0.5';
        li.style.opacity = '0.5';
        li.style.textDecoration = 'line-through';
    }
    else {
        const parSLi = document.getElementById('3');
        sLi.style.transition = 'opacity 0.5s';
        sLi.style.opacity = '0';
        setTimeout(() => {
            parSLi.removeChild(sLi);
            document.getElementById('2').appendChild(sLi);
            sLi.style.transition = 'opacity 0.5s';
            sLi.style.opacity = '1';
        }, 500);
        const li = task.li;
        li.style.transition = 'opacity 0.5';
        li.style.opacity = '1';
        li.style.textDecoration = 'none';
    }
}

const createList = (data) => {
    const li = document.createElement('LI');
    const check = document.createElement('INPUT');
    const title = document.createTextNode(data.title);
    const button = document.createElement('INPUT');

    li.setAttribute('class', 'todo-list');
    li.setAttribute('id', data.id);
    check.setAttribute("type", "checkbox");
    check.setAttribute('class', 'check');
    check.setAttribute('id', data.id);
    check.addEventListener('click', () => checked(check));
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'del');
    button.setAttribute('class', 'del');
    button.setAttribute('id', data.id);
    button.style.float = 'right';
    button.addEventListener('click', () => del(button));
    li.appendChild(check);
    li.appendChild(title);
    li.appendChild(button);
    li.addEventListener('mouseover', (e) => {
        const task = tasks[e.target.id];
        let comDate = '';
        result.style.backgroundColor = '#FFFFF0';
        if (task.check) {
            comDate = task.comDate;
            result.innerHTML = `title:${task.title} description:${task.description} added on:${task.date} status: 'completed' completed on:${comDate} `;
        }
        else {
            r.innerHTML = `title:${task.title} description:${task.description} added on:${task.date} status: not completed`;
        }
    })
    li.addEventListener('mouseout', (e) => {
        result.style.backgroundColor = '#FCF55F';
        r.innerHTML = '';
    })
    const penLi = li.cloneNode();
    penLi.appendChild(title.cloneNode());
    penLi.addEventListener('mouseover', (e) => {
        const task = tasks[e.target.id];
        let comDate = '';
        result.style.backgroundColor = '#FFFFF0';
        if (task.check) {
            comDate = task.comDate;
            r.innerHTML = `title:${task.title} description:${task.description} added on:${task.date} status: 'completed' completed on:${comDate} `;
        }
        else {
            r.innerHTML = `title:${task.title} description:${task.description} added on:${task.date} status: not completed`;
        }
    })
    penLi.addEventListener('mouseout', (e) => {
        result.style.backgroundColor = '#FCF55F';
        r.innerHTML = '';
    })
    document.getElementById("1").appendChild(li);
    document.getElementById('2').appendChild(penLi);
    tasks[id].check = check.checked;
    tasks[id].li = li;
    tasks[id].penLi = penLi;
}