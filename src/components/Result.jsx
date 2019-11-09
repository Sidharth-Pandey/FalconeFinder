import React from 'react';
import {Component} from 'react';

class Result extends Component {
  startAgain = ()=>{
    this.props.history.push('/');
  }

  render () {
    return(
      <div className=" result container-fluid">
        <div className = "row">
          <div className="col-md-12">
            <nav className = "navbar bg-dark fixed-top"></nav>
          </div>
        </div>
        <div className="row">
          <div className = "col text-center">
            <label className = "resultMessage">{(this.props.location.state.falcanoResponse.status === 'success') ? `Success!
              Congratulatio on finding Falcone. King Shan is mighty pleased  `:`Sorry We could not find Falcone`}
            </label>
          </div>
        </div>
        {
          (this.props.location.state.falcanoResponse.status === 'success') ?
          (<div>
            <div className = "timeInfo row">
              <div className = "col text-center">
                <label className="mr-2" >Time Taken :</label>
                <label >{this.props.location.state.timeTaken}</label>
              </div>
            </div>
            <div className = "planetInfo row">
              <div className = "col text-center">
                <label className="mr-2">Planet Found :</label>
                <label >{this.props.location.state.falcanoResponse.planet_name}</label>
              </div>
            </div>
          </div>) : null
        }
        <div className = "row">
          <div className = "col text-center">
            <button className = "startButton btn btn-primary" onClick={this.startAgain}>Start Again</button>
          </div>
        </div>
        <div className = "row">
          <div className="col-md-12">
            <nav className = "navbar bg-dark fixed-bottom"></nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Result;
