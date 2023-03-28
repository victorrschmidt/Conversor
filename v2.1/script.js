const root = document.documentElement,  // Elementos do HTML
input_dropdown = document.getElementById("input-dropdown"),
output_dropdown = document.getElementById("output-dropdown"),
input_icon = document.getElementById("input-icon"),
output_icon = document.getElementById("output-icon"),
input_desc = document.getElementById("input-desc"),
output_desc = document.getElementById("output-desc"),
converter_desc = document.getElementById("converter"),
input = document.getElementById("input"),
output = document.getElementById("output"),
idiomas_menu = document.getElementById("idiomas-menu"),
idiomas_list = document.getElementById("idiomas-list"),
mudar_tema = document.getElementById("mudar-tema");
let input_list = document.getElementById("input-list"),  // Não são constantes pois precisam ser redeclaradas
output_list = document.getElementById("output-list");

const metodos = {  // Objeto contendo as unidades de medida, escalas e os nomes compostos das escalas
    unidades: {  // Unidades de medida
        "temperatura": [
            "celsius",
            "fahrenheit",
            "kelvin",
            "rankine",
            "reaumur",
            "newton"
        ],
        "velocidade": [
            "metro-segundo",
            "quilometro-hora",
            "quilometro-segundo",
            "milhas-hora",
            "no",
            "polegadas-segundo", 
            "pe-segundo",
            "velocidade-som",  
            "velocidade-luz"
        ],
        "dados": [
            "bit",
            "byte",
            "kilobyte",
            "megabyte",
            "gigabyte",
            "terabyte",
            "petabyte"
        ],
        "massa": [
            "miligrama",
            "grama",
            "quilograma",
            "tonelada",
            "onca",
            "libra"
        ],
        "comprimento": [
            "milimetro",
            "centimetro",
            "metro",
            "quilometro",
            "milha",
            "polegada",
            "pe",
            "jarda"
        ],
        "volume": [
            "centimetro-cubico",
            "decimetro-cubico",
            "metro-cubico",
            "quilometro-cubico",
            "copo-americano",
            "galao-americano"
        ],
        "tempo": [
            "milisegundo",
            "segundo",
            "minuto",
            "hora",
            "dia",
            "semana",
            "mes",
            "ano"
        ],
        "frequencia": [
            "deci-hertz",
            "hertz",
            "deca-hertz",
            "hecto-hertz",
            "quilo-hertz",
            "mega-hertz",
            "giga-hertz"
        ],
        "moeda": [
            "real",
            "dolar-americano",
            "peso-uruguaio",
            "peso-argentino",
            "euro",
            "rublo-russo",
            "renminbi-chines",
            "won-sul-coreano",
            "iene-japones"
        ]
    },
    extenso: {  // Nomes por extenso das escalas de cada unidade de medida
        "temperatura": [
            "Celsius (°C)",
            "Fahrenheit (°F)",
            "Kelvin (K)",
            "Rankine (°Ra)",
            "Réaumur (°Ré)",
            "Newton (°N)"
        ],
        "velocidade": [
            "Metros por segundo (m/s)",
            "Quilômetros por hora (km/h)",
            "Quilômetros por segundo (km/s)",
            "Milhas por hora (mph)",
            "Nós",
            "Polegadas por segundo (in/s)",
            "Pés por segundo (ft/s)",
            "Velocidade do som",
            "Velocidade da luz"
        ],
        "dados": [
            "Bits (b)",
            "Bytes (B)",
            "Kilobytes (KB)",
            "Megabytes (MB)",
            "Gigabytes (GB)",
            "Terabytes (TB)",
            "Petabytes (PB)"
        ],
        "massa": [
            "Miligramas (mg)",
            "Gramas (g)",
            "Quilogramas (kg)",
            "Toneladas (t)",
            "Onças (oz)",
            "Libras (lb)"
        ],
        "comprimento": [
            "Milímetros (mm)",
            "Centímetros (cm)",
            "Metros (m)",
            "Quilômetros (km)",
            "Milhas (mi)",
            "Polegadas (in)",
            "Pés (ft)",
            "Jardas (yd)"
        ],
        "volume": [
            "Centímetros cúbicos (cm³)",
            "Decímetros cúbicos (dm³)",
            "Metros cúbicos (m³)",
            "Quilômetros cúbicos (km³)",
            "Copo americano",
            "Galão americano"
        ],
        "tempo": [
            "Milisegundos (ms)",
            "Segundos (s)",
            "Minutos (min)",
            "Horas (h)",
            "Dias",
            "Semanas",
            "Meses",
            "Anos"
        ],
        "frequencia": [
            "Deci-hertz (dHz)",
            "Hertz (Hz)",
            "Deca-hertz (daHz)",
            "Hecto-hertz (hHz)",
            "Quilo-hertz (kHz)",
            "Mega-hertz (MHz)",
            "Giga-hertz (GHz)"
        ],
        "moeda": [
            "Real (BRL)",
            "Dólar Americano (USD)",
            "Peso Uruguaio (UYU)",
            "Peso Argentino (ARS)",
            "Euro (EUR)",
            "Rublo Russo (RUB)",
            "Renminbi Chinês (CNY)",
            "Won Sul-Coreano (KRW)",
            "Iene Japonês (JPY)"
        ]
    }
};

const base_conversao = {
    /*
        Objeto contendo os parâmetros de conversão de cada escala. Cada unidade converte as escalas para uma escala padrão.
        Ex: Temperatura -> celsius; Velocidade -> metros por segundo; Dados -> megabytes, etc.

        A inicial '*' significa que o valor da escala deve ser multiplicado pelo número que o sucede para ser convertido para a escala padrão.
        A inicial '/' significa que o valor da escala deve ser dividido pelo número que o sucede para ser convertido para a escala padrão.

        Ex: valor (em quilometro-hora); quilometro-hora para metro-segundo => (quilometro-hora /= 3.6) = valor (metro-segundo).

        Alguns métodos não estão listados pois são casos específicos que não envolvem uma multiplicação ou divisão simples.
    */
    "celsius": "*1",  // Temperatura -> celsius
    "reaumur": "*1.25",
    "metro-segundo": "*1",  // Velocidade -> metros por segundo  
    "quilometro-hora": "/3.6",  
    "quilometro-segundo": "*1000",
    "milhas-hora": "/2.237",
    "no": "/1.944",
    "polegadas-segundo": "/39.37",
    "pe-segundo": "*0.3048",
    "velocidade-som": "*343",
    "velocidade-luz": "*299792458",
    "bit": "*0.000000125",  // Dados -> megabytes
    "byte": "*0.000001",
    "kilobyte": "*0.001",
    "megabyte": "*1",
    "gigabyte": "*1000",
    "terabyte": "*1000000",
    "petabyte": "*1000000000",
    "miligrama": "*0.001",  // Massa -> gramas
    "grama": "*1",
    "quilograma": "*1000",
    "tonelada": "*1000000",
    "onca": "*28.35",
    "libra": "*453.6",
    "milimetro": "*0.001",  // Comprimento -> metros
    "centimetro": "*0.01",
    "metro": "*1",
    "quilometro": "*1000",
    "milha": "*1609",
    "polegada": "/39.37",
    "pe": "/3.281",
    "jarda": "/1.094",
    "centimetro-cubico": "*0.0000001",  // Volume -> metros cubicos
    "decimetro-cubico": "*0.001",
    "metro-cubico": "*1",
    "quilometro-cubico": "*1000000000",
    "copo-americano": "/4167",
    "galao-americano": "/264.2",
    "milisegundo": "/3600000",  // Tempo -> horas
    "segundo": "/3600",
    "minuto": "/60",
    "hora": "*1",
    "dia": "*24",
    "semana": "*168",
    "mes": "*730",
    "ano": "*8760",
    "deci-hertz": "*0.1",  // Frequência -> hertz
    "hertz": "*1",
    "deca-hertz": "*10",
    "hecto-hertz": "*100",
    "quilo-hertz": "*1000",
    "mega-hertz": "*1000000",
    "giga-hertz": "*1000000000",
    "real": "*1",  // Moeda -> reais
    "dolar-americano": "*5.25",  
    "peso-uruguaio": "/7.69",
    "peso-argentino": "/26.82",
    "euro": "*5.24",
    "rublo-russo": "/12.25",
    "renminbi-chines": "/1.33",
    "won-sul-coreano": "/263.14",
    "iene-japones": "/27.45"
};

let unidade_metodo = "temperatura";  // Variável para verificar a unidade de medida para conversão
let metodo_input = "celsius";  // Variável para verificar a escala de entrada
let metodo_output = "fahrenheit";  // Variável para verificar a escala de saída
    
    function removerOutput()  // Função que remove o valor do output (ao mudar unidades e escalas)
    {
        if(output.firstChild != null)
        {
            output.removeChild(output.firstChild);
        }
    }

    function mudarUnidade(id)  // Função que muda a unidade de medida (temperatura, velocidade, dados, etc.)
    {   
        removerOutput();
        unidade_metodo = id;  // Mudar a unidade de medida
        
        let antiga_unidade = document.getElementsByClassName("unidade-selecionada")[0];  // Verificar a unidade ativa anteriormente
        antiga_unidade.setAttribute("onclick", "mudarUnidade(this.id)");  // Adicionar função de clique para a unidade antiga
        antiga_unidade.classList.remove("unidade-selecionada");  // Remover outline da antiga unidade selecionada (contorno)

        let nova_unidade = document.getElementById(id);  // Verificar a unidade nova
        nova_unidade.removeAttribute("onclick");  // Remover função de clique para a unidade nova
        nova_unidade.classList.add("unidade-selecionada");  // Adicionar outline para a unidade nova
        input_list.remove();  // Remover ambas as listas de escalas atuais
        output_list.remove();

        input_desc.innerHTML = metodos.extenso[unidade_metodo][0];  // Mudar o texto de input
        output_desc.innerHTML = metodos.extenso[unidade_metodo][1];  // Mudar o texto de output
        metodo_input = metodos.unidades[unidade_metodo][0];  // Mudar a escala de input para valor padrão (primeiro do array)
        metodo_output = metodos.unidades[unidade_metodo][1];  // Mudar a escala de output para valor padrão (segundo do array)

        let dif = "in";  // Modificar inicialmente a lista de input

        for(let i = 0; i < 2; i++)  // Refazer as listas. Para i = 0, recriar a lista de input, para i = 1, recriar a lista de output
        {
            let list = document.createElement("ul");  // Criar nova lista <ul>
            list.setAttribute("id", `${dif}put-list`);  // Definir atributo da lista (input ou output)
            list.setAttribute("class", "drop-list");

            for(let j = 0; j < metodos.unidades[unidade_metodo].length; j++)  // Adicionar cada <li> da lista
            {   
                let escala = metodos.unidades[unidade_metodo][j];  // Medida de escala
                let item = document.createElement("li");  // Criar cada <li> 
                item.setAttribute("id", `${dif}-${escala}`);  // Atributo id da medida

                if((j == 0 && dif == "in") || (j == 1 && dif == "out"))  // Definir o valor padrão para o primeiro item da lista
                {
                    item.setAttribute("class", "list-active");  // O primeiro do input é o ativo por padrão, o segundo do output é o ativo por padrão
                } else {
                    item.setAttribute("onclick", "mudarEscala(this.id)");  // Adicionar função de clique para cada item (com exceção dos selecionados por padrão)
                }
                        
                item.appendChild(document.createTextNode(metodos.extenso[unidade_metodo][j]));  // Adicionar texto node da lista de acordo com seu nome por extenso
                list.appendChild(item);  // Adicionar <li> formatado para a lista <ul>
            }

            document.getElementsByClassName("dropdown")[i].appendChild(list);  // Adicionar <ul> para a <div> que guarda a lista
            dif = "out";  // Mudar o tipo de lista; repetir o processo mas adicionar os elementos para a lista de output
        }
            
        input_list = document.getElementById("input-list");  // Redeclarar as variáveis para as novas listas <ul>
        output_list = document.getElementById("output-list");

        input.focus();  // Focar digitação no input       
    }

    function inverter()  // Função para inverter entre si as escalas de medida do input e output
    {   
        removerOutput();

        let aux = input_desc.innerHTML;  // Inverter as descrições do input e output
        input_desc.innerHTML = output_desc.innerHTML;
        output_desc.innerHTML = aux;
        aux = metodo_input;  // Inverter as escalas de input e output
        metodo_input = metodo_output;
        metodo_output = aux;

        let id = `in-${metodo_input}`;  // Definir o id da escala de medida selecionada (inicialmente para a lista de input)

        for(let i = 0; i < 2; i++)  // Modificar 'list-active' das listas; para i = 0, modificar o input, para i = 1, modificar o output
        {
            let list = document.getElementsByClassName("list-active")[i];  // Pegar 'list-active' do input e output
            list.setAttribute("onclick", "mudarEscala(this.id)");  // Colocar atributo de clique para as antigas escalas
            list.removeAttribute("class");  // Remover a classe de 'list-active' das antigas escalas
            list = document.getElementById(id);  // Selecionar nova escala
            list.removeAttribute("onclick");  // Remover atributo de clique para as novas escalas
            list.setAttribute("class", "list-active");  // Colocar atributo de classe 'list-active' para a nova escala do input e output
            id = `out-${metodo_output}`;  // Modificar o id para output e reiniciar o loop para alterar lista do output
        }

        input.focus();  // Focar digitação no input
    }

    function mudarEscala(id)  // Função que muda a escala de medida do input ou output (celsius, metros por segundo, kilobytes, etc.)
    {   
        removerOutput();

        let nova_escala = id.slice(id.indexOf("-")+1);  // Verificar a escala selecionada
        
        if(nova_escala == metodo_input || nova_escala == metodo_output)  // Verificar se a escala selecionada é igual a do input ou output
        {
            inverter();  // Se sim, utilizar a função inverter
        } else {  // Caso contrário...
            let extenso = metodos.extenso[unidade_metodo][metodos.unidades[unidade_metodo].indexOf(nova_escala)];  // Verificar o nome por extenso da escala de medida selecionada
            let i;  // Verificar qual posição do documento será modificada; para i = 0, o input é alterado, para i = 1, o output é alterado

            if(id.indexOf("in-") != -1)  // Verificar se o input foi alterado
            {        
                metodo_input = nova_escala;  // Mudar a escala do input
                input_desc.innerHTML = extenso;  // Mudar nome por extenso do input
                i = 0;  // O 'list-active' do input será mudado
            } else {  // Caso contrário, mudar o método de output                      
                metodo_output = nova_escala;  // Mudar a escala do output
                output_desc.innerHTML = extenso;  // Mudar nome por extenso do output
                i = 1;  // O 'list-active' do output será mudado
            }
        
            let list = document.getElementsByClassName("list-active");  // Selecionar ambos os 'list-active' (do input e output)
            list[i].setAttribute("onclick", "mudarEscala(this.id)");  // Adicionar propriedade de clique para a antiga escala
            list[i].removeAttribute("class");  // Remover a classe de 'list-active' da antiga escala
            nova_escala = document.getElementById(id);  // Verificar a nova escala
            nova_escala.removeAttribute("onclick");  // Remover propriedade de clique para a nova escala 
            nova_escala.setAttribute("class", "list-active");  // Adicionar a classe 'list-active' para a nova escala

            input.focus();  // Focar digitação no input
        }
    }

    function converter()  // Função principal do programa. Converte a escala de medida do input para a escala de medida do output e mostra na tela
    {
        if(input.value != "")  // Verificar se o input foi preenchido
        {
            removerOutput();
            
            let valor = Number(input.value);  // Pegar o valor numérico do input
            
            switch(metodo_input)  // Verificar o método de input. Cada unidade de medida passa o valor para uma escala padrão. Ex: temperatura -> celsius, velocidade -> metros por segundo, etc.
            {   
                case "fahrenheit":  // Caso específico (expressão)
                    valor = (valor-32)/1.8;
                    break;
                case "kelvin": // Caso específico (subtração)
                    valor -= 273.15;
                    break;
                case "rankine":  // Caso específico (expressão)
                    valor = valor*5/9-273.15;
                    break;
                case "newton":  // Caso específico (expressão com número periódico)
                    valor = valor*100/33;
                    break;
    
                default:
                    let sinal = base_conversao[metodo_input].charAt(0);  // Verificar o sinal do parâmetro do objeto base_conversao (* ou /)
                    let num = Number(base_conversao[metodo_input].slice(1));  // Verificar o número do parâmetro do objeto base_conversao (após o sinal)
                    sinal == "*" ? valor *= num : valor /= num;  // Se o sinal for '*', multiplicar, caso contrário, dividir
            }
            
            switch(metodo_output)  // Verificar a escala de output e fazer a conversão
            {
                case "fahrenheit":  // Caso específico (expressão)
                    valor = valor*1.8+32;
                    break;
                case "kelvin":  // Caso específico (adição)
                    valor += 273.15;
                    break;
                case "rankine":  // Caso específico (expressão)
                    valor = (valor+273.15)*1.8;
                    break;
                case "newton":  // Caso específico (esta expressão no switch anterior envolve um número periódico)
                    valor *= 0.33;
                    break;
                        
                default:
                    let sinal = base_conversao[metodo_output].charAt(0);  // Verificar o sinal do parâmetro do objeto base_conversao (* ou /)
                    let num = Number(base_conversao[metodo_output].slice(1));  // Verificar o número do parâmetro do objeto base_conversao (após o sinal)
                    sinal == "*" ? valor /= num : valor *= num;  // Se o sinal for '*', dividir (inverter a expressão do parâmetro do objeto base_conversao), caso contrário, multiplicar
            }
            
            if(isFinite(valor))  // Verificar se o número não se tornou + ou - 'infinito' para o parâmetro do javascript (aproximadamente valor X tal que: |X| > 10^308)
            {
                valor = Number(valor.toPrecision(10)).toString();  // Precisar o valor para 10 casas decimais (para evitar valores errôneos devido ao ponto flutuante)
    
                if(valor.indexOf("e") != -1)  // Identificar se a string 'valor' contém uma notação científica (Ex: 10e+12 = 10**+12; 10e-8 = 10**-8)
                {
                    let exp = Number(valor.slice(valor.indexOf("e")+1));  // Verificar o expoente 
                    valor = valor.slice(0, valor.indexOf("e"));  // Remover notação antiga
                    valor += ` x 10^${exp}`;  // Adicionar notação científica com base 10 aparente
                }

            } else {  // Caso for 'infinito', imprimir uma string informando o parâmetro aproximado
                valor = '> 10^308';
            }
            
            output.appendChild(document.createTextNode(valor));  // Imprimir o valor no campo de output

        } else {  // Se o input não foi preenchido...
            input.focus();
        }
    }

input_dropdown.addEventListener("click", () => {  // Event listener para abrir e fechar a lista de escalas do input
    if(input_list.classList.contains("dropdown-aberto"))
    {   
        input_list.classList.remove("dropdown-aberto");  // Fechar se estiver aberta
        input_icon.classList.remove("drop-icon-selected");
    } else {
        input_list.classList.add("dropdown-aberto");  // Abrir se estiver fechada
        input_icon.classList.add("drop-icon-selected");

        if(output_list.classList.contains("dropdown-aberto"))  // Verificar se a lista de output está aberta
        {
            output_list.classList.remove("dropdown-aberto");  // Fechar a lista de output caso ela esteja aberta
            output_icon.classList.remove("drop-icon-selected");
        }
    }
});

output_dropdown.addEventListener("click", () => {  // Event listener para abrir e fechar a lista de escalas do output
    if(output_list.classList.contains("dropdown-aberto"))
    {   
        output_list.classList.remove("dropdown-aberto");  // Fechar se estiver aberta
        output_icon.classList.remove("drop-icon-selected");
    } else {
        output_list.classList.add("dropdown-aberto");  // Abrir se estiver fechada
        output_icon.classList.add("drop-icon-selected");

        if(input_list.classList.contains("dropdown-aberto"))  // Verificar se a lista de input está aberta
        {
            input_list.classList.remove("dropdown-aberto");  // Fechar a lista de input caso ela esteja aberta
            input_icon.classList.remove("drop-icon-selected");
        }
    }
});

idiomas_menu.addEventListener("click", () => {
    if(idiomas_list.style.display != "block")
    {
        idiomas_list.style.display = "block";
    } else {
        idiomas_list.style.display = "none";
    }
});

const temas = [  // Temas de cores do site
    { nome: "padrao", cores: ['#8FC2EE','#479EEB','#377CB8','#40576B','#20486B'] },
    { nome: "roxo", cores: ['#D79EFB','#BA52FA','#9442C7','#694D7A','#5A287A'] },
    { nome: "vermelho", cores: ['#FB8E8C','#FA4441','#C73634','#7A4545','#7A2120'] },
    { nome: "amarelo", cores: ['#FBD54E','#FAC402','#C79C02','#7A6826','#806501'] },
    { nome: "verde", cores: ['#81F277','#3EF02E','#31BD24','#3C7037','#1D7015'] }
];
let proximo_tema = 1;

mudar_tema.addEventListener("click", () => {  // Event listener para mudar o esquema de cores do site (alterando os valores das variáveis do root css)
    root.style.setProperty("--tom-primario", temas[proximo_tema].cores[0]);
    root.style.setProperty("--tom-secundario", temas[proximo_tema].cores[1]);
    root.style.setProperty("--tom-terciario", temas[proximo_tema].cores[2]);
    root.style.setProperty("--tom-quaternario", temas[proximo_tema].cores[3]);
    root.style.setProperty("--tom-quinario", temas[proximo_tema].cores[4]);
    proximo_tema++;

    if(proximo_tema > temas.length-1)  // Reiniciar o array quando chegar no fim
    {
        proximo_tema = 0;
    }
});

let idioma = "portugues";  // Idioma padrão do site

const localisation = {  // Constante contendo informações sobre como os elementos de unidade e escalas são nomeados em outras línguas para poder traduzir o site
    "portugues": {  // Português brasileiro
        unidades: [
            "Temperatura",
            "Velocidade",
            "Dados",
            "Massa",
            "Comprimento",
            "Volume",
            "Tempo",
            "Frequência",
            "Moeda"
        ],
        extenso: {
            "temperatura": [
                "Celsius (°C)",
                "Fahrenheit (°F)",
                "Kelvin (K)",
                "Rankine (°Ra)",
                "Réaumur (°Ré)",
                "Newton (°N)"
            ],
            "velocidade": [
                "Metros por segundo (m/s)",
                "Quilômetros por hora (km/h)",
                "Quilômetros por segundo (km/s)",
                "Milhas por hora (mph)",
                "Nós",
                "Polegadas por segundo (in/s)",
                "Pés por segundo (ft/s)",
                "Velocidade do som",
                "Velocidade da luz"
            ],
            "dados": [
                "Bits (b)",
                "Bytes (B)",
                "Kilobytes (KB)",
                "Megabytes (MB)",
                "Gigabytes (GB)",
                "Terabytes (TB)",
                "Petabytes (PB)"
            ],
            "massa": [
                "Miligramas (mg)",
                "Gramas (g)",
                "Quilogramas (kg)",
                "Toneladas (t)",
                "Onças (oz)",
                "Libras (lb)"
            ],
            "comprimento": [
                "Milímetros (mm)",
                "Centímetros (cm)",
                "Metros (m)",
                "Quilômetros (km)",
                "Milhas (mi)",
                "Polegadas (in)",
                "Pés (ft)",
                "Jardas (yd)"
            ],
            "volume": [
                "Centímetros cúbicos (cm³)",
                "Decímetros cúbicos (dm³)",
                "Metros cúbicos (m³)",
                "Quilômetros cúbicos (km³)",
                "Copo americano",
                "Galão americano"
            ],
            "tempo": [
                "Milisegundos (ms)",
                "Segundos (s)",
                "Minutos (min)",
                "Horas (h)",
                "Dias",
                "Semanas",
                "Meses",
                "Anos"
            ],
            "frequencia": [
                "Deci-hertz (dHz)",
                "Hertz (Hz)",
                "Deca-hertz (daHz)",
                "Hecto-hertz (hHz)",
                "Quilo-hertz (kHz)",
                "Mega-hertz (MHz)",
                "Giga-hertz (GHz)"
            ],
            "moeda": [
                "Real (BRL)",
                "Dólar Americano (USD)",
                "Peso Uruguaio (UYU)",
                "Peso Argentino (ARS)",
                "Euro (EUR)",
                "Rublo Russo (RUB)",
                "Renminbi Chinês (CNY)",
                "Won Sul-Coreano (KRW)",
                "Iene Japonês (JPY)"
            ]
        },
        input_desc: "Digite o valor",
        converter: "Converter"
    },
    "ingles": {  // Inglês
        unidades: [
            "Temperature",
            "Speed",
            "Data",
            "Mass",
            "Length",
            "Volume",
            "Time",
            "Frequency",
            "Currency"
        ],
        extenso: {
            "temperatura": [
                "Celsius (°C)",
                "Fahrenheit (°F)",
                "Kelvin (K)",
                "Rankine (°Ra)",
                "Réaumur (°Ré)",
                "Newton (°N)"
            ],
            "velocidade": [
                "Meters per second (m/s)",
                "Kilometers per hour (km/h)",
                "Kilometers per second (km/s)",
                "Miles per hour (mph)",
                "Knot",
                "Inches per second (in/s)",
                "Feet per second (ft/s)",
                "Speed of sound",
                "Speed of light"
            ],
            "dados": [
                "Bits (b)",
                "Bytes (B)",
                "Kilobytes (KB)",
                "Megabytes (MB)",
                "Gigabytes (GB)",
                "Terabytes (TB)",
                "Petabytes (PB)"
            ],
            "massa": [
                "Miligrams (mg)",
                "Grams (g)",
                "Kilograms (kg)",
                "Tons (t)",
                "Ounces (oz)",
                "Pounds (lb)"
            ],
            "comprimento": [
                "Millimeters (mm)",
                "Centimeters (cm)",
                "Meters (m)",
                "Kilometers (km)",
                "Miles (mi)",
                "Inches (in)",
                "Feet (ft)",
                "Yards (yd)"
            ],
            "volume": [
                "Cubic centimeters (cm³)",
                "Cubic decimeters (dm³)",
                "Cubic meters (m³)",
                "Cubic kilometers (km³)",
                "Cups",
                "Gallons"
            ],
            "tempo": [
                "Milliseconds (ms)",
                "Seconds (s)",
                "Minutes (min)",
                "Hours (h)",
                "Days",
                "Weeks",
                "Months",
                "Years"
            ],
            "frequencia": [
                "Decihertz (dHz)",
                "Hertz (Hz)",
                "Decahertz (daHz)",
                "Hectohertz (hHz)",
                "Quilohertz (kHz)",
                "Megahertz (MHz)",
                "Gigahertz (GHz)"
            ],
            "moeda": [
                "Brazilian real (BRL)",
                "United States dollar (USD)",
                "Uruguayan peso (UYU)",
                "Argentine peso (ARS)",
                "Euro (EUR)",
                "Russian ruble (RUB)",
                "Chinese Renminbi (CNY)",
                "South Korean won (KRW)",
                "Japanese yen (JPY)"
            ]
        },
        input_desc: "Enter a number",
        converter: "Convert"
    }
};

function mudarIdioma(idioma)  // Função de mudar o idioma do site
{
    let novo_idioma = localisation[idioma];
    metodos.extenso = novo_idioma.extenso;  // Mudar o parâmetro 'extenso' da constante 'metodos' (traduzir)

    let unidades_html = document.getElementsByClassName("unidade-desc");  // Pegar os nomes de cada unidade

    for(let i = 0; i < unidades_html.length; i++)  // Mudar os nomes das unidades
    {
        unidades_html[i].innerHTML = novo_idioma.unidades[i];
    }
   
    for(let i = 0; i < 2; i++)
    {
        let lista = document.getElementsByClassName("drop-list")[i].children;  // Traduzir as listas de escalas

        for(let j = 0; j < lista.length; j++)
        {
            lista[j].innerHTML = metodos.extenso[unidade_metodo][j];
        }
    }
    input_desc.innerHTML = metodos.extenso[unidade_metodo][metodos.unidades[unidade_metodo].indexOf(metodo_input)];
    output_desc.innerHTML = metodos.extenso[unidade_metodo][metodos.unidades[unidade_metodo].indexOf(metodo_output)];
    
    input.setAttribute("placeholder", novo_idioma.input_desc);
    converter_desc.innerHTML = novo_idioma.converter;
    
    idiomas_list.style.display = "none";
    input.focus();
}
