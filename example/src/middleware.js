import more from 'morex'

more.middleware(function(actionName, data, prevData) {
  console.log(actionName, data, prevData)
})