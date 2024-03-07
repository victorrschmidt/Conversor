const root = document.documentElement;  // Elementos do HTML
const input_dropdown = document.getElementById("input-dropdown");
const output_dropdown = document.getElementById("output-dropdown");
const input_icon = document.getElementById("input-icon");
const output_icon = document.getElementById("output-icon");
const input_desc = document.getElementById("input-desc");
const output_desc = document.getElementById("output-desc");
const converter_desc = document.getElementById("converter");
const input = document.getElementById("input");
const output = document.getElementById("output");
const diomas_menu = document.getElementById("idiomas-menu");
const idiomas_list = document.getElementById("idiomas-list");
const mudar_tema = document.getElementById("mudar-tema");
let input_list = document.getElementById("input-list");  // Não são constantes pois precisam ser redeclaradas
let output_list = document.getElementById("output-list");

const esquema_cor = {  // Esquemas de cor do site
    temas: [  
        { nome: "padrao", cores: ['#8FC2EE','#479EEB','#377CB8','#40576B','#20486B'] },
        { nome: "roxo", cores: ['#D79EFB','#BA52FA','#9442C7','#694D7A','#5A287A'] },
        { nome: "vermelho", cores: ['#FB8E8C','#FA4441','#C73634','#7A4545','#7A2120'] },
        { nome: "amarelo", cores: ['#FBD54E','#FAC402','#C79C02','#7A6826','#806501'] },
        { nome: "verde", cores: ['#81F277','#3EF02E','#31BD24','#3C7037','#1D7015'] }
    ],
    tons: ["primario", "secundario", "terciario", "quaternario", "quinario"]
}


/*
    Objeto contendo as unidades de medida, cada uma contendo suas unidades, bases de conversão e nomes por extenso. 
    
    Cada unidade converte as escalas para uma escala padrão.
    Ex: Temperatura -> celsius; Velocidade -> metros por segundo; Dados -> megabytes, etc.

    A inicial '*' significa que o valor da escala deve ser multiplicado pelo número que o sucede para ser convertido para a escala padrão.
    A inicial '/' significa que o valor da escala deve ser dividido pelo número que o sucede para ser convertido para a escala padrão.

    Ex: valor (em quilometro-hora); quilometro-hora para metro-segundo => (quilometro-hora /= 3.6) = valor (metro-segundo).

    Alguns métodos não estão listados pois são casos específicos que não envolvem uma multiplicação ou divisão simples.
*/

const UNIDADES = {
    "temperatura": [
        { medida: "celsius", base: "*1", extenso: "Celsius (°C)" },
        { medida: "fahrenheit", base: undefined, extenso: "Fahrenheit (°F)" },
        { medida: "kelvin", base: undefined, extenso: "Kelvin (K)" },
        { medida: "rankine", base: undefined, extenso: "Rankine (°Ra)" },
        { medida: "reaumur", base: "*1.25", extenso: "Réaumur (°Ré)" },
        { medida: "newton", base: undefined, extenso: "Newton (°N)" }
    ],
    "velocidade": [
        { medida: "metro-segundo", base: "*1", extenso: "Metros por segundo (m/s)" },
        { medida: "quilometro-hora", base: "/3.6", extenso: "Quilômetros por hora (km/h)" },
        { medida:"quilometro-segundo", base: "*1000", extenso: "Quilômetros por segundo (km/s)" },
        { medida: "milhas-hora", base: "/2.237", extenso: "Milhas por hora (mph)" },
        { medida: "no", base: "/1.944", extenso: "Nós" },
        { medida: "polegadas-segundo", base: "/39.37", extenso: "Polegadas por segundo (in/s)" },
        { medida: "pe-segundo", base: "*0.3048", extenso: "Pés por segundo (ft/s)" },
        { medida: "velocidade-som", base: "*343", extenso: "Velocidade do som" },
        { medida: "velocidade-luz", base: "*299792458", extenso: "Velocidade da luz" }
    ],
    "dados": [
        { medida: "bit", base: "*0.000000125", extenso: "Bits (b)" },
        { medida: "byte", base: "*0.000001", extenso: "Bytes (B)" },
        { medida: "kilobyte", base: "*0.001", extenso: "Kilobytes (KB)" },
        { medida: "megabyte", base: "*1", extenso: "Megabytes (MB)" },
        { medida: "gigabyte", base: "*1000", extenso: "Gigabytes (GB)" },
        { medida: "terabyte", base: "*1000000", extenso: "Terabytes (TB)" },
        { medida: "petabyte", base: "*1000000000", extenso: "Petabytes (PB)" }
    ],
    "massa": [
        { medida: "miligrama", base: "*0.001", extenso: "Miligramas (mg)" },
        { medida: "grama", base: "*1", extenso: "Gramas (g)" },
        { medida: "quilograma", base: "*1000", extenso: "Quilogramas (kg)" },
        { medida: "tonelada", base: "*1000000", extenso: "Toneladas (t)" },
        { medida: "onca", base: "*28.35", extenso: "Onças (oz)" },
        { medida: "libra", base: "*453.6", extenso: "Libras (lb)" }
    ],
    "comprimento": [
        { medida: "milimetro", base: "*0.001", extenso: "Milímetros (mm)" },
        { medida: "centimetro", base: "*0.01", extenso: "Centímetros (cm)" },
        { medida: "metro", base: "*1", extenso: "Metros (m)" },
        { medida: "quilometro", base: "*1000", extenso: "Quilômetros (km)" },
        { medida: "milha", base: "*1609", extenso: "Milhas (mi)" },
        { medida: "polegada", base: "/39.37", extenso: "Polegadas (in)" },
        { medida: "pe", base: "/3.281", extenso: "Pés (ft)" },
        { medida: "jarda", base: "/1.094", extenso: "Jardas (yd)" }
    ],
    "volume": [
        { medida: "centimetro-cubico", base: "*0.0000001", extenso: "Centímetros cúbicos (cm³)" },
        { medida: "decimetro-cubico", base: "*0.001", extenso: "Decímetros cúbicos (dm³)" },
        { medida: "metro-cubico", base: "*1", extenso: "Metros cúbicos (m³)" },
        { medida: "quilometro-cubico", base: "*1000000000", extenso: "Quilômetros cúbicos (km³)" },
        { medida: "copo-americano", base: "/4167", extenso: "Copo americano" },
        { medida: "galao-americano", base: "/264.2", extenso: "Galão americano" }
    ],
    "tempo": [
        { medida: "milisegundo", base: "/3600000", extenso: "Milisegundos (ms)" },
        { medida: "segundo", base: "/3600", extenso: "Segundos (s)" },
        { medida: "minuto", base: "/60", extenso: "Minutos (min)" },
        { medida: "hora", base: "*1", extenso: "Horas (h)" },
        { medida: "dia", base: "*24", extenso: "Dias" },
        { medida: "semana", base: "*168", extenso: "Semanas" },
        { medida: "mes", base: "*730", extenso: "Meses" },
        { medida: "ano", base: "*8760", extenso: "Anos" }
    ],
    "frequencia": [
        { medida: "deci-hertz", base: "*0.1", extenso: "Deci-hertz (dHz)" },
        { medida: "hertz", base: "*1", extenso: "Hertz (Hz)" },
        { medida: "deca-hertz", base: "*10", extenso: "Deca-hertz (daHz)" },
        { medida: "hecto-hertz", base: "*100", extenso: "Hecto-hertz (hHz)" },
        { medida: "quilo-hertz", base: "*1000", extenso: "Quilo-hertz (kHz)" },
        { medida: "mega-hertz", base: "*1000000", extenso: "Mega-hertz (MHz)" },
        { medida: "giga-hertz", base: "*1000000000", extenso: "Giga-hertz (GHz)" }
    ],
    "moeda": [
        { medida: "real", base: "*1", extenso: "Real (BRL)" },
        { medida: "dolar-americano", base: "*5.25", extenso: "Dólar Americano (USD)" },
        { medida: "peso-uruguaio", base: "/7.69", extenso: "Peso Uruguaio (UYU)" },
        { medida: "peso-argentino", base: "/26.82", extenso: "Peso Argentino (ARS)" },
        { medida: "euro", base: "*5.24", extenso: "Euro (EUR)" },
        { medida: "rublo-russo", base: "/12.25", extenso: "Rublo Russo (RUB)" },
        { medida: "renminbi-chines", base: "/1.33", extenso: "Renminbi Chinês (CNY)" },
        { medida: "won-sul-coreano", base: "/263.14", extenso: "Won Sul-Coreano (KRW)" },
        { medida: "iene-japones", base: "/27.45", extenso: "Iene Japonês (JPY)" }
    ],
};

let tema_atual = 0;
let unidade = "temperatura";  // Variável para verificar a unidade de medida para conversão
let medida_input = "celsius";  // Variável para verificar a medida de entrada
let medida_output = "fahrenheit";  // Variável para verificar a medida de saída

function adicionarEventListenersGlobais() {  // Função para adicionar função de clique para os elementos HTML
    for (const element of document.getElementsByClassName("unidade")) {  // Atribuir função de mudança de unidade para cada unidade
        element.addEventListener("click", mudarUnidade);
    }

    document.getElementById("inverter").addEventListener("click", inverter);  // Função de inverter medidas
    document.getElementById("converter").addEventListener("click", converter);  // Função de converter medidas

    input_dropdown.addEventListener("click", () => {  // Event listener para abrir e fechar a lista de escalas do input
        if (input_list.classList.contains("dropdown-aberto")) {
            input_list.classList.remove("dropdown-aberto");  // Fechar se estiver aberta
            input_icon.classList.remove("drop-icon-selected");
            return;
        } 
        
        input_list.classList.add("dropdown-aberto");  // Abrir se estiver fechada
        input_icon.classList.add("drop-icon-selected");
    
        if (output_list.classList.contains("dropdown-aberto")) { // Verificar se a lista de output está aberta
            output_list.classList.remove("dropdown-aberto");  // Fechar a lista de output caso ela esteja aberta
            output_icon.classList.remove("drop-icon-selected");
        }
    });
    
    output_dropdown.addEventListener("click", () => {  // Event listener para abrir e fechar a lista de escalas do output
        if (output_list.classList.contains("dropdown-aberto")) {
            output_list.classList.remove("dropdown-aberto");  // Fechar se estiver aberta
            output_icon.classList.remove("drop-icon-selected");
            return;
        } 
      
        output_list.classList.add("dropdown-aberto");  // Abrir se estiver fechada
        output_icon.classList.add("drop-icon-selected");
    
        if (input_list.classList.contains("dropdown-aberto")) {  // Verificar se a lista de input está aberta
            input_list.classList.remove("dropdown-aberto");  // Fechar a lista de input caso ela esteja aberta
            input_icon.classList.remove("drop-icon-selected");
        }
    });

    mudar_tema.addEventListener("click", () => {  // Event listener para mudar o esquema de cores do site (alterando os valores das variáveis do root css)
        tema_atual = (tema_atual + 1) % esquema_cor.temas.length;
    
        let tom = 0;
    
        for (const cor of esquema_cor.temas[tema_atual].cores) {
            root.style.setProperty(`--tom-${esquema_cor.tons[tom++]}`, cor);
        }    
    });
}
function adicionarEventListenersListas() {  // Função para adicionar função de mudança de medida para cada medida quando a lista é recriada
    for (const id of ["input-list", "output-list"]) {
        for (const element of document.getElementById(id).children) {
            element.addEventListener("click", mudarMedida);
        }
    }
}

adicionarEventListenersGlobais();
adicionarEventListenersListas();


function removerOutput() {  // Função que remove o valor do output (ao mudar unidades e escalas)
    if (output.firstChild != null) {
        output.removeChild(output.firstChild);
    }
}

function mudarUnidade(evento) {  // Função que muda a unidade de medida (temperatura, velocidade, dados, etc.)
    removerOutput();

    unidade = evento.currentTarget.id;  // Mudar a unidade de medida
        
    let antiga_unidade = document.getElementsByClassName("unidade-selecionada")[0];  // Verificar a unidade ativa anteriormente
    antiga_unidade.classList.remove("unidade-selecionada");  // Remover outline da antiga unidade selecionada (contorno)

    let nova_unidade = document.getElementById(unidade);  // Verificar a unidade nova
    nova_unidade.classList.add("unidade-selecionada");  // Adicionar outline para a unidade nova
        
    input_list.remove();  // Remover ambas as listas de escalas atuais
    output_list.remove();

    input_desc.innerHTML = UNIDADES[unidade][0].extenso;  // Mudar o texto de input
    output_desc.innerHTML = UNIDADES[unidade][1].extenso;   // Mudar o texto de output
    medida_input = UNIDADES[unidade][0].medida;  // Mudar a escala de input para valor padrão (primeiro do array)
    medida_output = UNIDADES[unidade][1].medida;  // Mudar a escala de output para valor padrão (segundo do array)

    let dif = "in";  // Modificar inicialmente a lista de input

    for (let i = 0; i < 2; i++) {  // Refazer as listas. Para i = 0, recriar a lista de input, para i = 1, recriar a lista de output
        let list = document.createElement("ul");  // Criar nova lista <ul>
        list.setAttribute("id", `${dif}put-list`);  // Definir atributo da lista (input ou output)
        list.setAttribute("class", "drop-list");

        for (let j = 0; j < UNIDADES[unidade].length; j++) {  // Adicionar cada <li> da lista
            let escala = UNIDADES[unidade][j].medida;  // Medida de escala
            let item = document.createElement("li");  // Criar cada <li> 
            item.setAttribute("id", `${dif}-${escala}`);  // Atributo id da medida

            if ((j == 0 && dif == "in") || (j == 1 && dif == "out")) { // Definir o valor padrão para o primeiro item da lista
                item.setAttribute("class", "list-active");  // O primeiro do input é o ativo por padrão, o segundo do output é o ativo por padrão
            } 
                        
            item.appendChild(document.createTextNode(UNIDADES[unidade][j].extenso));  // Adicionar texto node da lista de acordo com seu nome por extenso
            list.appendChild(item);  // Adicionar <li> formatado para a lista <ul>
        }

        document.getElementsByClassName("dropdown")[i].appendChild(list);  // Adicionar <ul> para a <div> que guarda a lista
        dif = "out";  // Mudar o tipo de lista; repetir o processo mas adicionar os elementos para a lista de output
    }

    adicionarEventListenersListas();

    input_list = document.getElementById("input-list");  // Redeclarar as variáveis para as novas listas <ul>
    output_list = document.getElementById("output-list");

    input.focus();  // Focar digitação no input       
}

function inverter() {  // Função para inverter entre si as escalas de medida do input e output
    removerOutput();

    [input_desc.innerHTML, output_desc.innerHTML] = [output_desc.innerHTML, input_desc.innerHTML];  // Inverter as descrições do input e output
    [medida_input, medida_output] = [medida_output, medida_input];  // Inverter as escalas de input e output

    let id = `in-${medida_input}`;  // Definir o id da escala de medida selecionada (inicialmente para a lista de input)

    for (let i = 0; i < 2; i++) {  // Modificar 'list-active' das listas; para i = 0, modificar o input, para i = 1, modificar o output
        let list = document.getElementsByClassName("list-active")[i];  // Pegar 'list-active' do input e output
        list.removeAttribute("class");  // Remover a classe de 'list-active' das antigas escalas
        list = document.getElementById(id);  // Selecionar nova escala
        list.setAttribute("class", "list-active");  // Colocar atributo de classe 'list-active' para a nova escala do input e output
        id = `out-${medida_output}`;  // Modificar o id para output e reiniciar o loop para alterar lista do output
    }

    input.focus();  // Focar digitação no input
}

function mudarMedida(event) {  // Função que muda a escala de medida do input ou output (celsius, metros por segundo, kilobytes, etc.)
    removerOutput();

    let id = event.currentTarget.id;
    let nova_medida = id.slice(id.indexOf("-")+1);  // Verificar a escala selecionada
        
    if (nova_medida == medida_input || nova_medida == medida_output) {  // Verificar se a escala selecionada é igual a do input ou output
        inverter();  // Se sim, utilizar a função inverter
        return;
    } 
            
    let extenso = UNIDADES[unidade].filter(obj => obj.medida == nova_medida)[0].extenso;  // Verificar o nome por extenso da escala de medida selecionada
    let i;  // Verificar qual posição do documento será modificada; para i = 0, o input é alterado, para i = 1, o output é alterado

    if (id.indexOf("in-") != -1) {  // Verificar se o input foi alterado       
        medida_input = nova_medida;  // Mudar a escala do input
        input_desc.innerHTML = extenso;  // Mudar nome por extenso do input
        i = 0;  // O 'list-active' do input será mudado
    } 
    else {  // Caso contrário, mudar o método de output                      
        medida_output = nova_medida;  // Mudar a escala do output
        output_desc.innerHTML = extenso;  // Mudar nome por extenso do output
        i = 1;  // O 'list-active' do output será mudado
    }
        
    let list = document.getElementsByClassName("list-active");  // Selecionar ambos os 'list-active' (do input e output)
    list[i].removeAttribute("class");  // Remover a classe de 'list-active' da antiga escala
    nova_medida = document.getElementById(id);  // Verificar a nova escala
    nova_medida.setAttribute("class", "list-active");  // Adicionar a classe 'list-active' para a nova escala

    input.focus();  // Focar digitação no input
}

function converter() { // Função principal do programa. Converte a escala de medida do input para a escala de medida do output e mostra na tela
    if (input.value == "") {  // Verificar se o input foi preenchido
        input.focus();
        return;
    }  
    
    removerOutput();
            
    let valor = Number(input.value);  // Pegar o valor numérico do input

    // Verificar o método de input. Cada unidade de medida passa o valor para uma escala padrão. Ex: temperatura -> celsius, velocidade -> metros por segundo, etc.

    if (medida_input == "fahrenheit") {
        valor = (valor - 32) / 1.8;  // Caso específico (expressão)
    }
    else if (medida_input == "kelvin") {
        valor -= 273.15;  // Caso específico (subtração)
    }
    else if (medida_input == "rankine") {
        valor = valor * 5 / 9 - 273.15;  // Caso específico (expressão)
    }
    else if (medida_input == "newton") {
        valor = valor * 100 / 33;  // Caso específico (expressão com número periódico)
    }
    else {  // Caso padrão
        let sinal = UNIDADES[unidade].filter(obj => obj.medida == medida_input)[0].base[0];  // Verificar o sinal do parâmetro do objeto base_conversao (* ou /)
        let num = Number(UNIDADES[unidade].filter(obj => obj.medida == medida_input)[0].base.slice(1));  // Verificar o número do parâmetro do objeto base_conversao (após o sinal)

        if (sinal == '*') {
            valor *= num;
        }
        else {
            valor /= num;
        }
    }
    
    if (medida_output == "fahrenheit") {
        valor = valor * 1.8 + 32;  // Caso específico (expressão)
    }
    else if (medida_output == "kelvin") {
        valor += 273.15;  // Caso específico (adição)
    }
    else if (medida_output == "rankine") {
        valor = (valor + 273.15) * 1.8;  // Caso específico (expressão)
    }
    else if (medida_output == "newton") {
        valor *= 0.33;  // Caso específico (esta expressão no switch anterior envolve um número periódico)
    }
    else {  // Caso padrão
        let sinal = UNIDADES[unidade].filter(obj => obj.medida == medida_output)[0].base[0];  // Verificar o sinal do parâmetro do objeto base_conversao (* ou /)
        let num = Number(UNIDADES[unidade].filter(obj => obj.medida == medida_output)[0].base.slice(1));  // Verificar o número do parâmetro do objeto base_conversao (após o sinal)

        if (sinal == '*') {
            valor /= num;
        }
        else {
            valor *= num;
        }
    }

    if (isFinite(valor)) {  // Verificar se o número não se tornou + ou - 'infinito' para o parâmetro do javascript (aproximadamente valor X tal que: |X| > 10^308) 
        valor = Number(valor.toPrecision(10)).toString();  // Precisar o valor para 10 casas decimais (para evitar valores errôneos devido ao ponto flutuante)
    
        if (valor.indexOf('e') != -1) {  // Identificar se a string 'valor' contém uma notação científica (Ex: 10e+12 = 10**+12; 10e-8 = 10**-8)    
            let exp = Number(valor.slice(valor.indexOf('e')+1));  // Verificar o expoente 
            valor = `${valor.slice(0, valor.indexOf('e'))} x 10^${exp}`;  // Remover notação antiga e adicionar notação científica com base 10 aparente
        }

    } 
    else {  // Caso for 'infinito', imprimir uma string informando o parâmetro aproximado
        valor = '> 10^308';
    }
            
    output.appendChild(document.createTextNode(valor));  // Imprimir o valor no campo de output   
}