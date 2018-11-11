export default (() => {
  const middlewares = []
  return middleware => {
    if(middleware) {
      middlewares.push(middleware)
    }
    return middlewares
  }
})()