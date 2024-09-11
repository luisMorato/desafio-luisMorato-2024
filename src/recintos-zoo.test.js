import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
        const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar quantidade inválida', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
        expect(resultado.erro).toBe("Quantidade inválida");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    
    //Meus Testes
    test('Deve encontrar apenas os recintos 3 e 4 para 1 hipopotamo', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 4 (espaço livre: 4 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve encontrar apenas o recinto 4 para 2 hipopotamos', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 0 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve rejeitar caso o animal não seja inserido', () => {
        const resultado = new RecintosZoo().analisaRecintos('', 1);
        expect(resultado.erro).toBe("Insira um animal para continuar.");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recintos para 2 leões', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEÃO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 0 total: 9)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar os recintos 1 e 3 para 2 gazelas', () => {
        const resultado = new RecintosZoo().analisaRecintos('GAZELA', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 2 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 1 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve encontrar recintos para as gazelas sem a presença de animais carnívoros', () => {
        const resultado = new RecintosZoo().analisaRecintos('GAZELA', 2);
        const recintos = new RecintosZoo().listarRecintos();

        expect(resultado.erro).toBeFalsy();

        let animaisCarnívoros = [];
        
        recintos.forEach((recinto) => {
            if(resultado.recintosViaveis.some((recintoViavel) => recintoViavel.charAt(8) == recinto.numeroDoRecinto)){
                recinto.animaisExistentes.some((animal) => {
                    if(animal.habitoAlimentar === 'carnivoro'){
                        animaisCarnívoros = [...animaisCarnívoros, animal.especie]
                    }
                })
            }
        });

        expect(animaisCarnívoros.length).toBe(0);
    });

    test('Deve Listar todos os recintos diponíveis', () => {
        const recintos = new RecintosZoo().listarRecintos();
        expect(recintos[0]).toEqual({
            numeroDoRecinto: 1,
            bioma: [ 'savana' ],
            capacidadeTotal: 10,
            areasLivres: 7,
            animaisExistentes: [ 'macaco', 'macaco', 'macaco' ]
          });
        expect(recintos.length).toBe(5);
    });
});

