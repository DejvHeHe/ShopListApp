import '../App.css';
import React,{useState} from "react";
import { FaShareAlt } from 'react-icons/fa';
import ShareForm from './shareform';

function ShareButton({ID})
{
    const[showForm,setShowForm]=useState(false)
    function handleOpen()
    {
        setShowForm(true)

    }
    return(
        <div>
            <button onClick={handleOpen} className='iconbutton'>
                <FaShareAlt/>
            </button>
            {showForm && (
        <ShareForm ID={ID} onClose={() => setShowForm(false)}/>
      )}
        </div>
    );

}
export default ShareButton;