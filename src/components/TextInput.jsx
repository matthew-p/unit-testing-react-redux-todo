import React from 'react';

export default class TextInput extends React.Component {
    cancelEditing() {
        this.setState({value: props.text});
        return this.props.cancelEditing(this.props.itemId);
    }

    _handleKeyDown(e) {
        switch (e.key) {
            case 'Enter':
                return this.props.doneEditing(this.props.itemId, this.state.value);
            case 'Escape':
                return this.props.cancelEditing();
        }
    }

    _handleOnBlur(e) {
        return this.cancelEditing();
    }

    _handleOnChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return <input className="edit"
                      autoFocus={true}
                      type="text"
                      value={this.state.value}
                      onChange={this._handleOnChange.bind(this)}
                      ref="itemInput"
                      onKeyDown={this._handleKeyDown.bind(this)}
                      onBlur={this._handleOnBlur.bind(this)} />
    }
};