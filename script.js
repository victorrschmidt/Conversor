const body = document.body;
const header = document.getElementsByTagName("header")[0];
const main = document.getElementsByTagName("main")[0];
const input_method = document.querySelector("#input-root");
const output_method = document.querySelector("#output-root");
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const toggle = document.getElementById("#tema");
let tema = 'escuro';
let method = 'dec_hex';
let value;
let error;
            
    function converter() {
        if(output.firstChild != null) {
            output.removeChild(output.firstChild);
        }
        error = false;
        if(method == 'dec_hex') {
            value = Number(input.value);
            if(isNaN(value)) {
                error = true;
            } 
            value = value.toString(16).toUpperCase();
        } 
        else {
            value = input.value.toUpperCase();
            for(let i of value) {
                if(!((i.charCodeAt(0) >= 48 && i.charCodeAt(0) <= 57) || (i.charCodeAt(0) >= 65 && i.charCodeAt(0) <= 70))) {
                    error = true;
                }
            }
            value = parseInt(value, 16);
        }
        error ? alert("Valor inválido") : output.appendChild(document.createTextNode(value));
    }
            
    function mudarMetodo() {        
        input_method.removeChild(input_method.firstChild);
        input.focus();
        output_method.removeChild(output_method.firstChild);
        if(output.firstChild != null) {
            output.removeChild(output.firstChild);
        }
        method == 'dec_hex' ? method = 'hex_dec' : method = 'dec_hex';
        input_method.appendChild(document.createTextNode(method.slice(0, 3).toUpperCase()));
        output_method.appendChild(document.createTextNode(method.slice(4).toUpperCase()));
    }

    function mudarTema() {
        if(tema == 'escuro') {
            body.style.background = '#FFFFFF';
            header.style.background = '#1E1E1E';
            main.style.background = '#FFFFFF';
            main.style.color = '#000000';
            main.style.borderColor = 'black'
            tema = 'claro';
        } else {
            body.style.background = '#141414';
            header.style.background = '#282828';
            main.style.background = '#3C3C3C';
            main.style.color = 'unset';
            main.style.borderColor = 'transparent';
            tema = 'escuro';
        }
    }
