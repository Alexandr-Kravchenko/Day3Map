const moment = require('moment');
moment.locale('ru');

const allMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь'];

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
        let formatedAge = moment(age).fromNow().match(/[0-9]+ (лет|года|год)/g);
        let formatedDay = new Date(birthday).getDate().toLocaleString(undefined, {minimumIntegerDigits: 2});
        result.push(`(${formatedDay}) - ${employees[i].name} (${formatedAge})`); 
    }
    sortByDay(result);
    return result.join('\n');
}

function sortByDay(employees) {
    return employees.sort((current, next) => {
        return Number(current.match(/(?<=\()[0-9]+(?=\))/g)) > Number(next.match(/(?<=\()[0-9]+(?=\))/g)) ? 1 : -1
    });
}

function sortByMonth(employees) {
    return employees.sort((current, next) => {
        let idCurrentMonth = allMonths.indexOf(current.match(/^[А-Яа-я]+(?=\s)/g)[0]);
        let idNextMonth = allMonths.indexOf(next.match(/^[А-Яа-я]+(?=\s)/g)[0]);
        return idCurrentMonth > idNextMonth ? 1 : -1;
    });
}

function formatMonth(map, plan = 0) {
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
    sortByMonth(result);
    return result.join('\n');
}

function formatList(map, id, date) {
    return `${allMonths[id - 1]} ${date.getFullYear()}\n${formatStr(map, id)}`;  
}

function getList(map, id) {
    return formatMonth(formatMap(map), id);
}

export { formatMap, formatStr, formatMonth, formatList, sortByMonth, sortByDay, getList };
