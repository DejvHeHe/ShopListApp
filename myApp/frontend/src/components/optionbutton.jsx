import { FaEllipsisV } from "react-icons/fa"; // vertical three dots
import '../App.css';
import React,{useState} from "react";
import OptionForm from "./optionform";

function OptionButton({ID,loadData})
{
    const[showForm,setShowForm]=useState(false)
    function handleOpen(e)
    {
        e.stopPropagation();
        setShowForm(true)
    }

    return(
        <div>
            <button onClick={handleOpen} className="iconbutton">
                <FaEllipsisV />
            </button>
        {showForm && (
        <OptionForm ID={ID} loadData={loadData} onClose={() => setShowForm(false)}/>
      )}
        </div>
    );
    
}
export default OptionButton;