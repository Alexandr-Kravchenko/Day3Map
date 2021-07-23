const moment = require('moment');
moment.locale('ru');

const allMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь'];

let employees = [
    { name: 'Ваня Иванов', birthday: '2000-08-20' },
    { name: 'Коля Новогодний', birthday: '2000-07-02' },
    { name: 'Петя Петров', birthday: '2002-09-29' },
    { name: 'Стас Рождественский', birthday: '2001-09-01' },
    { name: 'Марина Майская', birthday: '2003-08-17' },
    { name: 'Стас Неяснов', birthday: '2003-07-16' }
]

function formatMap(list) {
    let employeeMap = new Map();
    list.forEach((user) => {
        let birthDate = new Date(user.birthday);
        let birthMonth = birthDate.getMonth() + 1;
        if(employeeMap.has(birthMonth)) {
            let employees = employeeMap.get(birthMonth);
            employees.push(user);
            employeeMap.set(birthMonth, employees)
        } else {
            employeeMap.set(birthMonth, [user])
        }
    })
    return employeeMap;
}

function formatStr(map, month) {
    let employees = map.get(month);
    let result = [];
    for(let i = 0; i < employees.length; i += 1) {
        let birthday = employees[i].birthday;
        let age = birthday.replace(/[-]+/g, '');
        let formatedAge = moment(age).fromNow().match(/[0-9]+ (лет|года|год)/g)
        result.push(`(${new Date(birthday).getDate()}) - ${employees[i].name} (${formatedAge})`); 
    }
    sortByDate(result)
    return result.join('\n');
}

function sortByDate(employees) {
    employees.sort((current, next) => {
        return Number(current.match(/(?<=\()[0-9]+(?=\))/g)) > Number(next.match(/(?<=\()[0-9]+(?=\))/g)) ? 1 : -1
    });
}

function sortByMonth(employees) {
    employees.sort((current, next) => {
        let idCurrentMonth = allMonths.indexOf(current.match(/^[А-Яа-я]+(?=\s)/g)[0]);
        let idNextMonth = allMonths.indexOf(next.match(/^[А-Яа-я]+(?=\s)/g)[0]);
        return idCurrentMonth > idNextMonth ? 1 : -1
    });
}

function formatMonth(map, plan = 1) {
    let result = [];
    for(const [key, value] of map) {
        let today = new Date();
        if(plan === 0) {
            if(today.getMonth() + 1 === key) {
                result.push(formatList(map, key, today));
            }
        } else if (plan === 1) {
            if(today.getMonth() + 1 === key || today.getMonth() + 2 === key) {
                result.push(formatList(map, key, today));
            }
        } else if (plan === 2) {
            if(today.getMonth() + 1 === key || today.getMonth() + 2 === key || today.getMonth() + 3 === key) {
                result.push(formatList(map, key, today));
            }
        }
    }
    sortByMonth(result)
    return result.join('\n');
}

function formatList(map, id, date) {
    let result;
    result = `${allMonths[id - 1]} ${date.getFullYear()}\n${formatStr(map, id)}`
    return result;  
}

export {formatMap, formatStr, formatMonth, formatList, sortByMonth, sortByDate};

//console.log(formatMonth(formatMap(employees)))