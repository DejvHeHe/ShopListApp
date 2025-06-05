import './App.css';
import { useState, useEffect } from 'react';
import { fetchShopList, fetchItem } from './api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardRoute from './routes/DashBoardRoute';
import Items from './routes/Items';
import RegisterRoute from './routes/RegisterRoute';
import LoginRoute from './routes/LoginRoute';
import PrivateRoute from './routes/PrivateRoute'; // <-- import it

function App() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  async function loadItems() {
    try {
      const fetchedItems = await fetchItem();
      setItems(fetchedItems);
    } catch (error) {
      console.log("Problem with fetching items", error);
    }
  }

  async function loadData() {
    try {
      const shopData = await fetchShopList();
      setData(shopData);
    } catch (error) {
      console.error('Chyba při načítání dat:', error);
    }
  }

  useEffect(() => {
    loadData();
    loadItems();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header"></header>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardRoute loadData={loadData} data={data} loadItems={loadItems} />
              </PrivateRoute>
            }
          />
          <Route
            path="/items"
            element={
              <PrivateRoute>
                <Items loadData={loadData} dataItems={items} loadItems={loadItems} />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<RegisterRoute />} />
          <Route path="/login" element={<LoginRoute />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
