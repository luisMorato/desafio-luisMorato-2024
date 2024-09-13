import { Animal } from "./animal.js";

import { formatadorDeTexto } from "./formatador-de-texto.js";

class RecintosZoo {
    recintos = [];
    #animaisPermitidos = [...Object.keys(Animal.dadosDosAnimais)];

    constructor() {
        const macaco = new Animal('macaco');
        const gazela = new Animal('gazela');
        const leao = new Animal('leao');

        this.recintos = [
            {
                numeroDoRecinto: 1,
                bioma: ['savana'],
                capacidadeTotal: 10,
                areasLivres: 10 - 3 * macaco.tamanho,
                animaisExistentes: [macaco, macaco, macaco]
            },
            {
                numeroDoRecinto: 2,
                bioma: ['floresta'],
                capacidadeTotal: 5,
                areasLivres: 5,
                animaisExistentes: []
            },
            {
                numeroDoRecinto: 3,
                bioma: ['savana', 'rio'],
                capacidadeTotal: 7,
                areasLivres: 7 - 1 * gazela.tamanho,
                animaisExistentes: [gazela]
            },
            {
                numeroDoRecinto: 4,
                bioma: ['rio'],
                capacidadeTotal: 8,
                areasLivres: 8,
                animaisExistentes: []
            },
            {
                numeroDoRecinto: 5,
                bioma: ['savana'],
                capacidadeTotal: 9,
                areasLivres: 9 - 1 * leao.tamanho,
                animaisExistentes: [leao]
            },
        ];
    }

    listarRecintos() {
        //Mapeia todos recintos para retorná-los em um determinado formato
        return this.recintos.map((recinto) => {
            return {
                numeroDoRecinto: recinto.numeroDoRecinto,
                bioma: recinto.bioma,
                capacidadeTotal: recinto.capacidadeTotal,
                areasLivres: recinto.areasLivres,
                animaisExistentes: recinto.animaisExistentes.map((animal) => {
                    return {
                        especie: animal.especie,
                        habitoAlimentar: animal.habitoAlimentar
                    }
                })
            }
        });
    }

    analisaRecintos(especie, quantidade) {
        const especieFormatada = formatadorDeTexto(especie); //variável que contém o valor da espécie após a remoção de espaços, caracteres especiais, números e acentos

        //Checa se foi inserida alguma espécie para ser analisada
        if(!especie) {
            return { erro: 'Insira um animal para continuar.' };
            // return console.error('Insira um animal para continuar.');
        }

        //Checa se foi inserida alguma quantidade para ser analisada
        if(!quantidade || quantidade === 0) {
            return { erro: 'Quantidade inválida' };
            // return console.error('Insira a quantidade de animais dessa espécie para continuar.');
        }

        //Verifica na lista de animais permitidos, se a espécie que foi inserida se encontra na lista
        if(!this.#animaisPermitidos.includes(especieFormatada)) {
            return { erro: 'Animal inválido' };
            // return console.error('Essa espécie de animal não é permitida.');
        }

        let ambientesDisponiveis = [];

        const animalParaAdicionar = new Animal(especieFormatada);

        //Realiza a lógica para identificar se o recinto possui áreas disponíveis para animais de mesma espécie ou espécies diferentes
        const checarPorAreasDisponiveis = (recinto) => {
            const espacoOcupadoMesmaEspecie = animalParaAdicionar.tamanho * quantidade; //Variável com o espaço ocupado por animais de mesma espécie
            const espacoOcupadoEspecieDiferente = ((animalParaAdicionar.tamanho * quantidade) + 1); //Variável com o espaço ocupado por animais de espécies diferentes

            //checa se o recinto que está sendo passado para a função possui todos os animais da mesma espécie
            const espacoUtilizado = recinto.animaisExistentes.every((animal) => animal.especie === animalParaAdicionar.especie) ?
                espacoOcupadoMesmaEspecie
            :
                espacoOcupadoEspecieDiferente

            const estaDisponivel = recinto.areasLivres >= espacoUtilizado;

            return { espacoUtilizado, estaDisponivel };
        }

        const biomasDoAnimal = animalParaAdicionar.bioma; //Variável auxiliar para identificar quais os biomas de uma determinada espécie
        const habitoAlimentarDoAnimal = animalParaAdicionar.habitoAlimentar; //Variável auxiliar para idenfiticar o habito alimentar do animal

        //Loop para percorrer todos os recintos disponíveis
        this.recintos.forEach((recinto) => {
            //Checa se o recinto possui o bioma que o animal necessita
            if(!biomasDoAnimal.some(bioma => recinto.bioma.includes(bioma))) return;

            //váriavel auxiliar que possui o valor booleano true caso o número de espaços livres do recinto seja maior do que o espaço ocupado pelos animais a serem adicionados
            const { estaDisponivel } = checarPorAreasDisponiveis(recinto);

            //Verifica se o recinto possui espaços disponíveis
            if(!estaDisponivel) return;

            //Variável auxiliar que checa se existem animais carnívoros no recinto e recebe um valor booleano
            const possuiAnimaisCarnivoros = !!recinto.animaisExistentes.some((animal) => animal.habitoAlimentar === 'carnivoro');

            switch(animalParaAdicionar.especie) {
                case 'hipopotamo': {
                    //Variável que checa se o bioma para o hipopotamo quando existe mais espécies está correto
                    const biomaAdequadoComMaisDeUmaEspecie = biomasDoAnimal.every(bioma => recinto.bioma.includes(bioma));
                    const existemMaisEspeciesNoRecinto = recinto.animaisExistentes.some((animal) => animal.especie !== 'hipopotamo');

                    //Checa se existe mais de uma espécie no recinto, além de analisar o bioma, para garantir que caso haja mais de uma espécie, o bioma seja 'savana e rio', e por fim, verifica se o ambiente não possui animais carnívoros
                    if(existemMaisEspeciesNoRecinto && biomaAdequadoComMaisDeUmaEspecie && !possuiAnimaisCarnivoros) {
                        ambientesDisponiveis = [
                            ...ambientesDisponiveis,
                            recinto.numeroDoRecinto
                        ]
                    } else if (recinto.animaisExistentes.length === 0 && !possuiAnimaisCarnivoros) { //Caso não exista nenhuma outra espécie, basta checar se não existem animais carnívoros
                        ambientesDisponiveis = [...ambientesDisponiveis, recinto.numeroDoRecinto];
                    }
                    return;
                }

                case'macaco': {
                    //Checa se já existe algum animal no recinto e se o animal que já existe não é carnívoro
                    if(recinto.animaisExistentes.length > 0 && !possuiAnimaisCarnivoros){
                        ambientesDisponiveis = [
                            ...ambientesDisponiveis,
                            recinto.numeroDoRecinto
                        ]
                    } else if(recinto.animaisExistentes.length === 0 && quantidade > 1){ //Checa se caso o recinto estiver vazio, o número de macacos a ser adicionado precisa ser maior que 1, já que eles não podem ficar sozinhos
                        ambientesDisponiveis = [
                            ...ambientesDisponiveis,
                            recinto.numeroDoRecinto
                        ]
                    }
                    return;
                }
            
                default: {
                    //Caso para animais carnívoros como leão, leopardo e crocodilo
                    if(habitoAlimentarDoAnimal === 'carnivoro'){
                        if(recinto.animaisExistentes.length > 0 && !possuiAnimaisCarnivoros) return;

                        ambientesDisponiveis = [
                            ...ambientesDisponiveis,
                            recinto.numeroDoRecinto
                        ]
                        return;
                    } else if(!possuiAnimaisCarnivoros) { //Caso para a gazela, em que não se pode existir animais carnívoros
                        ambientesDisponiveis = [
                            ...ambientesDisponiveis,
                            recinto.numeroDoRecinto
                        ]
                    }
                }
        }});

        //Cria um novo 'new Set()' que retorna um objeto com os valores de 'ambientesDisponiveis', no entanto sem repetir nenhum valor e o coloca em um Array
        const recintosEncontrados = [...new Set(ambientesDisponiveis)];

        //Realiza a ordenação dos recintos pelo número do recinto, do menor para o maior
        const recintosOrdenados = recintosEncontrados.sort((a, b) => a - b);

        //percorre todos os recintos cadastrados
        const recintosViaveis = this.recintos
        .map((recinto) => {
            const { espacoUtilizado } = checarPorAreasDisponiveis(recinto); //Variável que contém o valor do espaço a ser utilizado pelo novo animal
            const espacoLivre = (recinto.areasLivres - espacoUtilizado); //Variável que calcula o espaço restante após a adição do novo animal

            //Realiza a comparação entre os recintos encontrados e todos os recintos cadastrados para ter acesso à todos os dados do recinto
            if(!!recintosOrdenados.some(numeroRecintoViavel => numeroRecintoViavel === recinto.numeroDoRecinto)){
                //Retorna uma string formatada com os dados necessários
                return `Recinto ${recinto.numeroDoRecinto} (espaço livre: ${espacoLivre} total: ${recinto.capacidadeTotal})`;
            }
        })
        .filter((item) => item !== undefined); //Realiza um filtro que retorna apenas os valores diferentes de 'undefined'

        //Caso haja algum valor dentro do array de 'recintosViaveis', então ela é retornada, caso contrário, é retornado um erro dizendo que não foram encontrados recintos
        return recintosViaveis.length > 0 ? { recintosViaveis } : { erro: 'Não há recinto viável' };
    }
}

export { RecintosZoo as RecintosZoo };