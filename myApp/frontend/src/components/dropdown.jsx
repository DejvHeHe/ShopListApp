import '../App.css'; 
import React, { useState } from 'react';
import ItemComponent from './item';
import AddForm from './addform'; 

function ShopDropdown({ name, items, loadData, data,ID }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const [showForm, setShowForm] = useState(false);

  const handleAddForm = (e) => {
    e.stopPropagation(); // zabrání zavření při kliknutí na tlačítko
    setShowForm(true);
  };

  return (
    <div className="dropdown-container">
      <button onClick={handleToggle} className="dropdown-toggle">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="addbutton" onClick={handleAddForm}>Přidat položku</button>
          <span>{name}</span>
        </div>
        <span className="arrow">{isOpen ? '▼' : '►'}</span>
      </button>

      {isOpen && (
        <div>
          {items.map((item, index) => (
            <ItemComponent
              key={index}
              name={item.name}
              ID={item.ID}
              count={item.count}
              state={item.state}
              shopList={item.shopList}
              loadData={loadData}
            />
          ))}
        </div>
      )}
      {showForm && (
        <div>
          <AddForm 
            loadData={loadData}
            onClose={() => setShowForm(false)}
            shopList={ID}
          />
        </div>
      )}
    </div>
  );
}

export default ShopDropdown;
