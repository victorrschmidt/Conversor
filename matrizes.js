var a = [];
var b = [];
var aL = Math.floor(Math.random()*4)+1;
var aC = Math.floor(Math.random()*4)+1;
var bL = Math.floor(Math.random()*4)+1;
var bC = Math.floor(Math.random()*4)+1;
var strA = "A = [ ";
var strB = "B = [ ";
var strT = "";

  for(var i = 0; i < aL*aC; i++)
  {
    a[i] = Math.floor(Math.random()*10);
    strA += `${a[i]} `;
    if((i+1) % aC == 0 && (i != 0 || aC == 1))
    {
      strA += "]\n    ";
    }
    if((i+1) % aC == 0 && i != aL*aC-1){
      strA += "[ ";
    }
  }

  for(var i = 0; i < bL*bC; i++)
  {
    b[i] = Math.floor(Math.random()*10);
    strB += `${b[i]} `;
    if((i+1) % bC == 0 && (i != 0 || bC == 1))
    {
      strB += "]\n    ";
    }
    if((i+1) % bC == 0 && i != bL*bC-1){
      strB += "[ ";
    }
  }

strT += `${strA}\n${strB}`;
console.log(strT);
