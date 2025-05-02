import React from 'react';
import '../App.css';
function Item({name,count,state})
{
    return(
        <div className="dropdown-item">
        <label>
          <input type="checkbox" value={state} className="custom-checkbox" />
          {name} | Počet: {count}
        </label>
      </div>
      
    )
}
export default Item;