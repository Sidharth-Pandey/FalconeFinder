import React from 'react';


const  Vehicles = ({vehicles, groupId, onVehicleChange})=>{
  const radioElememt = vehicles.map((vehicle)=>
  <div key = {vehicle.name} className = { (vehicle.total_no) ? '': 'disabled'}>
    <input type="radio" name = {groupId} id ={groupId} value={vehicle.name} onClick={onVehicleChange}
      disabled={!vehicle.total_no}/>
    <label>{vehicle.name}({vehicle.total_no})</label>
  </div>
);
return (
  <div className = "vehicleList">
    {radioElememt}
  </div>
);

}

export default Vehicles
