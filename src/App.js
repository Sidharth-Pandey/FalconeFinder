import React from 'react';
import {Component} from 'react';
import './App.css';
import PlanetVehicleGroup from './components/PlanetVehicleGroup';
import ErrorPopUp from './components/ErrorPopup'
import postData from './utils/postUtil'


class App extends Component {
  constructor(){
    super();
    this.state = {
      vehicleList : [],
      planetList : [],
      filteredVehicleList : [],
      destinations: [
        {
          planets: [],
          selectedPlanet: '',
          selectedVehicle:'',
          timeTaken : 0,
          id: '0'
        },
        {
          planets: [],
          selectedPlanet: '',
          selectedVehicle:'',
          timeTaken : 0,
          id: '1'
        },
        {
          planets: [],
          selectedPlanet: '',
          selectedVehicle:'',
          timeTaken : 0,
          id: '2'
        },
        {
          planets: [],
          selectedPlanet: '',
          selectedVehicle:'',
          timeTaken : 0,
          id: '3'
        }
      ],
      totalTimeTaken: 0,
      showErrorPopUp: false,
      errorMessage : ''
    }
    this.findFalcone = this.findFalcone.bind(this);
  }

  /**
  * Fetch all data for planets and vehicles
  *@method componentDidMount
  */
  componentDidMount = ()=>{
    let state = Object.assign({},this.state),
    fetchPlanet,
    fetchVehicle;
    fetchPlanet = fetch('https://findfalcone.herokuapp.com/planets')
    .then(res => res.json())
    .then(data => {
      state.planetList = data;
      state.destinations[0].planets = data;
    }).catch(err => {
       console.log("Error::"+err);
    });
    fetchVehicle = fetch('https://findfalcone.herokuapp.com/vehicles')
    .then(res => res.json())
    .then(data => {
      state.vehicleList =  data;
      state.filteredVehicleList = data;
    }).catch(err => {
      console.log("Error::"+err);
    });
    Promise.all([fetchPlanet, fetchVehicle]).then(()=>{
      this.setState(state);
    }).catch(err => {
      console.log("Error::"+err);
    });
  }

  /**
  * populate next planet select box
  *@method updatePlanetList
  *@param state state object
  *@param index id of selected planet group
  */
  updatePlanetList = (state, index)=> {
    let selectedPlanetList  = [];
    state.destinations.forEach((item)=>{
      if (item.selectedPlanet !=='' && item.selectedPlanet !== 'select') {
        selectedPlanetList.push(item.selectedPlanet);
      } });
      if(index<3){
        state.destinations[index+1].planets = state.planetList.filter((item)=> selectedPlanetList.indexOf(item.name) === -1);
        state.destinations[index+1].selectedPlanet = '';
        state.destinations[index+1].selectedVehicle = '';
      }
      return state;
    }

    /**
    * calculate total time taken by vehicles
    *@method calculateTimeTaken
    *@param state state objects
    *@param id group id
    */
    calculateTimeTaken = (state, id)=>{
      let planet =  state.destinations[id].selectedPlanet,
      planetItems = state.planetList.find((item)=> { return planet=== item.name}),
      distance = (planetItems)? planetItems.distance : 0,
      vehicleName = state.destinations[id].selectedVehicle,
      vehicleObj = state.vehicleList.find((element)=> element.name === vehicleName);
      state.destinations[id].timeTaken = (vehicleObj) ? distance/vehicleObj.speed : 0;
      state.totalTimeTaken = state.destinations.reduce((total, item)=> {return total = total + item.timeTaken}, 0);
      return state;
    }

    /**
    * filtering the vehicles list based on uesr selection
    *@method updateVehicleList
    *@param state state object
    */
    updateVehicleList = (state) =>{
      let listSelectedVeicle = new Map(),
      len  =  state.destinations.length
      for(let i=0; i<len; i++) {
        if(listSelectedVeicle.has(state.destinations[i].selectedVehicle)){
          let value = listSelectedVeicle.get(state.destinations[i].selectedVehicle);
          listSelectedVeicle.set(state.destinations[i].selectedVehicle, value+1);
        } else {
          listSelectedVeicle.set(state.destinations[i].selectedVehicle,1);
        }
      }
      state.filteredVehicleList =  state.vehicleList.map((item)=> {
        let clonedItem = Object.assign({},item);
        if (listSelectedVeicle.has(clonedItem.name)) {
          clonedItem.total_no = clonedItem.total_no - listSelectedVeicle.get(item.name) ;
        }
        return clonedItem;
      });
      return state;
    }

    /**
    * To check all selection is done before user perform final operation
    *@method isSelectionComplete
    */
    isSelectionComplete = ()=> {
      return this.state.destinations.reduce((accumalate, item)=> accumalate && item.selectedVehicle, true);
    }

    /**
    * perform operation on vehicle selection
    *@method onVehicleChange
    *@param e event
    */
    onVehicleChange = (e)=>{
      let id = parseInt(e.target.id),
      newState = Object.assign({}, this.state);
      newState.destinations[id].selectedVehicle = e.currentTarget.value;
      newState = this.updateVehicleList(newState);
      newState = this.calculateTimeTaken(newState, id);
      this.setState(newState);
    }

    /**
    *perform action when planet selection change
    *@method onPlanetChange
    *@param e select event
    */
    onPlanetChange = (e) => {
      let index = parseInt(e.currentTarget.id),
      newState = Object.assign({}, this.state);
      newState.destinations[index].selectedPlanet = (e.currentTarget.value === 'select') ? '' : e.currentTarget.value;
      if(e.currentTarget.value === 'select') {
        newState.destinations[index].selectedVehicle = '';
        }
      newState = this.updatePlanetList(newState, index);
      newState = this.updateVehicleList(newState);
      newState = this.calculateTimeTaken(newState, index);
      this.setState(newState);
    }

    /**
    * Creating dataset for finding falcone post api
    *@method getFalconeData
    */
    getFalconeData= ()=>{
      let data   = {},
      selectedPlanets = [],
      selectedVehicles = [];
      this.state.destinations.forEach((item)=>{
        selectedPlanets.push(item.selectedPlanet);
        selectedVehicles.push(item.selectedVehicle);
      })
      data.planet_names = selectedPlanets;
      data.vehicle_names = selectedVehicles;
      return data;
    }

    /**
    * Find Falcone, depending on result navigate to different screen
    *@method findFalcone
    */
    findFalcone = async function(){
      let tokenData = await postData('https://findfalcone.herokuapp.com/token', {}),
      falcanoData = this.getFalconeData(),
      falcanoResponse;
      falcanoData.token = tokenData.token;
      falcanoResponse = await postData('https://findfalcone.herokuapp.com/find', falcanoData);
      if(falcanoResponse.error){
        this.setState(Object.assign({}, this.state, {showErrorPopUp: true, errorMessage: falcanoResponse.error}))
      } else{
        this.props.history.push({pathname: '/result', state: {falcanoResponse: falcanoResponse, timeTaken: this.state.totalTimeTaken}});
      }
    }

    /**
    *@method handleClosePopup
    */
    handleClosePopup = (e)=>{
      this.setState(Object.assign({}, this.state, {showErrorPopUp: false}))
    }

    /**
    *@method render
    */
    render () {
      let planetVehicleElement = this.state.destinations.map((item)=> {
        return(
          <PlanetVehicleGroup planets= {item.planets}
            vehicles = {this.state.filteredVehicleList}
            key = {item.id}
            groupId = {item.id}
            onPlanetChange = {this.onPlanetChange}
            onVehicleChange = {this.onVehicleChange}
            isVisible = {item.selectedPlanet}>
          </PlanetVehicleGroup>
        )
      });
      return (
        <>
        <div className="App">
          <div className = "App-header">
            <label> Find FalCone !</label>
          </div>
          <h2>Select planets you want to search in:</h2>
          <div className= "planetContainer">
            {planetVehicleElement}
            <div className="timeContainer">
              <label>Total Time:</label>
              <label id= "totalTime">{this.state.totalTimeTaken}</label>
            </div>
          </div>
          <button disabled={!(this.isSelectionComplete())} onClick= {this.findFalcone}>Find FalCone</button>
          <div className = "App-footer"></div>
        </div>
        {(this.state.showErrorPopUp) ?
          <ErrorPopUp handleClosePopup= {this.handleClosePopup} errorMessage={this.state.errorMessage}></ErrorPopUp>
          : null
        }
        </>
    );
  }
}

export default App;
