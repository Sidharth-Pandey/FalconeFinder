import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';

describe('<App/> test cases',()=>{
  let state;
  const app = shallow(<App/>),
  instance = app.instance();
  beforeEach(() => {
    state = {
      vehicleList : [{"name":"Space pod","total_no":2,"max_distance":200,"speed":2},{"name":"Space rocket","total_no":1,"max_distance":300,"speed":4},{"name":"Space shuttle","total_no":1,"max_distance":400,"speed":5},{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}],
      planetList : [{"name":"Donlon","distance":100},{"name":"Enchai","distance":200},{"name":"Jebing","distance":300},{"name":"Sapir","distance":400},{"name":"Lerbin","distance":500},{"name":"Pingasor","distance":600}],
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
    };
  });
  it('check rending planetVehicleGroup', () => {
    expect(app.find('PlanetVehicleGroup').length).toEqual(4);
  });

  it('check rending timeContainer', () => {
    expect(app.find('.timeContainer').length).toEqual(1);
  });

  it('check next select box should not have previously selected planet', () =>{
    state.destinations[0].selectedPlanet = 'Donlon'
    const app = shallow(<App/>);
    const planetList = app.instance().updatePlanetList(state, 0).destinations[1].planets;
    expect(planetList).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "name":"Donlon",
          "distance":100
        })
      ])
    );
  });

  it('validate total Time taken by  vehicles', ()=>{
    state.destinations[0].selectedPlanet = 'Donlon';
    state.destinations[0].selectedVehicle = 'Space pod';
    const instance = app.instance();
    const newState = instance.calculateTimeTaken(state,0);
    expect(newState.totalTimeTaken).toEqual(50);
  });

  it('validate total Time taken by  vehicles test2', ()=>{
    state.destinations[0].selectedPlanet = 'Donlon';
    state.destinations[0].selectedVehicle = 'Space pod';
    state.destinations[0].timeTaken = 50;
    state.destinations[1].selectedPlanet = 'Jebing';
    state.destinations[1].selectedVehicle = 'Space shuttle';
    const newState = instance.calculateTimeTaken(state,1);
    expect(newState.totalTimeTaken).toEqual(110);
  });

  it('validate vehicle count value after selection', ()=>{
    state.destinations[0].selectedPlanet = 'Donlon';
    state.destinations[0].selectedVehicle = 'Space pod';
    state.destinations[1].selectedPlanet = 'Jebing';
    state.destinations[1].selectedVehicle = 'Space pod';
    const newState = instance.updateVehicleList(state);
    expect(newState.filteredVehicleList.find((item)=> item.name === 'Space pod').total_no).toEqual(0);
  });

  it('validate find Falcano button disability', ()=>{
    expect(app.find('button').props().disabled).toBeTruthy();
  })

})
