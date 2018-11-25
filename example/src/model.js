import more from 'morex'

more.model({
  name: 'app',
  initialState: {
    name: 'MOREX'
  },
  reducers: {
    setName(state, name) {
      return { ...state, name }
    }
  }
})