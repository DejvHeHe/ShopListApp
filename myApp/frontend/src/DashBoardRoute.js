// DashboardRoute.js
import './App.css';
import { useState, useEffect } from 'react';
import ShopDashboard from './components/dashboard';
import { fetchShopList } from './api';


function DashboardRoute({loadData,data}) {
  

  return (
    <div className="DashboardRoute">
      

      <ShopDashboard data={data} loadData={loadData} />
    </div>
  );
}

export default DashboardRoute;
