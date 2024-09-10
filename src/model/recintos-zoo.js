import { Animal } from "./animal.js";

class RecintosZoo {
    recintos = [];
    #animaisPermitidos = ['leao', 'leopardo', 'crocodilo', 'macaco', 'gazela', 'hipopotamo'];

    preencherRecintos() {
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
        return this.recintos.map((recinto) => {
            return {
                numeroDoRecinto: recinto.numeroDoRecinto,
                bioma: recinto.bioma,
                capacidadeTotal: recinto.capacidadeTotal,
                areasLivres: recinto.areasLivres,
                animaisExistentes: recinto.animaisExistentes.map((animal) => animal.especie)
            }
        });
    }

    //Formata os textos para eliminar caracteres especiais, espaços em branco, números, e acentos
    formatadorDeTexto(texto) {
        return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z ]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
    }

    analisaRecintos(especie, quantidade) {
        const especieFormatada = this.formatadorDeTexto(especie); //variável que contém o valor da espécie após a remoção de espaços, caracteres especiais, números e acentos

        //Checa se existem recintos para serem analisados
        if(this.recintos.length === 0) {
            return console.error('Nenhum recinto cadastrado, por favor registre um recinto antes de adicionar um animal.');
        }

        //Checa se foi inserida alguma espécie para ser analisada
        if(!especie) {
            return console.error('Insira um animal para continuar.');
        }

        //Checa se foi inserida alguma quantidade para ser analisada
        if(!quantidade) {
            return console.error('Insira a quantidade de animais dessa espécie para continuar.');
        }

        //Verifica na lista de animais permitidos, se a espécie que foi inserida se encontra na lista
        if(!this.#animaisPermitidos.includes(especieFormatada)) {
            return { erro: 'Essa espécie de animal não é permitida.' };
        }

        let ambientesDisponiveis = [];

        const animalParaAdicionar = new Animal(especieFormatada);

        //Realiza a lógica para identificar se o recinto possui áreas disponíveis para animais de mesma espécie ou espécies diferentes
        const checarPorAreasDisponiveis = (recinto) => {
            const espacoOcupadoMesmaEspecie = animalParaAdicionar.tamanho * quantidade; //Variável com o espaço ocupado por animais de mesma espécie
            const espacoOcupadoEspecieDiferente = ((animalParaAdicionar.tamanho * quantidade) + 1); //Variável com o espaço ocupado por animais de espécies diferentes

            //checa se o recinto que está sendo passado para a função possui todos os animais da mesma espécie
            const espacoUtilizado = recinto.animaisExistentes.every((especie) => especie === animalParaAdicionar.especie) ?
                espacoOcupadoMesmaEspecie
            :
                espacoOcupadoEspecieDiferente
            
            return recinto.areasLivres >= espacoUtilizado;
        }

        const biomasDoAnimal = animalParaAdicionar.bioma; //Variável auxiliar para identificar quais os biomas de uma determinada espécie
        const habitoAlimentarDoAnimal = animalParaAdicionar.habitoAlimentar; //Variável auxiliar para idenfiticar o habito alimentar do animal
        
        //Loop para percorrer todos os recintos disponíveis
        this.recintos.forEach((recinto) => {
            //Checa se o recinto possui o bioma que o animal necessita
            if(!biomasDoAnimal.some(bioma => recinto.bioma.includes(bioma))) return;

            //váriavel auxiliar que possui o valor booleano true caso o número de espaços livres do recinto seja maior do que o espaço ocupado pelos animais a serem adicionados
            const possuiEspacoDisponivel = checarPorAreasDisponiveis(recinto);

            //Verifica se o recinto possui espaços disponíveis
            if(!possuiEspacoDisponivel) return;

            //Variável auxiliar que checa se existem animais carnívoros no recinto e recebe um valor booleano
            const possuiAnimaisCarnivoros = !!recinto.animaisExistentes.some((animal) => animal.habitoAlimentar === 'carnivoro');

            if(animalParaAdicionar.especie === 'hipopotamo') {
                //Variável que checa se o bioma para o hipopotamo quando existe mais espécies está correto
                const biomaAdequadoComMaisDeUmaEspecie = biomasDoAnimal.every(bioma => recinto.bioma.includes(bioma));
                const existemMaisEspeciesNoRecinto = recinto.animaisExistentes.some((animal) => animal.especie !== 'hipopotamo');

                if(existemMaisEspeciesNoRecinto && biomaAdequadoComMaisDeUmaEspecie && !possuiAnimaisCarnivoros) {
                    ambientesDisponiveis = [
                        ...ambientesDisponiveis,
                        recinto.numeroDoRecinto
                    ]
                } else if (recinto.animaisExistentes.length === 0 && !possuiAnimaisCarnivoros) {
                    ambientesDisponiveis = [...ambientesDisponiveis, recinto.numeroDoRecinto];
                }
                return;
            }

            if (animalParaAdicionar.especie === 'macaco'){
                if(recinto.animaisExistentes.length > 0 && !possuiAnimaisCarnivoros){
                    ambientesDisponiveis = [
                        ...ambientesDisponiveis,
                        recinto.numeroDoRecinto
                    ]
                }
                return;
            }
            
            if(habitoAlimentarDoAnimal === 'carnivoro'){
                if(!possuiAnimaisCarnivoros) return;

                ambientesDisponiveis = [
                    ...ambientesDisponiveis,
                    recinto.numeroDoRecinto
                ]
                return;
            }

            ambientesDisponiveis = [
                ...ambientesDisponiveis,
                recinto.numeroDoRecinto
            ]
        });

        const recintosViaveis = [...new Set(ambientesDisponiveis)];

        const recintosViaveisFormatado = this.recintos
        .map((recinto) => {
            if(!!recintosViaveis.some(numeroRecintoViavel => numeroRecintoViavel === recinto.numeroDoRecinto)){
                return `Recinto ${recinto.numeroDoRecinto} (espaço livre: ${recinto.areasLivres} total: ${recinto.capacidadeTotal})`;
            }
        })
        .filter((item) => item !== undefined);

        return ambientesDisponiveis.length > 0 ? console.log(recintosViaveisFormatado) : console.log('Nenhum Ambiente encontrado :(');
    }
}

export { RecintosZoo as RecintosZoo };
