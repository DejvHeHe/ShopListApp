import './App.css';
import { useState, useEffect } from 'react';
import ShopDashboard from './components/dashboard';
import CreateForm from './components/createform';
import { fetchShopList } from './api';
import { createItem as createItemAPI } from './api';  // Renamed to avoid confusion
import { createList as createListAPI } from './api';  // Renamed to avoid confusion

function App() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [createFunction, setFunction] = useState(null);

  const handleCreateList = () => {
    setFunction(() => createListAPI); // použij funkci jako callback!
    setText("Zadejte název nakupního seznamu:");
    setShowForm(true);
  };
  
  const handleCreateItem = () => {
    setFunction(() => createItemAPI); // použij funkci jako callback!
    setText("Zadejte název nakupní položky:");
    setShowForm(true);
  };
  
  

  async function loadData() {
    try {
      const shopData = await fetchShopList();
      setData(shopData);
    } catch (error) {
      console.error('Chyba při načítání dat:', error);
    }
  }

  // Load data when the component mounts
  useEffect(() => {
    loadData();  // Calls the loadData function on mount
  }, []);  // Empty dependency array ensures it only runs once

  return (
    <div className="App">
      <header className="App-header">
        <h1>ShopList app</h1>
        <button className="createformbutton"onClick={handleCreateList}>Vytvořit nakupní seznam</button>
        <button className="createformbutton"onClick={handleCreateItem}>Vytvořit nakupní položku</button>
      </header>

      {showForm && (
        <CreateForm
          text={text}
          onClose={() => setShowForm(false)}
          loadData={loadData}  // Passing loadData to CreateForm
          createFunction={createFunction}  // Passing the API function to CreateForm
        />
      )}

      {/* Pass data to ShopDashboard */}
      <ShopDashboard data={data} loadData={loadData}/>
    </div>
  );
}

export default App;
