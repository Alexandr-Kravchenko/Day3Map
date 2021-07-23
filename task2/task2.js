const fs = require('fs'); 
const csv = require('csv-parser');
const moment = require('moment');
moment.locale('ru');

let path = process.argv[2];
let plan = process.argv[3] === undefined ? 0 : Number(process.argv[3]);

let results = [];
fs.createReadStream(path)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(getList(results, plan));
  });

const allMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Ноябрь', 'Декабрь'];

function formatMap(list) {
    let employeeMap = new Map();
    list.forEach((user) => {
        let birthMonth = new Date(user.birthday).getMonth() + 1;
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
        let regExpDay = /(?<=\()[0-9]+(?=\))/g;
        return Number(current.match(regExpDay)) > Number(next.match(regExpDay)) ? 1 : -1;
    });
}

function sortByMonth(employees) {
    return employees.sort((current, next) => {
        let regExpMonth = /^[А-Яа-я]+(?=\s)/g;
        let idCurrentMonth = allMonths.indexOf(current.match(regExpMonth)[0]);
        let idNextMonth = allMonths.indexOf(next.match(regExpMonth)[0]);
        return idCurrentMonth > idNextMonth ? 1 : -1;
    });
}

function formatMonths(map, plan = 0) {
    let result = [];
    for(const [key, value] of map) {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        if(plan === 0) {
            if(currentMonth + 1 === key) {
                result.push(formatOneMonth(map, key, currentDate));
            }
        } else if (plan === 1) {
            if(currentMonth + 1 === key || currentMonth + 2 === key) {
                result.push(formatOneMonth(map, key, currentDate));
            }
        } else if (plan === 2) {
            if(currentMonth + 1 === key || currentMonth + 2 === key || currentMonth + 3 === key) {
                result.push(formatOneMonth(map, key, currentDate));
            }
        }
    }
    sortByMonth(result);
    return result.join('\n');
}

function formatOneMonth(map, id, date) {
    return `${allMonths[id - 1]} ${date.getFullYear()}\n${formatStr(map, id)}`;  
}

function getList(map, id) {
    return formatMonths(formatMap(map), id);
}

export { formatMap, formatStr, formatMonths, formatOneMonth, sortByMonth, sortByDay, getList };
