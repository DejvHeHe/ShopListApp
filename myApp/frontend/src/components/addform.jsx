import React, { useState, useEffect } from "react";
import { fetchItem, addItem } from "../api";

function AddForm({ loadData, onClose, shopList}) {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [count, setCount] = useState(1);
  const [items, setItems] = useState([]);
  const [labelText, setText] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = {
        ID: selectedItemId,
        shopList: shopList,
        count: count,
      };

      const result = await addItem(data);

      if (result.success) {
        loadData();
        onClose(); // zavře formulář po úspěchu
      } else {
        setText(result.message || "Chyba při přidávání položky.");
      }
    } catch (error) {
      console.log("Problem with sending data", error);
      setText("Neočekávaná chyba při odesílání dat.");
    }
  }

  async function loadItems() {
    try {
      const fetchedItems = await fetchItem();
      setItems(fetchedItems);
    } catch (error) {
      console.log("Problem with fetching items", error);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className='modalwindow2'>
      <form onSubmit={handleSubmit}>
      <label>Vyber položku co chceš přidat:</label>
        
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          required
        >
          <option value="">Vyberte položku*</option>
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <label>Počet:</label>
        
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          min={1}
        />

        <button className="formbutton" type="submit">
          Potvrdit
        </button>
        <button className="formbutton" type="button" onClick={onClose}>
          Zavřít
        </button>
        
        {labelText && <label style={{ color: "black" }}>{labelText}</label>}
      </form>
    </div>
  );
}

export default AddForm;
