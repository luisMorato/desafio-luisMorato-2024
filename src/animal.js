export class Animal {
    especie;
    tamanho = 4;
    habitoAlimentar = 'herbivoro';
    bioma = [];

    static dadosDosAnimais = {
        macaco: { tamanho: 1, bioma: ['savana', 'floresta'], habitoAlimentar: 'herbivoro' },
        leopardo: { tamanho: 2, bioma: ['savana'], habitoAlimentar: 'carnivoro' },
        gazela: { tamanho: 2, bioma: ['savana'], habitoAlimentar: 'herbivoro' },
        leao: { tamanho: 3, bioma: ['savana'], habitoAlimentar: 'carnivoro' },
        crocodilo: { tamanho: 3, bioma: ['rio'], habitoAlimentar: 'carnivoro' },
        hipopotamo: { tamanho: 4, bioma: ['rio', 'savana'], habitoAlimentar: 'herbivoro' },
    };

    constructor(especie) {
        const data = Animal.dadosDosAnimais[especie];

        this.especie = especie;
        this.tamanho = data.tamanho;
        this.bioma = data.bioma;
        this.habitoAlimentar = data.habitoAlimentar;
    }
}