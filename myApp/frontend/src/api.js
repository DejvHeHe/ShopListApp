// api.js

export async function fetchShopList() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/shopList/display", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Chyba při načítání dat");

    const data = await response.json();
    return data.itemList;

  } catch (error) {
    console.error("Chyba:", error);
    throw error;
  }
}

export async function fetchItem() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/item/display", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Chyba při načítání dat");

    const data = await response.json();
    return data.itemList;
  } catch (error) {
    console.error("Chyba:", error);
    throw error;
  }
}

export async function uncheck(data) {
  try {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/shopList/uncheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error unchecking item:", error);
    throw error;
  }
}

export async function createList(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/shopList/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      return { success: false, message: result?.message || "Chyba při vytváření položky." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating list:", error);
    return { success: false, message: "Nakupní seznam s tímto názvem již existuje." };
  }
}

export async function createItem(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/item/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      return { success: false, message: result?.message || "Chyba při vytváření položky." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating item:", error);
    return { success: false, message: "Položka s tímto názvem již existuje." };
  }
}

export async function addItem(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/shopList/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      return { success: false, message: result?.message || "Chyba při vytváření položky." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding item:", error);
    return { success: false, message: "Položka s tímto názvem už v seznamu je" };
  }
}

export async function editItem(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/item/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error editing item:", error);
  }
}

export async function editShopList(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/shopList/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error editing shopList:", error);
  }
}

export async function deleteShopList(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/shopList/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting shopList:", error);
  }
}

export async function deleteItem(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/item/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

export async function register(data) {
  try {
    const response = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error("Error during registration:", error);
  }
}

export async function login(data) {
  try {
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Login failed:", errorResponse.message || response.statusText);
      return null;
    }

    const result = await response.json();
    return result.token;
    
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}
