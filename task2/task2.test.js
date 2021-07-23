import {formatMap, formatStr, formatMonths, formatOneMonth, sortByMonth, sortByDay, getList } from './task2';

let employees = [
    { name: 'Ваня Иванов', birthday: '2000-08-20' },
    { name: 'Коля Новогодний', birthday: '2000-07-02' },
    { name: 'Петя Петров', birthday: '2002-09-29' },
    { name: 'Стас Рождественский', birthday: '2001-09-01' },
    { name: 'Марина Майская', birthday: '2003-08-17' },
    { name: 'Стас Неяснов', birthday: '2003-07-16' }
]
describe('Sorted Employee\'s birthday list', () => {
    it('formatMap should return map with key: day, value: {name, fullDate}', () => {
        let expectedMap = new Map().set(7, [
            { name: 'Коля Новогодний', birthday: '2000-07-02' },
            { name: 'Стас Неяснов', birthday: '2003-07-16' }
        ]);
        let receivedMap = formatMap(employees).get(7);
        expect(receivedMap).toEqual(expectedMap.get(7))
    });

    it('formatStr should return correctly formated string of employees', () => {
        let testMap = formatMap(employees);
        testMap.get(7);
        expect(formatStr(testMap, 7)).toBe(`(02) - Коля Новогодний (21 год)\n(16) - Стас Неяснов (18 лет)`);
    });

    it('sortByDay should sort employees by day', () => {
        let testEmp = ['(02) - Коля Андефайнов (21 год)', '(19) - Стас Неяснов (18 лет)', '(13) - Иван Неиванов  (28 лет)', '(01) - Петр Теплый (43 года)']
        expect(sortByDay(testEmp)).toEqual(['(01) - Петр Теплый (43 года)', '(02) - Коля Андефайнов (21 год)', '(13) - Иван Неиванов  (28 лет)', '(19) - Стас Неяснов (18 лет)' ])
    });

    it('sortByMonth should sort employees by month', () => {
        let testEmp = [
            'Декабрь 2021\n(02) - Коля Андефайнов (21 год)',
            'Январь 2021\n(19) - Стас Неяснов (18 лет)',
            'Июль 2021\n(13) - Иван Неиванов  (28 лет)',
            'Август 2021\n(01) - Петр Теплый (43 года)'
        ];
        expect(sortByMonth(testEmp)).toEqual([
            'Январь 2021\n(19) - Стас Неяснов (18 лет)',
            'Июль 2021\n(13) - Иван Неиванов  (28 лет)',
            'Август 2021\n(01) - Петр Теплый (43 года)',
            'Декабрь 2021\n(02) - Коля Андефайнов (21 год)'
        ]);
    });

    it('formatOneMonth should return string "month year and formated string of employees" for inputed month', () => {
        let testMap = new Map().set(7, [
            { name: 'Коля Новогодний', birthday: '2000-07-02' },
            { name: 'Стас Неяснов', birthday: '2003-07-16' }
        ]);
        expect(formatOneMonth(testMap, 7, new Date())).toEqual(`Июль 2021\n(02) - Коля Новогодний (21 год)\n(16) - Стас Неяснов (18 лет)`);
    });

    it('formatMonths should return formated string', () => {
        let testMap = new Map().set(7, [
            { name: 'Коля Новогодний', birthday: '2000-07-02' },
            { name: 'Стас Неяснов', birthday: '2003-07-16' }
        ]);
        testMap.set(9, [
            { name: 'Стас Рождественский', birthday: '2001-09-01' }
        ]);
        testMap.set(8, [
            { name: 'Марина Майская', birthday: '2003-08-17' }
        ]);
        expect(formatMonths(testMap, 0)).toEqual(`Июль 2021\n(02) - Коля Новогодний (21 год)\n(16) - Стас Неяснов (18 лет)`);
    });
    
    it('getList should return correctly formated string for current month', () => {
        let test = getList(employees, 0);
        expect(test).toBe(`Июль 2021\n(02) - Коля Новогодний (21 год)\n(16) - Стас Неяснов (18 лет)`)
    });

    it('getList should return correctly formated string for current and next months', () => {
        let test = getList(employees, 1);
        expect(test).toBe(`Июль 2021\n(02) - Коля Новогодний (21 год)\n(16) - Стас Неяснов (18 лет)\nАвгуст 2021\n(17) - Марина Майская (18 лет)\n(20) - Ваня Иванов (21 год)`)
    });

    it('getList should return correctly formated string for current and two next months', () => {
        let test = getList(employees, 2);
        expect(test).toBe(`Июль 2021\n(02) - Коля Новогодний (21 год)\n(16) - Стас Неяснов (18 лет)\nАвгуст 2021\n(17) - Марина Майская (18 лет)\n(20) - Ваня Иванов (21 год)\nСентябрь 2021\n(01) - Стас Рождественский (20 лет)\n(29) - Петя Петров (19 лет)`)
    });

});