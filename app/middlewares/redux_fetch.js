const fetch = store => next => action => {
  const argument = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
  if(!argument){
    return next(action);
  }
  fetch(argument)
  let result = next(action);
  return result
}

export default fetch;