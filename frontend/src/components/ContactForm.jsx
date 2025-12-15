import React, { useState } from 'react';
import axios from 'axios';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryInterest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', countryInterest: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h3>Get in Touch</h3>

      {submitted && <p className="success">✓ Message sent! Confirmation email sent.</p>}
      {error && <p className="error">✗ {error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <select
        name="countryInterest"
        value={formData.countryInterest}
        onChange={handleChange}
      >
        <option value="">Select Country Interest</option>
        <option value="Panama">Panama</option>
        <option value="Mexico">Mexico</option>
        <option value="Colombia">Colombia</option>
        <option value="Venezuela">Venezuela</option>
      </select>

      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        minLength="10"
      />

      <button type="submit">Send Message</button>
    </form>
  );
}
