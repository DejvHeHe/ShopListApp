// api.js
export async function fetchShopList() {
    try {
      const response = await fetch("http://localhost:5000/shopList/display");
      if (!response.ok) throw new Error("Chyba při načítání dat");
      const data = await response.json();
      console.log(data)
      return data.itemList;
    } catch (error) {
      console.error("Chyba:", error);
      throw error;
    }
  }
function createList()
{
  try{
    

  }
  catch(error)
  {
    console.log("Chyba:",error)
    throw error
  }
}  
  