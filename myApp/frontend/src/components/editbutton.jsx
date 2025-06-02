import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditForm from "./editform"; // Assume you have or will create this
import "../App.css";

function EditButton({ editFunction, loadData, ID,loadItems}) {
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent parent event (if any)
    setShowForm(true);
  };

  return (
    <div>
      <button
        onClick={handleEdit}
        className="iconbutton"
      >
        <FaEdit />
      </button>

      {showForm && (
        <EditForm
          editFunction={editFunction}
          loadData={loadData}
          ID={ID}
          loadItems={loadItems}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default EditButton;
