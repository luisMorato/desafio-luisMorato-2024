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

    formatadorDeTexto(texto) {
        return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z ]/g, '')
        .toLowerCase();
    }


    analisaRecintos(especie, quantidade) {
        const especieFormatada = this.formatadorDeTexto(especie);

        if(this.recintos.length === 0) {
            return console.error('Nenhum recinto cadastrado, por favor registre um recinto antes de adicionar um animal.');
        }

        if(!especie) {
            return console.error('Insira um animal para continuar.');
        }

        if(!quantidade) {
            return console.error('Insira a quantidade de animais dessa espécie para continuar.');
        }

        if(!this.#animaisPermitidos.includes(especieFormatada)) {
            return { erro: 'Essa espécie de animal não é permitida.' };
        }

        let ambientesDisponiveis = [];

        //Dados do animal à ser adicionado
        const animalParaAdicionar = new Animal(especieFormatada);
        const espacoOcupadoMesmaEspecie = animalParaAdicionar.tamanho * quantidade;
        const espacoOcupadoEspecieDiferente = ((animalParaAdicionar.tamanho * quantidade) + 1);
        const biomasDoAnimal = animalParaAdicionar.bioma;
        const habitoAlimentarDoAnimal = animalParaAdicionar.habitoAlimentar;
        
        this.recintos.map((recinto) => {
            if(biomasDoAnimal.some(bioma => recinto.bioma.includes(bioma))){
                const possuiAreasDisponiveis = recinto.areasLivres >= espacoOcupadoMesmaEspecie;

                if(animalParaAdicionar.especie === 'hipopotamo') {
                    const biomaAdequadoComMaisDeUmAnimal = biomasDoAnimal.every(bioma => recinto.bioma.includes(bioma));

                    if(recinto.animaisExistentes.length > 0 && biomaAdequadoComMaisDeUmAnimal && possuiAreasDisponiveis) {
                        ambientesDisponiveis = [
                            ...ambientesDisponiveis,
                            recinto.numeroDoRecinto
                        ]
                    } else if (recinto.animaisExistentes.length === 0 && possuiAreasDisponiveis) {
                        ambientesDisponiveis = [...ambientesDisponiveis, recinto.numeroDoRecinto];
                    }

                    return;
                } else if(possuiAreasDisponiveis){
                    ambientesDisponiveis = [
                        ...ambientesDisponiveis,
                        recinto.numeroDoRecinto
                    ]
                }
            }
        });

        const recintosViaveis = [...new Set(ambientesDisponiveis)];

        const recintosViaveisFormatado = this.recintos
        .map((recinto) => {
            if(recintosViaveis.some(numeroRecintoViavel => numeroRecintoViavel === recinto.numeroDoRecinto)){
                return `Recinto ${recinto.numeroDoRecinto} (espaço livre: ${recinto.areasLivres} total: ${recinto.capacidadeTotal})`;
            }
        })
        .filter((item) => item !== undefined);

        return ambientesDisponiveis.length > 0 ? console.log(recintosViaveisFormatado) : console.log('Nenhum Ambiente encontrado :(');
    }
}

export { RecintosZoo as RecintosZoo };
