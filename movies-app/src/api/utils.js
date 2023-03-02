export const buildQueryParams = obj => {
    return Object.entries(obj)
        .filter(pair => pair[1])
        .map(pair => pair.map(encodeURIComponent).join('='))
        .join('&');
};