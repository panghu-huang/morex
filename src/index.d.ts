interface Model {
  name: string,
  initialState: object,
  reducers?: object,
  effects?: object
}

declare namespace morex {
  export function model(model: Model): void
  export const actions: any
  export const AppProvider: any
  export function connect(mapStateToProps: Function): Function
}

export = morex