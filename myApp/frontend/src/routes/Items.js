// routa pro itemy
import React, { useEffect, useState } from "react";
import '../App.css';

import Item from "../components/item";

function Items({ dataItems,loadItems}) {
  

 

  return (
    <div className="dashboard">
      <h2>Položky</h2>
      {dataItems.map((item, index) => (
          <Item name={item.name} ID={item._id}loadItems={loadItems}/> 
        ))}
      
    </div>
  );
}

export default Items;
