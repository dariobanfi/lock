import PropTypes from 'prop-types';
import React from 'react';

export default class GlobalMessage extends React.Component {
  render() {
    const { message, type } = this.props;
    const className = `auth0-global-message auth0-global-message-${type}`;
    return (
      <div className={className}>
        <span className="animated fadeInUp">{message}</span>
      </div>
    );
  }
}

GlobalMessage.propTypes = {
  message: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['error', 'success']).isRequired
};
