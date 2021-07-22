import {formatMap, formatStr} from './task2';

let employees = [
    { name: 'Ваня Иванов', birthday: '2000-08-20' },
    { name: 'Коля Новогодний', birthday: '2000-07-02' },
    { name: 'Петя Петров', birthday: '2002-09-12' },
    { name: 'Стас Рождественский', birthday: '2001-09-12' },
    { name: 'Марина Майская', birthday: '2003-08-17' },
    { name: 'Стас Неяснов', birthday: '2003-07-16' }
]
describe('Sorted Employee\'s birthday list', () => {
    it('should return map with key: day, value: {name, fullDate}', () => {
        let tempMap = formatMap(employees)
        expect(tempMap).toBe()
    });
    it('should return correctly formated string', () => {
        let testMap = new Map();
        testMap.set(7, [{name: 'Петя Петров', birthday: new Date('2002-09-12')}]);
        expect(formatStr(testMap)).toEqual([`(12) - Петя Петров (18 лет)`]);
    });
});