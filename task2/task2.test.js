import formatStr from './task2';

let testMap = new Map();
testMap.set(7, [{name: 'Test Testov', birthday: new Date('2002-07-12')}])
describe('formatStr', () => {
    it('something', () => {
        expect(formatStr(testMap)).toBe(`(12) - Test Testov (19 года)`);
    });
});