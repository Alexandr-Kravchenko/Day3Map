function wordFrequency(text) {
    const wordMap = new Map();
    let words = text.toLowerCase().replace(/[.,]/g, '').split(' ');
    for(let i = 0; i < words.length; i += 1) {
        if(wordMap.has(words[i])) {
            wordMap.set(words[i], wordMap.get(words[i]) + 1);
        } else {
            wordMap.set(words[i], 1);
        } 
    }
    return wordMap;
}

console.log(wordFrequency('Какая-то строка, тут есть слова, слова тут повторяются, есть.'))

export default wordFrequency;
    /* 
        Какая-то
        строка
        тут 2
        есть 2 
        слова 2  
        повторяются
    */
