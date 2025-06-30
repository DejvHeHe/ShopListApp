import DeleteButton from './deletebutton';
import EditButton from './editbutton';
import ShareButton from './sharebutton';
import '../App.css';
import React, { useState, useRef, useEffect } from "react";
import { deleteShopList, editShopList } from '../api';

function OptionForm({ ID, loadData, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose(); // 🔒 Close if click is outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);

  return (
    <div ref={ref} className="option-form">
      <EditButton ID={ID} loadData={loadData} editFunction={editShopList} />
      <DeleteButton deletefunction={deleteShopList} loadData={loadData} ID={ID} />
      <ShareButton ID={ID}/>
    </div>
  );
}

export default OptionForm;
