import React from 'react';
import {Component} from 'react';

class Result extends Component {
  startAgain = ()=>{
    this.props.history.push('/');
  }

  render () {
    return(
      <>
      <div className = "App-header">
        <label> Find FalCone Result!</label>
      </div>
      <div className = "result">
        <label className = "resultMessage">{(this.props.location.state.falcanoResponse.status === 'success') ? `Success!
          Congratulatio on finding Falcone. King Shan is mighty pleased  `:`Sorry We could not find Falcone`}</label>
        {
          (this.props.location.state.falcanoResponse.status === 'success') ?
          (<div>
            <div className = "timeInfo">
              <label >Time Taken :</label>
              <label >{this.props.location.state.timeTaken}</label>
            </div>
            <div className = "planetInfo">
              <label>Planet Found :</label>
              <label >{this.props.location.state.falcanoResponse.planet_name}</label>
            </div>
          </div>) : null
        }
        <button className = "startButton" onClick={this.startAgain}>Start Again</button>
      </div>
      <div className = "App-footer"></div>
      </>
  );
}
}

export default Result;
