const moment = require('moment');

let employees = [
    { name: 'Ваня Иванов', birthday: '2000-08-20' },
    { name: 'Коля Новогодний', birthday: '2000-07-02' },
    { name: 'Петя Петров', birthday: '2002-09-12' },
    { name: 'Стас Рождественский', birthday: '2001-09-12' },
    { name: 'Марина Майская', birthday: '2003-08-17' },
    { name: 'Стас Неяснов', birthday: '2003-07-16' }
]

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


//console.log(formatMap(employees))

function formatStr(map) {
    let currentDate = new Date();
    let temp = map.get(currentDate.getMonth() + 1);
    for(let i = 0; i < temp.length; i += 1) {
        let birthday = temp[i].birthday;
        let age = `${birthday.getFullYear()}0${birthday.getMonth()}${birthday.getDate()}`;
        let formatedAge = moment(age).fromNow().match(/[0-9]+/g)
        return `(${temp[i].birthday.getDate()}) - ${temp[i].name} (${formatedAge} года)`
    }
         
}

export default formatStr;