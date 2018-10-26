# Morex

基于React新Context Api编写的状态管理框架。使用方法用mirrorx一致

## 快速开始

```sh
$ yarn add morex
$ yarn start
```

### `index.js`

```js
import React from "react";
import { render } from "react-dom";
import more, { actions, connect, AppProvider } from "morex";

more.model({
  name: "app",
  initialState: 0,
  reducers: {
    increment(state) {
      return state + 1;
    },
    decrement(state) {
      return state - 1;
    }
  },
  effects: {
    async incrementAsync() {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      actions.app.increment();
    }
  }
});

const App = connect(state => {
  return { count: state.app };
})(props => (
  <div>
    <h1>{props.count}</h1>
    <button onClick={() => actions.app.decrement()}>-</button>
    <button onClick={() => actions.app.increment()}>+</button>
    <button onClick={() => actions.app.incrementAsync()}>+ Async</button>
    <button onClick={() => actions.routing.push('/other-page')}>to other page</button>
  </div>
));

render((
  <AppProvider>
    <App />
  </AppProvider>
), document.querySelector(".app-container"));
```


