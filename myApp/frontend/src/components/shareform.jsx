import '../App.css';
import React, { useState, useEffect } from 'react';
import { share, viewSharedTo } from '../api';
import ShareInfo from './sharedinfo';

function ShareForm({ ID, onClose }) {
  const [sharedToData, setSharedTo] = useState([]);
  const [inputValue, setInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email: inputValue, shopList: ID };
    await share(data);
    setInput("");
    onClose();
  };

  async function loadSharedTo() {
  try {
    const data = { ID };
    console.log("Sending data to API:", data);
    const sharedData = await viewSharedTo(data);
    console.log("Received shared data:", sharedData);
    setSharedTo(sharedData);
  } catch (error) {
    console.error('Chyba při načítání dat:', error);
  }
}


  useEffect(() => {
    loadSharedTo();
  }, []);

  return (
    <div className='modalwindow'>
      <form onSubmit={handleSubmit}>
        <label>Zadejte email pro sdílení</label>
        <input
          type='email'
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button className="formbutton" type='submit'>Potvrdit</button>
        <button className="formbutton" type="button" onClick={onClose}>Zavřít</button>

        <div className='shareinfo'>
          <label>Sdíleno:</label>
          {sharedToData.map((email, index) => (
            <ShareInfo key={index} email={email} ID={ID} loadSharedTo={loadSharedTo} />
          ))}
        </div>
      </form>
    </div>
  );
}

export default ShareForm;
