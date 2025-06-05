import "../App.css";
import Navbar from "./navbar";
import { useState, useEffect } from 'react';
import CreateForm from "./createform";
import {createItem as createItemAPI, createList as createListAPI } from '../api';

function Header({ loadData, loadItems }) {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [createFunction, setFunction] = useState(null);

  const handleCreateList = () => {
    setFunction(() => createListAPI);
    setText("Zadejte název nakupního seznamu:");
    setShowForm(true);
  };

  const handleCreateItem = () => {
    setFunction(() => createItemAPI);
    setText("Zadejte název nakupní položky:");
    setShowForm(true);
  };

  return (
    <>
      <div className="header">
        <Navbar />
        <h1>ShopList app</h1>
        <button className="createformbutton" onClick={handleCreateList}>
          Vytvořit nakupní seznam
        </button>
        <button className="createformbutton" onClick={handleCreateItem}>
          Vytvořit nakupní položku
        </button>
      </div>

      {showForm && (
        <CreateForm
          text={text}
          onClose={() => setShowForm(false)}
          loadData={loadData}
          createFunction={createFunction}
          loadItems={loadItems}
        />
      )}
    </>
  );
}

export default Header;
