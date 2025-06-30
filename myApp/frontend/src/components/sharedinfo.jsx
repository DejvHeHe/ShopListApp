import React from 'react';
import '../App.css';
import { FaTimes } from "react-icons/fa";
import { unshare } from '../api';

function ShareInfo({ email, loadSharedTo, ID }) {

  const handleUnshare = async (event) => {
    event.preventDefault();
    try {
      const data = { email: email, shopList: ID };
      await unshare(data);
      await loadSharedTo();  // znovu načti seznam
    } catch (error) {
      console.error("Chyba při rušení sdílení:", error);
    }
  };

  return (
    <div className="dropdown-item">
      <label>{email}</label>
      <button className='iconbutton' onClick={handleUnshare}>
        <FaTimes />
      </button>
    </div>
  );
}

export default ShareInfo;
