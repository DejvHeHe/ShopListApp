import '../App.css';
import { useState, useEffect } from 'react';

function Item({name})
{
    return(
        
        <div className='item'>{name}</div>
        
    );

}
export default Item;