import React from 'react';
import ReactDOM from 'react-dom';
import Vehicles from './Vehicles';
import {shallow} from 'enzyme';


describe('<Vehicles/> test cases',()=>{
  const props = {
    vehicles:   [{"name":"Space pod","total_no":2,"max_distance":200,"speed":2},{"name":"Space rocket","total_no":1,"max_distance":300,"speed":4},{"name":"Space shuttle","total_no":1,"max_distance":400,"speed":5},{"name":"Space ship","total_no":2,"max_distance":600,"speed":10}],
    onVehicleChange : function(){},
    groupId : 0
  };
  const vehicles = shallow(<Vehicles {...props}/>);
  it('should match the snapshot', () => {
    expect(vehicles.html()).toMatchSnapshot();
  });

  it('it should have all the options provided by props', () => {
    expect(vehicles.find('input[type="radio"]').length).toEqual(4);
  });

  it('it should have proper planets value', () => {
    expect(vehicles.find('input[type="radio"]').at(0).props().value).toEqual('Space pod');
    expect(vehicles.find('input[type="radio"]').at(1).props().value).toEqual('Space rocket');
  });

  it('Radio button should be enable by default ', () => {
    expect(vehicles.find('input[type="radio"]').at(0).props().disabled).toBeFalsy();
    expect(vehicles.find('input[type="radio"]').at(1).props().disabled).toBeFalsy();
    expect(vehicles.find('input[type="radio"]').at(2).props().disabled).toBeFalsy();
    expect(vehicles.find('input[type="radio"]').at(3).props().disabled).toBeFalsy();
  });
})
