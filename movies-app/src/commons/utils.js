export const showFormatedPrice = (price) => {
  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  });
  return formatter.format(price);
};
