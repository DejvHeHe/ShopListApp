import './App.css';
import { useState } from 'react';
import ShopDashboard from './components/dashboard';
import CreateForm from './components/createform';
//import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const createList = () => {
    setShowModal(true); // Set showModal to true to display the modal
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ShopList app</h1>
        <button className='primaryButton' onClick={createList}>Vytvořit nakupní seznam</button>
      </header>
      <ShopDashboard />

      {/* Conditionally render CreateForm when showModal is true */}
      {showModal && <CreateForm text="Zadejte název nakupního seznamu:" />}
    </div>
  );
}

export default App;
