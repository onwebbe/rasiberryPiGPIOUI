import React from 'react';

class GPIOPin extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      pinObject: this.props.pinObject,
      position: this.props.position
    }
  }
  componentDidMount() {
    // await this._getAllPerson();
    // await this._getPersonById(this.props.personId);
  }
  render() {
    var pinBackColor = 'green';
    if (this.state.pinObject.pinStatus == 0) {
      pinBackColor = 'green'
    } else {
      pinBackColor = 'red'
    }
    var label = <div style={{display: 'inline-block'}}>{this.state.pinObject.Name}</div>
    return (
      <div style={{display: 'flex', flexFlow: 'row', justifyContent: this.state.position == 'left'?'flex-end':'flex-start' }}>
        {this.state.position == 'left'?label:null}
        <div style={{width: '20px', height: '20px', margin: '3px 10px', backgroundColor: pinBackColor}}>
          <span style={{color: 'white'}}>{this.state.pinObject.mode.substring(0,2)}</span>
        </div>
        {this.state.position == 'right'?label:null}
      </div>
    )
  }
}

export default GPIOPin;