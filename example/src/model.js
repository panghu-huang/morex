import morex from '../../src'

morex.model({
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