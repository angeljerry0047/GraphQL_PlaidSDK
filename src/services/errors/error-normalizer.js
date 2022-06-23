const errorNormalizer = (error) => {
  if (typeof error === 'string') {
    return error;
  } else if (typeof error === 'object') {
    console.log('Error: ', error);
    return 'There is an error here that needs to be normalized.';
  }
};

export default errorNormalizer;
