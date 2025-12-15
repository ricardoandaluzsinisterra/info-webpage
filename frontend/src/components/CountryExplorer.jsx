import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CountryExplorer() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/countries');
      setCountries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="country-explorer">
      <h2>Explore Latin American Achievements</h2>
      <div className="countries-grid">
        {countries.map(country => (
          <div 
            key={country._id} 
            className="country-card"
            onClick={() => setSelectedCountry(country)}
          >
            <img src={country.imageUrl} alt={country.name} />
            <h3>{country.name}</h3>
            <p>{country.era}</p>
          </div>
        ))}
      </div>

      {selectedCountry && (
        <div className="country-detail">
          <h3>{selectedCountry.name}</h3>
          <p>{selectedCountry.description}</p>
          <h4>Key Achievements:</h4>
          {selectedCountry.achievements.map(achievement => (
            <div key={achievement._id}>
              <strong>{achievement.title}</strong>: {achievement.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
