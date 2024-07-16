import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchData = async (type) => {
    try {
      const response = await axios.get(`http://localhost:3001/numbers/${type}`);
      let data = response.data;
      // Check if data has the 'numbers' property and it is an array
      if (data.numbers && Array.isArray(data.numbers)) {
        data = data.numbers; // Use the 'numbers' array
      } else {
        console.error("Expected an array at 'data.numbers' but got:", data);
        data = []; // Fallback to an empty array if the expected structure is not met
      }
      setNumbers(data);
      const avg = data.length > 0 ? data.reduce((acc, curr) => acc + curr, 0) / data.length : 0;
      setAverage(avg);
    } catch (error) {
      console.error("Error fetching data:", error);
      setNumbers([]);
      setAverage(0);
    }
  };

  return (
    <div>
      <h1>Number Generator</h1>
      <button onClick={() => fetchData('even')}>Even</button>
      <button onClick={() => fetchData('fibo')}>Fibo</button> 
      <button onClick={() => fetchData('random')}>Random</button>
      <button onClick={() => fetchData('prime')}>Prime</button>
      <div>
        <h2>Numbers: {numbers.join(', ')}</h2>
        <h2>Average: {average}</h2>
      </div>
    </div>
  );
}

export default App;