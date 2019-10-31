import React from 'react';

const Planets = ({planets, onChange, groupId})=>{
  const optionElement = planets.map((planet)=>
  <option value={planet.name} key = {planet.name}>{planet.name} </option>
)
return(
  <select className="planet" onChange = {onChange} id= {groupId}>
    <option key= "default">select</option>
    {optionElement}
  </select>
);
}

export default Planets;
