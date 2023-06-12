let input = ''; // Código HEX
input = input.toUpperCase();
let values = '0123456789ABCDEF';
let size = input.length;
let decimal = 0;
  for(let i of input){
    decimal += values.indexOf(i)*Math.pow(16, size-1);
    size--;
  }
console.log(decimal);