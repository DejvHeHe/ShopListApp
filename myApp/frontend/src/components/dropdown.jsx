import '../App.css'; 
import React, { useState } from 'react';
import ItemComponent from './shoplistitem';
import AddForm from './addform'; 
import DeleteButton from './deletebutton';

import { deleteShopList } from '../api';

function ShopDropdown({ name, items, loadData, data, ID, loadItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleAddForm = (e) => {
    e.stopPropagation(); // Prevent closing the dropdown
    setShowForm(true);
  };

  return (
    <div className="dropdown-container">
      {/* Replacing button with div to avoid nesting issues */}
      <div onClick={handleToggle} className="dropdown-toggle">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="addbutton" onClick={handleAddForm}>
            Přidat položku
          </button>
          <span>{name}</span>
          <DeleteButton deletefunction={deleteShopList} loadData={loadData} ID={ID} />
        </div>
        <span className="arrow">{isOpen ? '▼' : '►'}</span>
      </div>

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
            loadItems={loadItems}
          />
        </div>
      )}
    </div>
  );
}

export default ShopDropdown;
