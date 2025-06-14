import '../App.css';
import { useEffect } from 'react';
import ShopDashboard from '../components/dashboard';
import Header from '../components/header';

function DashboardRoute({ loadData, data, loadItems }) {
  useEffect(() => {
    loadData(); // always load fresh data on mount
  }, []); // only when component mounts

  return (
    <div className="DashboardRoute">
      <header>
        <Header loadData={loadData} loadItems={loadItems} />
      </header>
      <ShopDashboard data={data} loadData={loadData} />
    </div>
  );
}

export default DashboardRoute;
