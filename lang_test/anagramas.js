function fatorial(n){
    for(let i = n-1; i > 1; i--){
        n *= i;
    }
    return n;
}

let palavra = '' // Inserir
palavra = palavra.split('');
let letras = [];
let repeat = [];
let total = fatorial(palavra.length);
    
    for(let i of palavra){
        if(letras.indexOf(i) == -1){
            letras.push(i);
            repeat[letras.indexOf(i)] = 1;
        } else {
            repeat[letras.indexOf(i)] += 1;
        }
    }

    for(let i of repeat){
        total /= fatorial(i);
    }

console.log(total);