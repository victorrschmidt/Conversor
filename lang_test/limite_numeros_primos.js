/* Mostrar todos os números primos até um número limite. */

var lim, num, d, qtd, z, pr;
lim = parseInt(prompt());
qtd = 0;
z = 0;
pr = [];

  for(num = 2; num <= lim; num++){
    for(d = 1; d <= num; d++){
      if(num % d == 0){
        qtd++;
      }
      if(d == num && qtd == 2){
        pr[z] = num;
        z++;
      }
    }
    qtd = 0;
  }
  
console.log(pr);

/* Fim */