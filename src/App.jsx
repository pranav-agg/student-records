import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Base URL of your backend API
const API_URL = `/api/students`;

function App() {
  // Form states
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  
  // Grid data state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all results from the database
  const fetchResults = async () => {
    try {
      console.log(API_URL);
      const response = await axios.get(API_URL);
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch records from server.');
    }
  };

  // Run on component mount
  useEffect(() => {
    fetchResults();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!name || !subject || !score) {
      setError('All fields are required.');
      return;
    }

    const payload = {
      name,
      subject,
      score: Number(score)
    };

    try {
      setLoading(true);
      // POST data to backend
      await axios.post(API_URL, payload);
      
      // Clear form inputs on success
      setName('');
      setSubject('');
      setScore('');
      
      // Refresh the grid with new data
      fetchResults();
    } catch (err) {
      console.error('Error submitting data:', err);
      setError('Failed to save record. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Student Score Entry</h2>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="score-form">
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter student name"
          />
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <input 
            type="text" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            placeholder="Enter subject"
          />
        </div>

        <div className="form-group">
          <label>Score:</label>
          <input 
            type="number" 
            value={score} 
            onChange={(e) => setScore(e.target.value)} 
            placeholder="Enter score"
            min="0"
            max="100"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      <hr />

      {/* Results Grid / Table */}
      <h3>Stored Results</h3>
      {results.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className="results-grid">
          <div className="grid-header">Name</div>
          <div className="grid-header">Subject</div>
          <div className="grid-header">Score</div>
          
          {results.map((item, index) => (
            <React.Fragment key={item.id || index}>
              <div className="grid-item">{item.name}</div>
              <div className="grid-item">{item.subject}</div>
              <div className="grid-item">{item.score}</div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;