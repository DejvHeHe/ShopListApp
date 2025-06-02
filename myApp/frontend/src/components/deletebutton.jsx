import React, { useState } from "react";
import "../App.css";
import DeleteForm from "./deleteform";
import { FaTrash } from "react-icons/fa";

function DeleteButton({ deletefunction, loadData,ID,loadItems }) {
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent dropdown toggle
    setShowForm(true);
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="iconbutton"
      >
        <FaTrash />
       
      </button>

      {showForm && (
        <DeleteForm
          deletefunction={deletefunction}
          loadData={loadData}
          onClose={() => setShowForm(false)}
          ID={ID} 
          loadItems={loadItems}
        />
      )}
    </div>
  );
}

export default DeleteButton;
