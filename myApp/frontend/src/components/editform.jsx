import '../App.css';
import { useState, useEffect } from 'react';


function EditForm({onClose,ID,loadItems,loadData,editFunction})
{
    const [inputValue, setInput]=useState("")
    const data={ID:ID,newname:inputValue}
    async function handleSubmit()
    {
        const result = await editFunction(data);
        loadItems();
        loadData()
        onClose();

    }
    return(
        <div className='modalwindow'>
            <form onSubmit={handleSubmit}>
                <label>Nové jmeno:</label>
                <input type='text' value={inputValue} onChange={(e) => setInput(e.target.value)} required></input>
                <button className="formbutton" type='submit'>Potvrdit</button>
                <button className="formbutton" onClick={onClose}>Zavřít</button>
            
            </form>
            

        </div>
    );

}
export default EditForm;
