import wordFrequency from "./task1";

describe("word's frequency", () => {
    it("word's frequency", () => {
        let text = 'Какая-то строка, тут есть слова. Слова тут повторяются, надо проверить .'
        let result = wordFrequency(text);
        expect(result.get('слова')).toBe(2);
    })

    it("word's frequency", () => {
        let text = 'Какая-то строка, Тут есть слова! СлОвА - тут повторяются,надо проверить!'
        let result = wordFrequency(text);
        expect(result.get('слова')).toBe(2);
    })

    it("word's frequency", () => {
        let text = 'ЧистИки- небольшие птицы.Чистики (живут) как-то в открытом море.\nТолько на время гнездования, выходят чистики на берег ."Чистики" гнездятся на: каменных островах. Гнездовья морских чистиков надежно защищены от врагов? ';
        let result = wordFrequency(text);
        expect(result.get('чистики')).toBe(4);
    })
    
})