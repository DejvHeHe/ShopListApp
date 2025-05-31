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
        className="flex items-center gap-2 p-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        <FaTrash />
        Delete
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
