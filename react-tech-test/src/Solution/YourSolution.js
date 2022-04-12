import '../AdditionalFiles/App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';

//This is the API url to fetch from
const API_URL = 'https://matchesfashion.com/api/products';
const TAX_RATE = 0.08;

function YourSolution() {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetch(`${API_URL}&page=${pageNum}`);
        const { products } = await fetchedData.json();
        setData(products);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pageNum]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className='App'>
      <table id='products'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Name</th>
            <th>Quantity Sold</th>
            <th>Sold Price</th>
            <th>Cost To Business</th>
          </tr>
        </thead>
        <tbody>
          {data.map(product => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td>{product.quantitySold}</td>
                <td>£{product.soldPrice}</td>
                <td>£{product.costToBusiness}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button>First Page</button>
      <button>Previous Page</button>
      <button>Next Page</button>
      <button>Last Page</button>
    </div>
  );
}

export default YourSolution;
