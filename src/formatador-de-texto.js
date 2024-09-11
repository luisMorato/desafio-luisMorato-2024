//Formata os textos para eliminar caracteres especiais, espaços em branco, números, e acentos
export const formatadorDeTexto = (texto) => {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
}