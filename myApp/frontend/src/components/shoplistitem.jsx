import React, { useState, useEffect } from 'react';
import '../App.css';

import { uncheck } from '../api';

function Item({ name, count, state, shopList, loadData, ID }) {
  const [isActive, setActive] = useState(state); // default je stav z backendu

  useEffect(() => {
    setActive(state); // synchronizace, když se props změní
  }, [state]);

  const handleChange = async () => {
    console.log("Kliknutí na checkbox");

    try {
      // Optimistická změna UI
      
      console.log(ID)
      const data = { 
        ID:ID,
        shopList:shopList 
        };
      console.log(JSON.stringify(data))
      await uncheck(data); // zavolá API

      await loadData(); // reloaduje data
    } catch (error) {
      console.error("Chyba při aktualizaci položky:", error);
      setActive(true); // revert v případě chyby
    }
  };

  return (
    <div className="dropdown-item">
      <label>
        <input
          type="checkbox"
          checked={!isActive} // checkbox zaškrtnutý pokud NENÍ aktivní (přeškrtnutý)
          onChange={handleChange}
          disabled={!isActive} // disable pokud už je hotový
          className="custom-checkbox"
        />
        <span className={isActive ? "normal-text" : "crossed-out"}>
          {name} | Počet: {count || "1"}
        </span>
      </label>
    </div>
  );
}


export default Item;
