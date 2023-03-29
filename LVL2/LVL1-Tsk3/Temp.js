const input = document.getElementById('deg');
const type = document.getElementById('type');
const res1 = document.getElementById('r1');
const res2 = document.getElementById('r2');
const time = document.getElementById('time');
const form = document.getElementById('form');
const button = document.getElementById('clr');
res1.innerHTML = '&nbsp;';
res2.innerHTML = '&nbsp;';

form.addEventListener('submit', (e) => e.preventDefault());
button.addEventListener('click', () => clear());

d = new Date();
time.innerText = `${d.getHours()}:${d.getMinutes()}`;

const interval = setInterval(() => {
    d = new Date();
    time.innerText = `${d.getHours()}:${d.getMinutes()}`;
}, 60000);

const temp = (deg, val) => {
    let r1, r2;
    switch (deg) {
        case 'c':
            r1 = (val * 1.8) + 32;
            r2 = val + 273;
            res1.innerHTML = `${parseInt(r1)}&#8457;`;
            res2.innerHTML = `${parseInt(r2)}&#8490;`;
            break;
        case 'f':
            r1 = (val - 32) / 1.8;
            r2 = r1 + 273;
            res1.innerHTML = `${parseInt(r1)}&#8451;`;
            res2.innerHTML = `${parseInt(r2)}&#8490;`;
            break;
        case 'k':
            r1 = val - 273;
            r2 = (r1 * 1.8) + 32;
            res1.innerHTML = `${parseInt(r1)}&#8451;`;
            res2.innerHTML = `${parseInt(r2)}&#8457;`;
            break;
    }
}

const convert = () => {
    let t = parseFloat(input.value);
    if (Number.isInteger(t) || (typeof t === 'number' && !Number.isNaN(t))) {
        if (type.value === 'select') {
            alert('select type of temperature!');
            return;
        }
        switch (type.value) {
            case 'fahrenheit':
                temp('f', t);
                break;
            case 'celcius':
                temp('c', t);
                break;
            case 'kelvin':
                temp('k', t);
                break;
            default:
                alert('error!');
                break;
        }
    }
    else {
        alert('Enter valid number!');
        input.value = '';
        res1.innerHTML = '&nbsp;';
        res2.innerHTML = '&nbsp;';
        type.value = 'select';
    }
}

function clear() {
    console.log('first')
    input.value = '';
    res1.innerHTML = '&nbsp;';
    res2.innerHTML = '&nbsp;';
    type.value = 'select';
}