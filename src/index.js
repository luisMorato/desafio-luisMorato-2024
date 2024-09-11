import inquirer from 'inquirer';

import { RecintosZoo } from "./recintos-zoo.js";

const recintosZoo = new RecintosZoo();

const init = async () => {
    const response = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Selecine uma opção:',
        choices: [
            '1- Mostrar todos os Recintos', 
            '2- Checar disponibilidade de Recinto para um Animal', 
            '3- sair',
        ]
    }]);

    switch(response.action){
        case '1- Mostrar todos os Recintos': {
            const recintos = recintosZoo.listarRecintos();
            console.log(recintos);
            init();
            break;
        }
        case '2- Checar disponibilidade de Recinto para um Animal': {
            adicionarAnimalAoRecinto();
            break;
        }
        case '3- sair': {
            break;
        }
    }
}

const adicionarAnimalAoRecinto = async () => {
    const response = await inquirer.prompt([
        {
            type: 'input',
            name: 'especie',
            message: 'Digite a espécie do animal:',
        },
        {
            type: 'input',
            name: 'quantidade',
            message: 'Digite a quantidade de animais:',
        },
    ]);

    const { especie, quantidade } = response;
    const resultado = recintosZoo.analisaRecintos(especie, quantidade);
    console.log(resultado.recintosViaveis)
    console.log(resultado.erro)

    init();
}

init();