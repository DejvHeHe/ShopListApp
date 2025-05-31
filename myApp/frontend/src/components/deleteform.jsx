import "../App.css"
import React,{useState} from "react"
function DeleteForm({deletefunction,loadData,onClose,ID ,loadItems})
{
    const handleDelete = async(event) => {
        const data={ID:ID}
        await deletefunction(data)
        loadItems()
        loadData()
        onClose()
   
  };
    return(
        <div className="modalwindow">
            <form onSubmit={handleDelete}>
            <label>Jste si jistý že chcete tuto položku vymazat?</label>
            <button className="formbutton" type="submit">Ano</button>
            <button className="formbutton" onClick={onClose}>Ne</button>
            </form>
        </div>
    );

}
export default DeleteForm;