import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import {
  DetailsModal,
  Text,
  Button,
} from '../../components';
import styles from './styles';

export default class SetupWallet extends PureComponent {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      theme: this.props.theme ? this.props.theme : this.context.theme,
    };
  }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) { }

  _open = () => {
    this.detailsModal._open();
  }

  _close = () => {
    this.detailsModal._close();
  }

  _continue = () => {
    this._close();
    this.props.onContinue();
  }

  _continuePublic = () => {
    this._close();
    this.props.onContinuePublic();
  }

  render() {
    const { type } = this.context;

    const renderHotView = () => (
      <DetailsModal
        ref={(c) => { this.detailsModal = c; }}
        title="Setup your Hot Wallet"
      >
        <View style={styles.container}>
          <Text style={styles.text}>
              To setup your hot wallet you need to have the COINiD Vault app installed on this device.
          </Text>
          <Button big onPress={this._continue}>
              Continue with COINiD Vault
          </Button>
          <Button big link onPress={this._continuePublic} style={styles.manualPublic} textStyle={styles.manualPublicText}>
              Or enter public key manually
          </Button>
        </View>
      </DetailsModal>
    );

    const renderColdView = () => {
      const buttonText = 'Continue with COINiD Vault';
      const disableButton = false;

      return (
        <DetailsModal
          ref={(c) => { this.detailsModal = c; }}
          title="Setup your Cold Wallet"
        >
          <View style={styles.container}>
            <Text style={styles.text}>
                To setup your cold wallet you need to have the COINiD Vault app installed on a separate offline device.
            </Text>
            <Button big onPress={this._continue} disabled={disableButton}>
                {buttonText}
            </Button>
            <Button big link onPress={this._continuePublic} style={styles.manualPublic} textStyle={styles.manualPublicText}>
                Or enter public key manually
            </Button>
          </View>
        </DetailsModal>
      );
    };

    return (type === 'hot' ? renderHotView() : renderColdView());
  }
}

SetupWallet.contextTypes = {
  theme: PropTypes.string,
  type: PropTypes.string,
};

SetupWallet.childContextTypes = {
  theme: PropTypes.string,
};

SetupWallet.propTypes = {
  theme: PropTypes.string,
};

SetupWallet.defaultProps = {
  theme: 'light',
};
