import React, { Component, PropTypes } from 'react';

import Shifter from 'shifter';
var myShift = new Shifter();

const Shift = React.createClass({
  getInitialState() {
    return {
      mode: 'decrypt',
    }
  },

  onCipherTextChange() {
    this.update();
  },

  onKeyTextChange() {
    myShift.setKey(this.keyText.value);
    this.update();
  },

  onClearTextChange() {
    this.update();
  },

  onModeChange(e) {
    var input = e.target;
    if (input.tagName !== 'INPUT') {
      input = input.querySelectorAll('input')[0];
    }
    this.setState({
      mode: input.value
    }, () => {this.update()});
  },

  update() {
    this.clearText.value = myShift[this.state.mode](this.cipherText.value);
  },

  render() {

    var encryptChecked = this.state.mode === 'encrypt',
        decryptChecked = this.state.mode === 'decrypt';


    return (
      <form>

      <div className="btn-group pull-right" data-toggle="buttons">
        <label className={(encryptChecked && 'active') + ' btn btn-primary'}
                onClick={this.onModeChange}>
          <input  type="radio"
                  name="mode"
                  autoComplete="off"
                  value="encrypt"/> Encrypt
        </label>
        <label className={(decryptChecked && 'active') + ' btn btn-primary'}
              onClick={this.onModeChange} >
          <input
            type="radio"
            name="mode"
            autoComplete="off"
            value="decrypt"/> Decrypt
        </label>
      </div>

        <div className="form-group">
          <label htmlFor="cipher-text">Input One <small>Clear/Cipher Text</small></label>
          <input
            onKeyUp={this.onCipherTextChange}
            ref={ (ref) => this.cipherText = ref }
            type="text"
            className="form-control monospace"
            id="cipher-text"
            value={this.state.cipherText}
            placeholder="Cipher Text" />
        </div>
        <div className="form-group">
          <label htmlFor="key-text">Input Two <small>Key, Clear Text Guess</small></label>
          <input
            onKeyUp={this.onKeyTextChange}
            ref={ (ref) => this.keyText = ref }
            type="text"
            className="form-control monospace"
            id="key-text"
            value={this.state.keyText}
            placeholder="Key" />
        </div>
        <div className="form-group">
          <label htmlFor="clear-text">Output</label>
          <input
            disabled
            ref={ (ref) => this.clearText = ref }
            type="text"
            className="form-control monospace"
            id="clear-text"
            value={this.state.clearText}
            placeholder="Clear Text" />
        </div>
      </form>
    );
  }
});

export default Shift;
