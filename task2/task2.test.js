import {formatMap, formatStr, formatMonth} from './task2';

let employees = [
    { name: 'Ваня Иванов', birthday: '2000-08-20' },
    { name: 'Коля Новогодний', birthday: '2000-07-02' },
    { name: 'Петя Петров', birthday: '2002-09-29' },
    { name: 'Стас Рождественский', birthday: '2001-09-01' },
    { name: 'Марина Майская', birthday: '2003-08-17' },
    { name: 'Стас Неяснов', birthday: '2003-07-16' }
]
describe('Sorted Employee\'s birthday list', () => {
    it('should return map with key: day, value: {name, fullDate}', () => {
        let expectedMap = new Map().set(7, [
            { name: 'Коля Новогодний', birthday: '2000-07-02' },
            { name: 'Стас Неяснов', birthday: '2003-07-16' }
        ]);
        let receivedMap = formatMap(employees).get(7);
        expect(receivedMap).toEqual(expectedMap.get(7))
    });

    it('should return correctly formated string', () => {
        let testMap = formatMap(employees);
        testMap.get(7);
        expect(formatStr(testMap)).toEqual([`(2) - Коля Новогодний (21 год)`, `(16) - Стас Неяснов (18 лет)`]);
    });

/*     it('should count an age of employee', () => {
        expect()
    }); */
});