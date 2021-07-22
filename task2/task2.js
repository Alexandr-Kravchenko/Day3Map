const moment = require('moment');

const months =[
   'Январь',
   'Февраль',
   'Март',
   'Апрель',
   'Май',
   'Июнь',
   'Июль',
   'Август',
   'Сентябрь',
   'Ноябрь',
   'Декабрь',
];

function formatMap(list, ) {
    let employeeMap = new Map();
    list.forEach((user) => {
        let birthDate = new Date(user.birthday);
        let birthMonth = birthDate.getMonth() + 1;
        if(employeeMap.has(birthMonth)) {
            let employees = employeeMap.get(birthMonth);
            employees.push({name: user.name, birthday: birthDate})
            employeeMap.set(birthMonth, employees)
        } else {
            employeeMap.set(birthMonth, [{name: user.name, birthday: birthDate}])
        }
    })
    return employeeMap;
}

function formatStr(map) {
    let currentDate = new Date();
    let temp = map.get(currentDate.getMonth() + 1);
    let result = [];
    for(let i = 0; i < temp.length; i += 1) {
        let birthday = temp[i].birthday;
        let age = `${birthday.getFullYear()}` + `0${birthday.getMonth() + 1}` + `${birthday.getDate()}`;
        console.log(age)
        let formatedAge = moment(age).fromNow().match(/[0-9]+/g)
        result.push(`(${temp[i].birthday.getDate()}) - ${temp[i].name} (${formatedAge} лет)`); // плюаризация ждет)
    }
    return result
}

export {formatMap, formatStr};