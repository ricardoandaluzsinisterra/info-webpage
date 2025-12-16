import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import './ContactForm.css'

interface FormData {
  name: string
  email: string
  countryInterest: string
  message: string
}

export default function ContactForm() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      await axios.post('http://localhost:5000/api/contact', data)
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
      setOpen(false)
  } catch (err: unknown) {
    // better typing for errors; handle axios errors and generic Errors
    let msg = 'Error submitting form'
    if (axios.isAxiosError(err)) {
      const data = err.response?.data as { error?: string } | undefined
      msg = data?.error || msg
    } else if (err instanceof Error) {
      msg = err.message || msg
    }
    setError(msg)
  }
  }

  return (
    <div className={`contact-drawer ${open ? 'open' : ''}`}>
      <button
        className="contact-toggle flowing-item"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-controls="contact-drawer-panel"
      >
        {open ? 'Close' : 'Contact'}
        <span className="flowing-underline" />
      </button>

      <div id="contact-drawer-panel" className="contact-panel" role="region" aria-hidden={!open}>
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <h3 className="flowing-title">Get in Touch</h3>

          {submitted && <p className="success">✓ Message sent! Confirmation email sent.</p>}
          {error && <p className="error">✗ {error}</p>}

          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            placeholder="Your Name"
            className={errors.name ? 'invalid' : ''}
          />
          {errors.name && <p className="field-error">{errors.name.message}</p>}

          <input
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: 'Invalid email' }
            })}
            type="email"
            placeholder="Your Email"
            className={errors.email ? 'invalid' : ''}
          />
          {errors.email && <p className="field-error">{errors.email.message}</p>}

          <select {...register('countryInterest')}>
            <option value="">Select Country Interest</option>
            <option value="Panama">Panama</option>
            <option value="Mexico">Mexico</option>
            <option value="Colombia">Colombia</option>
            <option value="Venezuela">Venezuela</option>
          </select>

          <textarea
            {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Minimum 10 characters' } })}
            placeholder="Your Message"
            className={errors.message ? 'invalid' : ''}
          />
          {errors.message && <p className="field-error">{errors.message.message}</p>}

          <div className="actions">
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</button>
            <button type="button" className="secondary" onClick={() => { reset(); setOpen(false) }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
