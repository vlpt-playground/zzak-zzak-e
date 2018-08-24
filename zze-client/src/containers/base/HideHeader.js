import { Component } from 'react';
import { hideHeader, showHeader } from 'store/modules/base';
import { connect } from 'react-redux';

class HideHeader extends Component {
  constructor(props) {
    super(props);
    props.hideHeader();
  }
  componentWillUnmount() {
    this.props.showHeader();
  }
  render() {
    return null;
  }
}

export default connect(
  () => ({}),
  {
    hideHeader,
    showHeader,
  }
)(HideHeader);
