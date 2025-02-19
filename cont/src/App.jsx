import { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import Button from "./components/Button";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setFilteredProducts(json);
      })
      .finally(() => setLoading(false));
  }, []);

  const filterByCategory = (selectedCategory) => {
    if (category === selectedCategory) {
      setCategory("All");
      setFilteredProducts(products);
    } else {
      setCategory(selectedCategory);
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  };

  return (
    <div className="wrapper">
      <div className="filter">
        <Button
          variant={category === "men's clothing" ? "primary" : "bordered"}
          onClick={() => filterByCategory("men's clothing")}
        >
          Men's Clothing
        </Button>
        <Button
          variant={category === "women's clothing" ? "primary" : "bordered"}
          onClick={() => filterByCategory("women's clothing")}
        >
          Women's Clothing
        </Button>
        <Button
          variant={category === "electronics" ? "primary" : "bordered"}
          onClick={() => filterByCategory("electronics")}
        >
          Electronics
        </Button>
        <Button
          variant={category === "jewelery" ? "primary" : "bordered"}
          onClick={() => filterByCategory("jewelery")}
        >
          Jewelery
        </Button>
      </div>
      <div className="lst">
      {loading && <div className="load"> <img src="https://static.vecteezy.com/system/resources/thumbnails/042/600/457/small_2x/loading-circles-flat-style-modern-preloaders-png.png" width='50px' alt="Loading..." /></div>}
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
      </div>
    </div>
  );
}

export default App;