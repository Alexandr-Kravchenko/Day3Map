/* Декабрь 2020
(20) - Ваня Иванов (23 года)
(23) - Петя Петров (25 лет)
Январь 2021
(01) - Коля Новогодний (21 год)
(07) - Стас Рождественский (30 лет)
Февраль 2021
(03) - Влад Лютый (24 год)
(14) - Стас Валентинов (30 лет)
*/

let employees = [
    ['Ваня Иванов', '2000-08-20'],
    ['Коля Новогодний', '2000-01-02'],
    ['Петя Петров', '2002-04-12'],
    ['Стас Рождественский', '2001-01-12'],
    ['Марина Майская', '2003-08-17'],
    ['Стас Неяснов', '2003-04-16']
]

function formatMap(list) {
    let testMap = new Map();
    list.forEach((user) => {
        let bday = user[1];
        testMap.set(user[0], new Date(bday))
    })

    return testMap
} 

function formatList(map) {
    let temp = [];
    let test = map[Symbol.iterator]();
    for (const item of test) {
        
    }
}

formatList(formatMap(employees))