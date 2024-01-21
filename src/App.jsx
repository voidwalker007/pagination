import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const api = `https://dummyjson.com/products`;

  const getData = () => {
    fetch(api)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.products);
        setProducts(res.products);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="product-container">
        
        {products &&
          products.slice((page- 1)*5,page*5).map((item, index) => {
            return (
              <div id="product-box" key={item.id}>
                <h2>{item.title}</h2>
                <img src={item.images[0]} alt="image" id="product-images" />
                <p>{item.description}</p>
              </div>
            );
          })}
      </div>
      {products.length > 0 && (
        <div className="pagination">
          {
            <span 
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              ⬅️
            </span>
          }
          
          {[...Array(products.length / 5)].map((_, i) => {
            return (
              <span className={page===i+1 ? "active": ""}
                onClick={() => {
                  setPage(i + 1);
                }}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          {
            <span
              onClick={() => {
                if (page < products.length / 5) {
                  setPage(page + 1);
                }
              }}
            >
              ➡️
            </span>
          }
        </div>
      )}
    </div>
  );
}

export default App;
