// Exercício: Cálculo rápido; Modalidade Programação Nível 1, Fase 2, ano 2021.

//Link: https://olimpiada.ic.unicamp.br/pratique/p1/2021/f2/calculo/

//Solução de teste
var s, a, b, total, i, tam, z, soma;
s = prompt();
a = prompt();
b = prompt();
total = 0;

  for(i = a; i <= b; i++){
    tam = String(i).length;
    soma = 0;
    for(z = 0; z < tam; z++){
      soma += Number(String(i).charAt(z));
    }
    if(soma == s){
      total++;
    }
  }

console.log(total);


//Solução corrigida
var s, a, b, total, i, tam, z, soma;

scanf("%d%d%d","s","a","b");
total = 0;

  for(i = a; i <= b; i++){
    tam = String(i).length;
    soma = 0;
    for(z = 0; z < tam; z++){
      soma += Number(String(i).charAt(z));
    }
    if(soma == s){
      total++;
    }
  }

printf("%d\n",total);