export const getStudiosState = ({studios}) => ({
  fetched: studios.fetched,
  fetching: studios.fetching,
  error: studios.error
});

export const getTransactionState = ({studios}) => ({
  errorTransaction: studios.errorTransaction,
  fetchedTransaction: studios.fetchedTransaction,
  fetchingTransaction: studios.fetchingTransaction
});

export const getStudiosData = ({studios}) => ({
  studios: studios.studios
});
