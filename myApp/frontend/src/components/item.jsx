import '../App.css';
import { useState } from 'react';
import EditButton from './editbutton';
import DeleteButton from './deletebutton';
import { deleteItem, editItem } from '../api';

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
        <EditButton onClose={handleClose} ID={ID} loadItems={loadItems} editFunction={editItem}  />
        <DeleteButton ID={ID} loadItems={loadItems} deletefunction={deleteItem}/>

      </div>

      
        
      
    </div>
  );
}

export default Item;
