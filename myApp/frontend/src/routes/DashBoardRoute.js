// DashboardRoute.js
import '../App.css';
import { useState, useEffect } from 'react';
import ShopDashboard from '../components/dashboard';
import Header from '../components/header';



function DashboardRoute({loadData,data,loadItems}) {
  
  
  return (
    <div className="DashboardRoute">
      <header>
        <Header loadData={loadData} loadItems={loadItems}/>
      </header>
      

      <ShopDashboard data={data} loadData={loadData} />
    </div>
  );
}

export default DashboardRoute;
