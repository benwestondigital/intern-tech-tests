import '../AdditionalFiles/App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';

//This is the API url to fetch from
const API_URL = 'https://matchesfashion.com/api/products';
const TAX_RATE = 0.08;

function YourSolution() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemCount, setItemCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetch(`${API_URL}&page=${page}`);
        const { products, count } = await fetchedData.json();
        setItemCount(count);
        setData(products);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [page]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
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
      <button onClick={() => setPage(0)} disabled={page === 0}>
        First Page
      </button>
      <button
        onClick={() => setPage(currPage => currPage - 1)}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => setPage(currPage => currPage + 1)}
        disabled={10 * page >= itemCount}
      >
        Next Page
      </button>
      <button
        onClick={() => setPage(itemCount / 10)}
        disabled={10 * page >= itemCount}
      >
        Last Page
      </button>
    </div>
  );
}

export default YourSolution;
