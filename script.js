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
let generate_text;
            
    function converter() {
        if(output.firstChild != null) {
            output.removeChild(output.firstChild);
        }
        if(method == 'dec_hex') {
            generate_text = document.createTextNode(Number(input.value).toString(16).toUpperCase());
        } else {
            generate_text = document.createTextNode(parseInt(input.value, 16));
        }
        output.appendChild(generate_text);
    }
            
    function mudarMetodo() {        
        input_method.removeChild(input_method.firstChild);
        output_method.removeChild(output_method.firstChild);
        if(output.firstChild != null) {
            output.removeChild(output.firstChild);
        }
        if(method == 'dec_hex') {
            method = 'hex_dec';
            generate_text = document.createTextNode('HEX');
            input_method.appendChild(generate_text);
            input.setAttribute("type","text");
            generate_text = document.createTextNode('DEC');
            output_method.appendChild(generate_text);
        } else {
            method = 'dec_hex';
            generate_text = document.createTextNode('DEC');
            input_method.appendChild(generate_text);
            input.setAttribute("type","number");
            generate_text = document.createTextNode('HEX');
            output_method.appendChild(generate_text);
        }
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
