import '../App.css';
import React, { useEffect, useState } from 'react';
import ShopDropdown from './shoplist';
import Loader from './loading';


function Dashboard({ loadData, data,owner }) {
  const[loading,setLoading]=useState(true)

  useEffect(() =>{
    if(data.length>0 || data.loaded)
    {
      setLoading(false)
    }
  },[data]);

  return (
    <div className='dashboard'>
      {loading ? (<Loader/>):
      data.length > 0 ? (
        data.map((shop, index) => (
          <ShopDropdown
            key={index}
            name={shop.name || 'Neznámý'}
            ID={shop._id}
            items={shop.items || []}
            loadData={loadData}
            owner={owner}
          />
        ))
      ) : (
        <label>No shops available</label>
      )}
    </div>
  );
}

export default Dashboard;
