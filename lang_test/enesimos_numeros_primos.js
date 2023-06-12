/* Mostrar os N primeiros números primos. */

var n, num, d, qtd, z, pr;
n = parseInt(prompt());
num = 2;
qtd = 0;
z = 0;
pr = [];

  while(z < n){
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
    num++;
  }
  
console.log(pr);

/* Fim */