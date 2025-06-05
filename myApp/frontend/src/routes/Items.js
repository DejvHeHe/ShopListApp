// routa pro itemy
import React, { useEffect, useState } from "react";
import '../App.css';

import Item from "../components/item";
import Header from "../components/header";

function Items({ dataItems,loadItems,loadData}) {
  
  

 

  return (
    <div className="itemRoute">
      <header>
        <Header loadData={loadData} loadItems={loadItems}/>
      </header>
      <div className="dashboard">
      
      <h2>Položky</h2>
      {dataItems.map((item, index) => (
          <Item name={item.name} ID={item._id}loadItems={loadItems}/> 
        ))}
      
    </div>
    </div>
    
    
  );
}

export default Items;
