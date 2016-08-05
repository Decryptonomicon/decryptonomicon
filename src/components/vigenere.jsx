import React, { Component, PropTypes } from 'react';



var Shifter = (function (){
  // ABC's
  var charset = [];
  for (var i = 65; i <= 90; i++) {
    charset.push(String.fromCharCode(i));
  }

  function Shifter (key) {
    this.setKey(key);
  }

  Shifter.prototype.setKey = function (key) {
    key = key || "";
    this._key = key.toUpperCase().replace(/[^A-Z]/g, '');
  };

  Shifter.prototype.encrypt = function (clearText) {
    var ctArray = clearText.toUpperCase().replace(/[^A-Z]/g, '').split(''),
        ctArrayLen = ctArray.length,
        cipherText = [],
        keyLength = this._key.length;

    for (var i = 0; i < ctArrayLen; i++) {
      var clearTextCharIndex = charset.indexOf(ctArray[i]) ,
          keyIndex = i % keyLength,
          keyCharIndex = charset.indexOf(this._key[keyIndex]) ;

      // +1 since we are doing zero based character values
      cipherText.push(charset[(clearTextCharIndex + keyCharIndex) % charset.length]);
    }

    return normalize(cipherText, clearText);
  };

  Shifter.prototype.decrypt = function (cipherText) {

      var ctArray = cipherText.toUpperCase().replace(/[^A-Z]/g, '').split(''),
          ctArrayLen = ctArray.length,
          clearText = [],
          keyLength = this._key.length;

      for (var i = 0; i < ctArrayLen; i++) {
        var cipherTextCharIndex = charset.indexOf(ctArray[i]) ,
            keyIndex = i % keyLength,
            keyCharIndex = charset.indexOf(this._key[keyIndex]) ;

        // +1 since we are doing zero based character values
        clearText.push(charset[(charset.length + (cipherTextCharIndex - (keyCharIndex + 1))) % charset.length]);
      }

      return normalize(clearText, cipherText);
  };

  function normalize (input, outputFormat) {
    var output = [],
        outputFormat = outputFormat.split(""),
        ofLen = outputFormat.length,
        ii = 0;

    for(var i = 0; i < ofLen; i++) {
      var ofChar = outputFormat[i],
          ofUpper = ofChar.toUpperCase(),
          validChar = charset.indexOf(ofUpper) > -1,
          isUpperCase = ofUpper === ofChar;

      if (!validChar) {
        output.push(ofChar);
        continue;
      }

      if(!isUpperCase) {
        output.push(input[ii].toLowerCase());
      } else {
        output.push(input[ii]);
      }
      ii++;
    }

    return output.join("")
  }



  return Shifter;
})();



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
