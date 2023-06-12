/* Informar a quantidade de anos, meses e dias entre duas datas. */

var d1, d2, a1, a2, t, str, a, m, d;
d1 = prompt(`Digite a data 1 no formato dd/mm/aaaa`);
d2 = prompt(`Digite a data 2 no formato dd/mm/aaaa`);
a1 = Number(d1.substr(0, 2)) + Number(d1.substr(3, 2)*30) + Number(d1.substr(6, 4)*365);
a2 = Number(d2.substr(0, 2)) + Number(d2.substr(3, 2)*30) + Number(d2.substr(6, 4)*365);
t = a2 - a1;
str = `Tempo de diferença: `;
a = parseInt(t / 365);
m = parseInt(t % 365 / 30);
d = parseInt(t % 365 % 30);

  if(a > 0){
    str += `${a} ano`;
    if(a > 1){
      str += `s`;
    }
  }

  if(m > 0){
    if(a > 0 && d > 0){
      str += `, `;
    }
    else if(a > 0 && d == 0){
      str += ` e `;
    }
    str += `${m} `;
    if(m == 1){
      str += `mês`; 
    }
    else{
      str += `meses`;
    }
  }

  if(d > 0){
    if(a > 0 || m > 0){
      str += ` e `;
    }
    str += `${d} dia`;
    if(d > 1){
      str += `s`;
    }
  }

console.log(`${d1}\n${d2}\n${str}.`);

/* Fim */