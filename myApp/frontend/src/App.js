//App.js
import './App.css';
import { useState,useEffect} from 'react';
import CreateForm from './components/createform';
import { fetchShopList, createItem as createItemAPI, createList as createListAPI } from './api';
import { fetchItem } from "./api";
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardRoute from './DashBoardRoute';
import Items from './Items';
//import LoginRoute from './LoginRoute';


function App() {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [createFunction, setFunction] = useState(null);
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
  

  const handleCreateList = () => {
    setFunction(() => createListAPI);
    setText("Zadejte název nakupního seznamu:");
    setShowForm(true);
  };

  const handleCreateItem = () => {
    setFunction(() => createItemAPI);
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

  useEffect(() => {
    loadData();
    loadItems();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <h1>ShopList app</h1>
            <button className="createformbutton" onClick={handleCreateList}>
          Vytvořit nakupní seznam
          </button>
          <button className="createformbutton" onClick={handleCreateItem}>
            Vytvořit nakupní položku
          </button>
          
        </header>
        <Routes>
            <Route path="/" element={<DashboardRoute loadData={loadData} data={data} />} />
            <Route path='/items' element={<Items loadData={loadData} dataItems={items} loadItems={loadItems}/>}/>
            {/*<Route path='/login' element={<LoginRoute/>}/>*/}
          </Routes>
        {showForm && (
        <CreateForm
          text={text}
          onClose={() => setShowForm(false)}
          loadData={loadData}
          createFunction={createFunction}
          loadItems={loadItems}
        />
      )}
      </div>
    </Router>
  );
}

export default App;
