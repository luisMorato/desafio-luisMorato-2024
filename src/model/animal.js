export class Animal {
    especie
    tamanho = 4
    habitoAlimentar = 'herbivoro'
    bioma = []

    #animaisPequenos = ['macaco']
    #animaisMedios = ['leopardo', 'gazela']
    #animaisGrandes = ['leao', 'crocodilo']

    #animaisCarnivoros = ['leopardo', 'leao', 'crocodilo']

    #especiesDeSavana = ['leao', 'leopardo', 'macaco', 'gazela', 'hipopotamo']
    #especieDeRio = ['crocodilo', 'hipopotamo']
    #especieDeFloresta = ['macaco']

    constructor(especie) {
        this.econtrarTamanhoDoAnimal(especie)
        this.encontrarBiomaDoAnimal(especie)
        this.encontrarHabitoAlimentarDoAnimal(especie)

        this.especie = especie;
    }

    econtrarTamanhoDoAnimal(especie) {
        if(this.#animaisPequenos.includes(especie)) {
            this.tamanho = 1
        } 

        if(this.#animaisMedios.includes(especie)) {
            this.tamanho = 2
        } 
        
        if(this.#animaisGrandes.includes(especie)) {
            this.tamanho = 3
        }

    }

    encontrarBiomaDoAnimal(especie) {
        if(this.#especiesDeSavana.includes(especie)) {
            this.bioma = [...this.bioma, 'savana'];
        }
        if(this.#especieDeRio.includes(especie)){
            this.bioma = [...this.bioma, 'rio'];
        }
        if(this.#especieDeFloresta.includes(especie)) {
            this.bioma = [...this.bioma, 'floresta'];
        }
    }

    encontrarHabitoAlimentarDoAnimal(especie) {
        if(this.#animaisCarnivoros.includes(especie)) {
            this.habitoAlimentar = 'carnivoro';
        }
    }
}