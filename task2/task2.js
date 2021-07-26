const fs = require('fs'); 
const csv = require('csv-parser');
const moment = require('moment');
moment.locale('ru');

/* let path = process.argv[2];
let plan = process.argv[3] === undefined ? 0 : Number(process.argv[3]);

let results = [];
fs.createReadStream(path)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(getList(results, plan));
  }); */

const allMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

function formatMap(list) {
    let employeeMap = new Map();
    list.forEach((user) => {
        let birthDate = new Date(user.birthday);
        let birthMonth = birthDate.getMonth();
        if(employeeMap.has(birthMonth)) {
            let tempEmployees = employeeMap.get(birthMonth);
            tempEmployees.push({...user, birthday: birthDate});
            employeeMap.set(birthMonth, tempEmployees);
        } else {
            employeeMap.set(birthMonth, [{...user, birthday: birthDate}]);
        }
    })
    return employeeMap;
}

function formatList(map, plan) {
    let result = [];
    for (const [key, value] of map) {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;
/*         if (plan === 0) {
            if(currentMonth === key) {
                result.push(sortByDay(value));
            }
        } else if (plan === 1) {
            if(currentMonth === key || currentMonth + 1 === key) {
                result.push(sortByDay(value));
            }
        } else if (plan === 2) {
            if(currentMonth === key || currentMonth + 1 === key || currentMonth + 2 === key) {
                result.push(sortByDay(value));
            }
        }
        result.push(sortByDay(value)); */

        for(let i = 0; i <= plan; i += 1) {
            let month = (currentMonth + i) % 12 - 1;
            if(key === month) {
                result.push(sortByDay(value));
            }
        }
    }
    return sortByMonth(result);
}

function sortByDay(employees) {
    return employees.sort( (current, next) => {
        return current.birthday.getDate() > next.birthday.getDate() ? 1 : -1;
    });
}

function sortByMonth(employees) {
    return employees.sort( (current, next) => {
        return current[0].birthday.getMonth() > next[0].birthday.getMonth() ? 1 : -1;
    });
}

function formatStr(array, plan) {
    const result = array.map((employees) => {
        let currentDate = new Date();
        let year = currentDate.getMonth() <= employees[0].birthday.getMonth() ? currentDate.getFullYear() : currentDate.getFullYear() + 1;
        let text = `${allMonths[employees[0].birthday.getMonth()]} ${year}\n`
        return text + employees.map((emp, index) => {
            let date = currentDate.getMonth() <= employees[index].birthday.getMonth() ? currentDate : currentDate.setFullYear(currentDate.getFullYear() + 1);
            let formatedDay = emp.birthday.getDate().toLocaleString(undefined, {minimumIntegerDigits: 2});
            let formatedAge = moment(emp.birthday).from(date, true); // true - without 'ago'
            return `(${formatedDay}) - ${emp.name} (${formatedAge})`
        }).join('\n');
    });

    return result.join('\n');
}

let employees = [
    { name: 'Ваня Иванов', birthday: '2000-12-20' },
    { name: 'Коля Новогодний', birthday: '2000-02-16' },
    { name: 'Петя Петров', birthday: '2002-01-29' },
    { name: 'Стас Рождественский', birthday: '2001-09-01' },
    { name: 'Марина Майская', birthday: '2003-07-17' },
    { name: 'Стас Неяснов', birthday: '2003-08-02' }
];

function main(map, plan = 0) {
    plan = plan % 12;
    return formatStr(formatList(formatMap(map), plan), plan);
}

console.log(main(employees, 9));
