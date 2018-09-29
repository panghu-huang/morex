import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { actions } from "./actions";

class RouterWrapper extends PureComponent {
  constructor(props) {
    super(props);
    actions.routing = props.history;
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(RouterWrapper);
