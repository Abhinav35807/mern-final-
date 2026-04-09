import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dark, setDark] = useState(false);

  const fetchData = () => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addProduct = async () => {
    if (!name || !price) return alert("Enter all fields");

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price: Number(price)
      })
    });

    setName("");
    setPrice("");
    fetchData();
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE"
    });
    fetchData();
  };

  const updateProduct = async (id) => {
    const newName = prompt("Enter new name:");
    const newPrice = prompt("Enter new price:");
    if (!newName || !newPrice) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName,
        price: Number(newPrice)
      })
    });

    fetchData();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
        background: dark ? "#121212" : "#f5f7fa",
        color: dark ? "white" : "#2c3e50",
        transition: "0.3s"
      }}
    >
      {/* Header */}
      <h1 style={{ marginBottom: "10px" }}>🛒 Product Manager</h1>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDark(!dark)}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",
          background: dark ? "#f1c40f" : "#2c3e50",
          color: dark ? "black" : "white"
        }}
      >
        {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Add Box */}
      <div
        style={{
          background: dark ? "#1e1e1e" : "white",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "25px",
          display: "inline-block",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button
          onClick={addProduct}
          style={{
            background: "#27ae60",
            color: "white",
            padding: "8px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>

      {/* Product Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              background: dark ? "#1e1e1e" : "white",
              borderRadius: "10px",
              padding: "15px",
              margin: "10px",
              width: "220px",
              boxShadow: "0 3px 12px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{p.name}</h3>
            <p style={{ fontWeight: "bold" }}>₹{p.price}</p>

            <button
              onClick={() => deleteProduct(p._id)}
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                padding: "6px 10px",
                marginRight: "5px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>

            <button
              onClick={() => updateProduct(p._id)}
              style={{
                background: "#3498db",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;