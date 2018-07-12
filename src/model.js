export default (() => {
  const models = []
  return model => {
    if (model) {
      models.push(model)
    }
    return models
  }
})()