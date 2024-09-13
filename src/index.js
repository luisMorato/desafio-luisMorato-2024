// import inquirer from 'inquirer';

import { RecintosZoo } from "./recintos-zoo.js";

const recintosZoo = new RecintosZoo();

console.log(recintosZoo.listarRecintos());

//Possíveis
const resposta1 = recintosZoo.analisaRecintos('LEAO', 2);
console.log('Para 2 leões: ', resposta1.recintosViaveis);

const resposta2 = recintosZoo.analisaRecintos('LEOPARDO', 2);
console.log('Para 2 leopardos: ', resposta2.recintosViaveis);

const resposta3 = recintosZoo.analisaRecintos('CROCODILO', 1);
console.log('Para 1 crocodilo: ', resposta3.recintosViaveis);

const resposta4 = recintosZoo.analisaRecintos('MACACO', 1);
console.log('Para 1 macaco: ', resposta4.recintosViaveis);

const resposta5 = recintosZoo.analisaRecintos('MACACO', 2);
console.log('Para 2 macacos: ', resposta5.recintosViaveis);

const resposta6 = recintosZoo.analisaRecintos('GAZELA', 2);
console.log('Para 2 gazelas: ', resposta6.recintosViaveis);

const resposta7 = recintosZoo.analisaRecintos('HIPOPOTAMO', 1);
console.log('Para 1 hipopotamo: ', resposta7.recintosViaveis);

const resposta8 = recintosZoo.analisaRecintos('HIPOPOTAMO', 2);
console.log('Para 2 hipopotamos: ', resposta8.recintosViaveis);

//Não Possíveis
const resposta9 = recintosZoo.analisaRecintos('MACACO', 10);
console.log('Para 10 macacos: ', resposta9.erro);

const resposta10 = recintosZoo.analisaRecintos('HIPOPOTAMO', 3);
console.log('Para 3 hipopotamos: ', resposta10.erro);

// const init = async () => {
//     const response = await inquirer.prompt([{
//         type: 'list',
//         name: 'action',
//         message: 'Selecine uma opção:',
//         choices: [
//             '1- Mostrar todos os Recintos', 
//             '2- Checar disponibilidade de Recinto para um Animal', 
//             '3- sair',
//         ]
//     }]);

//     switch(response.action){
//         case '1- Mostrar todos os Recintos': {
//             const recintos = recintosZoo.listarRecintos();
//             console.log(recintos);
//             init();
//             break;
//         }
//         case '2- Checar disponibilidade de Recinto para um Animal': {
//             adicionarAnimalAoRecinto();
//             break;
//         }
//         case '3- sair': {
//             break;
//         }
//     }
// }

// const adicionarAnimalAoRecinto = async () => {
//     const response = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'especie',
//             message: 'Digite a espécie do animal:',
//         },
//         {
//             type: 'input',
//             name: 'quantidade',
//             message: 'Digite a quantidade de animais:',
//         },
//     ]);

//     const { especie, quantidade } = response;
//     const resultado = recintosZoo.analisaRecintos(especie, quantidade);
//     console.log(resultado.recintosViaveis)
//     console.log(resultado.erro)

//     init();
// }

// init();