import '../App.css';
import { useState } from 'react';
import EditForm from './editform';

function Item({ name,ID,loadItems }) {
  const [showForm, setShowForm] = useState(false);

  const handleEdit = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className='item'>
        {name}
        <button className='editformbutton' onClick={handleEdit}>Upravit</button>
      </div>

      {showForm && (
        <EditForm onClose={handleClose} ID={ID} loadItems={loadItems}  />
      )}
    </div>
  );
}

export default Item;
