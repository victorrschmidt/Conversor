const input_desc = document.getElementsByTagName('label')[0];
const input = document.querySelector('#input');
const output_desc = document.getElementsByTagName('h3')[0];
const output = document.querySelector('#output');

const metodos = { // Objeto contendo todas as variáveis necessárias para o programa funcionar.
    medidas: [
        'temperatura',
        'velocidade'
    ],
    escalas: [
        [
            'celsius',
            'fahrenheit',
            'kelvin',
            'rankine',
            'reaumur',
            'newton'
        ],
        [
            'metro/segundo', 
            'velocidade_luz',
            'velocidade_som', 
            'quilometro/hora', 
            'quilometro/segundo', 
            'no', 
            'milhas/hora', 
            'polegadas/segundo', 
            'pe/segundo'
        ]
    ],
    extenso: [
        [
            'Celsius (°C)',
            'Fahrenheit (°F)',
            'Kelvin (K)',
            'Rankine (°Ra)',
            'Réaumur (°Ré)',
            'Newton (°N)'
        ],
        [
            'Metros por segundo (m/s)',
            'Velocidade da luz',
            'Velocidade do som',
            'Quilômetros por hora (km/h)',
            'Quilômetros por segundo (km/s)',
            'Nós',
            'Milhas por hora (mph)',
            'Polegadas por segundo (in/s)',
            'Pés por segundo (ft/s)'
        ]
    ]
}

let tipo_metodo = 'temperatura';
let metodo_input = 'celsius';
let metodo_output = 'fahrenheit';

    function mudarMedida(id)
    {
        let metodo_inicial = tipo_metodo; 
        let celula = metodos.medidas.indexOf(id);
        tipo_metodo = metodos.medidas[celula];

        if(metodo_inicial != tipo_metodo)
        {   
            input_desc.innerHTML = metodos.extenso[celula][0]; // Mudar textos principais do input e output
            output_desc.innerHTML = metodos.extenso[celula][1];
            metodo_input = metodos.escalas[celula][0];
            metodo_output = metodos.escalas[celula][1];
        
            document.querySelector('#input-list').remove();
            document.querySelector('#output-list').remove();

            let dif = 'in';

            for(let i = 0; i < 2; i++)
            {
                let list = document.createElement('ul'); // <ul id="input-list" class="drop-list"></ul>
                list.setAttribute('id', `${dif}put-list`);
                list.setAttribute('class', 'drop-list');

                for(let j = 0; j < metodos.extenso[celula].length; j++)
                {   
                    let medida = metodos.escalas[celula][j];
                    let item = document.createElement('li');
                    item.setAttribute('id', `${dif}-${medida}`);

                    if((j == 0 && dif == 'in') || (j == 1 && dif == 'out')) // Definir o valor padrão para o primeiro item da lista
                    {
                        item.setAttribute('class', 'list-active')
                    } else 
                    {
                        item.setAttribute('onclick', 'mudarUnidade(this.id)'); 
                    }
                        
                    item.appendChild(document.createTextNode(metodos.extenso[celula][j]));
                    list.appendChild(item);
                }

                document.getElementsByClassName('drop-icon')[i].appendChild(list);
                dif = 'out';
            }
        }       
    }


    function mudarUnidade(id)
    {
        let celula = metodos.medidas.indexOf(tipo_metodo);
        let linha =  metodos.escalas[celula].indexOf(id.slice(id.indexOf('-')+1));
        let escala = metodos.escalas[celula][linha];
        let extenso = metodos.extenso[celula][linha];
        let i; // Verificar qual posição do documento será modificada

        if(id.indexOf('in-') != -1) // Mudar o método de input
        {        
            metodo_input = escala;
            input_desc.innerHTML = extenso; 
            i = 0; // O list-active do input será mudado
        } else // Mudar o método de output
        {                            
            metodo_output = escala;
            output_desc.innerHTML = extenso;
            i = 1; // O list-active do output será mudado
        }
        
        let list = document.getElementsByClassName('list-active');
        list[i].setAttribute('onclick', 'mudarUnidade(this.id)');
        list[i].removeAttribute('class');
        document.querySelector(`#${id}`).setAttribute('class', 'list-active');
        list[i].removeAttribute('onclick');
    }
    

    function inverter()
    {   
        if(metodo_input != metodo_output)
        {
            let aux = input_desc.innerHTML;
            input_desc.innerHTML = output_desc.innerHTML;
            output_desc.innerHTML = aux;
            aux = metodo_input;
            metodo_input = metodo_output;
            metodo_output = aux;

            let list = document.getElementsByClassName('list-active');
            let id = `#in-${metodo_input}`;

            for(let i = 0; i < 2; i++) // Modificar listas
            {
                list = document.getElementsByClassName('list-active')[i];
                list.setAttribute('onclick', 'mudarUnidade(this.id)');
                list.removeAttribute('class');
                list = document.querySelector(id);
                list.setAttribute('class', 'list-active');
                list.removeAttribute('onclick');
                id = `#out-${metodo_output}`;
            }
        }
    }

    
    function converter()
    {
        if(output.firstChild != null)
        {
            output.removeChild(output.firstChild);
        }

        let valor = Number(input.value);
       
        switch(metodo_input) 
        {
            case 'fahrenheit': // Passar temperatura para celsius
                valor = (valor-32)/1.8;
                break;
            case 'kelvin':
                valor -= 273.15;
                break;
            case 'rankine':
                valor = valor*(5/9)-273.15;
                break;
            case 'newton':
                valor *= (100/33);
                break;
            case 'velocidade_luz': // Passar velocidade para m/s
                valor *= 299792458;
                break;
            case 'velocidade_som':
                valor *= 343;
                break;
            case 'quilometro/hora':
                valor /= 3.6;
                break;
            case 'quilometro/segundo':
                valor *= 1000;
                break;
            case 'no':
                valor /= 1.944;
                break;
            case 'milhas/hora':
                valor /= 2.237;
                break;
            case 'polegadas/segundo':
                valor /= 39.37;
                break;
            case 'pe/segundo':
                valor *= 0.3048;
                break;
        }
        
        switch(metodo_output)
        {
            case 'fahrenheit':
                valor = valor*1.8+32;
                break;
            case 'kelvin':
                valor += 273.15;
                break;
            case 'rankine':
                valor = (valor+273.15)*1.8;
                break;
            case 'newton':
                valor *= 0.33;
                break;
            case 'velocidade_luz': 
                valor /= 299792458;
                break;
            case 'velocidade_som':
                valor /= 343;
                break;
            case 'quilometro/hora':
                valor *= 3.6;
                break;
            case 'quilometro/segundo':
                valor /= 1000;
                break;
            case 'no':
                valor *= 1.944;
                break;
            case 'milhas/hora':
                valor *= 2.237;
                break;
            case 'polegadas/segundo':
                valor *= 39.37;
                break;
            case 'pe/segundo':
                valor /= 0.3048;
                break; 
        }
        
        output.appendChild(document.createTextNode(valor));
    }