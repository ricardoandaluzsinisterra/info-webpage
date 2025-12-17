import React from 'react'
import './SpotlightCards.css'

const spotlightData = [
  {
    id: 1,
    icon: '📚',
    headline: "Latin America's Achievements, Erased from History",
    body:
      "European and North American history books celebrate the 'Age of Enlightenment'—but rarely mention that Latin America pioneered anti-slavery laws, indigenous rights, and multiracial democracy DECADES before Europe or the United States. From Colombia's 1814 emancipation to Mexico's 1857 abolition of racial hierarchies, these stories deserve to be told.",
    cta: 'Discover the Timeline',
    link: '/timeline'
  },
  {
    id: 2,
    icon: '✊',
    headline: 'Why Democratical Exists: A Personal Mission',
    body:
      "Dr. Marixa Lasso's research revealed that 40,000 Panamanians were erased—not for engineering, but because their existence contradicted racist narratives. Democratical exists to challenge those lies. This is personal. These are my ancestors.",
    cta: 'Read My Story',
    link: '/about'
  },
  {
    id: 3,
    icon: '🌎',
    headline: "Explore Democracy's TRUE Origins",
    body:
      "LATAM DEMOCRAT brings Latin America's civic achievements to life through interactive country explorers, achievement timelines, and primary sources. Built for educators and students, it challenges Eurocentric curricula with facts. The truth doesn't need exaggeration—it just needs to be heard.",
    cta: 'Start Exploring',
    link: '/countries'
  }
]

export default function SpotlightCards() {
  return (
    <section className="spotlight-section">
      <div className="spotlight-inner">
        <div className="spotlight-header">
          <h2>Reclaiming Latin America's Democratic Legacy</h2>
          <p>
            Discover why the history you learned was incomplete—and how we're changing that narrative.
          </p>
        </div>

        <div className="spotlight-grid">
          {spotlightData.map((card) => (
            <article key={card.id} className="spotlight-card">
              <div
                className="spotlight-card-hero"
                style={{
                  background: 'linear-gradient(90deg,var(--color-blue-dark),var(--color-green-dark))'
                }}
              >
                <span className="spotlight-icon" aria-hidden>
                  {card.icon}
                </span>
              </div>

              <div className="spotlight-card-body">
                <h3 className="spotlight-headline">{card.headline}</h3>
                <p className="spotlight-copy">{card.body}</p>
                <a href={card.link} className="spotlight-cta">
                  {card.cta} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
