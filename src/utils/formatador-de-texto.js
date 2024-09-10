export const formatadorDeTexto = (texto) => {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z ]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
}