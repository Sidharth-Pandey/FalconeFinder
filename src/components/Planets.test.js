import React from 'react';
import ReactDOM from 'react-dom';
import Planets from './Planets';
import {shallow} from 'enzyme';


describe('<Planest/> test cases',()=>{
  const props = {
    planets:   [{"name":"Donlon","distance":100},{"name":"Enchai","distance":200},{"name":"Jebing","distance":300},{"name":"Sapir","distance":400},{"name":"Lerbin","distance":500},{"name":"Pingasor","distance":600}],
    onChange : function(){},
    groupId : 0
  };
  const planets = shallow(<Planets {...props}/>);
  it('should match the snapshot', () => {
    expect(planets.html()).toMatchSnapshot();
  });

  it('it should have selectBox', () => {
    expect(planets.find('.planet').length).toEqual(1);
  });

  it('it should have all the options provided by props', () => {
    expect(planets.find('option').length).toEqual(7); //including default option select
  });

  it('it should have proper planets value', () => {
    expect(planets.find('option').at(1).props().value).toEqual('Donlon');
    expect(planets.find('option').at(2).props().value).toEqual('Enchai');
  });

})
