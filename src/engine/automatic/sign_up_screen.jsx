import React from 'react';
import Screen from '../../lock/screen';
import { hasScreen } from '../../database/index';
import { signUp } from '../../database/actions';
import LoginSignUpTabs from '../../database/login_sign_up_tabs';
import { renderSignedUpConfirmation } from '../../database/signed_up_confirmation';
import SignUpPane from './sign_up_pane';
import SocialButtonsPane from '../../field/social/social_buttons_pane';
import * as l from '../../lock/index';
import PaneSeparator from '../../lock/pane_separator';

export default class SignUp extends Screen {

  constructor() {
    super("signUp");
  }

  submitHandler() {
    return signUp;
  }

  renderAuxiliaryPane(lock) {
    return renderSignedUpConfirmation(lock);
  }

  renderTabs() {
    return true;
  }

  render({model, t}) {
    const headerText = t("headerText") || null;
    const header = headerText && <p>{headerText}</p>;

    const tabs =
      <LoginSignUpTabs
        key="loginsignup"
        lock={model}
        loginTabLabel={t("loginTabLabel", {__textOnly: true})}
        signUpTabLabel={t("signUpTabLabel", {__textOnly: true})}
      />;

    const social = l.getEnabledConnections(model, "social").count() > 0
      && <SocialButtonsPane lock={model} t={t} signUp={true} />;

    const db =
      <SignUpPane
        emailInputPlaceholder={t("emailInputPlaceholder", {__textOnly: true})}
        model={model}
        passwordInputPlaceholder={t("passwordInputPlaceholder", {__textOnly: true})}
        usernameInputPlaceholder={t("usernameInputPlaceholder", {__textOnly: true})}
      />;

    const separator = social
      && <PaneSeparator>{t("separatorText")}</PaneSeparator>;

    return <div>{tabs}{header}{social}{separator}{db}</div>;
  }

}
