import React from 'react'
import Planets from './Planets.jsx';
import Vehicles from './Vehicles.jsx';

const  PlanetVehicleGroup = (props)=> (
  <div className = "planetVehcleGroup">
    <Planets planets= {props.planets} onChange={props.onPlanetChange} groupId = {props.groupId}></Planets>
    {props.isVisible ?
      <Vehicles vehicles = {props.vehicles} groupId = {props.groupId} onVehicleChange= {props.onVehicleChange}></Vehicles>
      : null  }
    </div>
  );

  export default PlanetVehicleGroup
