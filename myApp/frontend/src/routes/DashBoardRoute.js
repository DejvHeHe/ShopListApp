import '../App.css';
import { useEffect,useState } from 'react';
import ShopDashboard from '../components/dashboard';
import Header from '../components/header';
import { fetchShared} from '../api';

function DashboardRoute({ loadData, data, loadItems }) {
  const[shared,setShared]=useState([])
  async function loadShared() {
      try {
        const sharedData = await fetchShared();
        setShared(sharedData);
      } catch (error) {
        console.error('Chyba při načítání dat:', error);
      }
    }
  useEffect(() => {
    loadData();
    loadShared(); 
  }, []); // only when component mounts

  return (
    <div className="DashboardRoute">
      <header>
        <Header loadData={loadData} loadItems={loadItems} />
      </header>
      <ShopDashboard data={data} loadData={loadData} />
      <h2>Sdílené nakupní seznamy</h2>
      <ShopDashboard data={shared} loadData={loadShared}/>
    </div>
  );
}

export default DashboardRoute;
