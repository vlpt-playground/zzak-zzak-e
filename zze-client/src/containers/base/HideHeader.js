import { Component } from 'react';
import { hideHeader, showHeader } from 'store/modules/base';
import { connect } from 'react-redux';

// 이 컴포넌트를 렌더링하는 곳에서는 헤더가 사라지고
// 이 컴포넌트가 사라지면 다시 나타나게됨
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
