import '../App.css';
import React, { useState} from 'react';



function CreateForm({ text, onClose,loadData,createFunction,loadItems}) {
  const [inputValue, setInput]=useState("")
  const [labelText,setText]=useState("")
  
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
  
    const data = { name: inputValue };
  
    try {
      if (createFunction) {
        const result = await createFunction(data);
  
        if (result.success) {
          loadData();
          loadItems();
          onClose();
        } else {
          setText(result.message); // zobrazí chybu
        }
      } else {
        console.error("No function passed to createFunction!");
        setText("Vytvářecí funkce není nastavena.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setText("Neočekávaná chyba při odesílání dat.");
    }
  };
  
  
  
  return (
    <div className='modalwindow'>
      <form onSubmit={handleSubmit}>
      
      <label>{text}*</label>
      <input type='text' value={inputValue} onChange={(e) => setInput(e.target.value)} required></input>
      <button className="formbutton" type='submit'>Potvrdit</button>
      <button className="formbutton" onClick={onClose}>Zavřít</button>
      
      {labelText && <label>{labelText}</label>}

      </form>      
    </div>

  );
}

export default CreateForm;
