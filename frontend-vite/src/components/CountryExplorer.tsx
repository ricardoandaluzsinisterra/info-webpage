import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Achievement {
  _id: string
  title: string
  description: string
}

interface Country {
  _id: string
  name: string
  era?: string
  imageUrl?: string
  description?: string
  achievements: Achievement[]
}

export default function CountryExplorer() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  useEffect(() => {
    fetchCountries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCountries = async () => {
    try {
      const response = await axios.get<Country[]>('http://localhost:5000/api/countries')
      setCountries(response.data)
      setLoading(false)
    } catch (error) {
      // keep console.error for diagnostics
      // eslint-disable-next-line no-console
      console.error('Error fetching countries:', error)
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

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
            {country.imageUrl && <img src={country.imageUrl} alt={country.name} />}
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
  )
}
