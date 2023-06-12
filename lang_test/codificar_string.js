/* Codificar string; link: https://edabit.com/challenge/WboAruyx4HQ3Q553q */

var message, tam, invalid, string;
message = prompt();
invalid = false;

  for(tam = message.length; tam > 0; tam--){
    if(message.charCodeAt(tam-1) < 97 || message.charCodeAt(tam-1) > 122){
      invalid = true;
    }
  }
  if(message.length != 9 || invalid){
    console.log('BANG! BANG! BANG!');
  }
  else{
    string = "";
    string += message.charAt(5);
    string += message.charAt(4);
    string += message.charAt(3);
    string += String.fromCharCode(message.charCodeAt(6)+1);
    string += String.fromCharCode(message.charCodeAt(7)+1);
    string += String.fromCharCode(message.charCodeAt(8)+1);
    string += message.charCodeAt(0) - 96;
    string += message.charAt(1);
    string += message.charCodeAt(2) - 96;
    console.log(string);
  }
  
/* Fim */