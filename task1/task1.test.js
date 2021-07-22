import wordFrequency from "./task1";

describe("word's frequency", () => {
    it("word's frequency", () => {
        let text = 'Какая-то строка, тут есть слова. Слова тут повторяются, надо проверить .'
        let result = wordFrequency(text);
        expect(result.get('слова')).toBe(2);
    })
    
})