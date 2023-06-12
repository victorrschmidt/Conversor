// Exercício: Torneio de tênis; Modalidade Programação Nível 1, Fase 1, ano 2021.

//Link: https://olimpiada.ic.unicamp.br/pratique/p1/2021/f1/torneio/

//Solução de teste
var a, v, i;
a = [];
v = 0;

  for(i = 0; i < 6; i++){
    a[i] = prompt();
    if(a[i] == "V"){
      v++;
    }
  }

  if(v > 4){
    v = 1;
  }
  else if(v > 2 && v < 5){
    v = 2;
  }
  else if(v > 0 && v < 3){
    v = 3;
  }
  else{
    v--;
  }

console.log(v);


//Solução corrigida (tempo de resposta maior)
var a, v, i;
a = [];
v = 0;

  for(i = 0; i < 6; i++){
    scanf("%s","a[i]");
    if(a[i] == 'V'){
      v++;
    }
  }

  if(v > 4){
    v = 1;
  }
  else if(v > 2 && v < 5){
    v = 2;
  }
  else if(v > 0 && v < 3){
    v = 3;
  }
  else{
    v--;
  }

printf("%d", v);


//Solução corrigida e compactada (tempo de resposta menor)
var a=[],v=0,i;for(i=0;i<6;i++){scanf("%s","a[i]");if(a[i]=='V'){v++;}}if(v>4){v=1;}else if(v>2&&v<5){v=2;}else if(v>0&&v<3){v=3;}else{v--;}printf("%d",v);
