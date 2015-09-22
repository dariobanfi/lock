import React from 'react';
import ConfirmationPane from '../lock/confirmation_pane';
import CredPane from '../lock/cred_pane';
import VcodeInput from '../cred/vcode_input';
import { back, changeVcode, close } from './actions';
import * as l from '../lock/index';
import * as c from '../cred/index';
import * as m from './index';
import { isSmallScreen } from '../utils/media_utils';

export default class AskVcode extends React.Component {
  render() {
    const { className, cred, lock } = this.props;
    const auxiliaryPane = m.signedIn(lock) ?
      <SignedInConfirmation key="auxiliarypane" lock={lock} /> : null;

    return (
      <CredPane lock={lock} auxiliaryPane={auxiliaryPane} className={className} backHandler={::this.handleBack} ref="cred">
        <div className="auth0-lock-form auth0-lock-passwordless">
          <h2>Enter the code</h2>
          <p>
            Pleace check your {cred}<br />
            You've received a message from us<br />
            with your passcode.
          </p>
          <VcodeInput value={c.vcode(lock)}
            isValid={!c.visiblyInvalidVcode(lock) && !l.globalError(lock)}
            onChange={::this.handleVcodeChange}
            autoFocus={!isSmallScreen()}
            disabled={l.submitting(lock)}
            tabIndex={l.tabIndex(lock, 1)} />
        </div>
      </CredPane>
    );
  }

  handleVcodeChange(e) {
    e.preventDefault();
    changeVcode(l.id(this.props.lock), e.target.value);
  }

  handleBack() {
    back(l.id(this.props.lock), {clearCred: ["vcode"]});
  }

  componentWillSlideIn(...args) {
    return this.refs.cred.componentWillSlideIn(...args);
  }

  componentDidSlideIn(...args) {
    return this.refs.cred.componentDidSlideIn(...args);
  }

  componentWillSlideOut(...args) {
    return this.refs.cred.componentWillSlideOut(...args);
  }
}

class SignedInConfirmation extends React.Component {
  render() {
    return (
      <ConfirmationPane closeHandler={::this.handleClose}>
        <p>Thanks for signing in.</p>
      </ConfirmationPane>
    )
  }

  handleClose() {
    close(l.id(this.props.lock));
  }
}