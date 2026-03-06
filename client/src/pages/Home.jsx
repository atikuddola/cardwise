import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
  { value: "all", label: "All" },
  { value: "cashback", label: "Cash Back" },
  { value: "travel", label: "Travel" },
  { value: "no-fee", label: "No Annual Fee" },
  { value: "cashback no-fee", label: "Cash Back + No Fee" },
  { value: "student", label: "Student" },
  { value: "islamic", label: "Islamic" },
];

const faqs = [
  {
    q: "How do I choose the right credit card?",
    a: "Start by identifying your spending habits. If you dine out often, a dining rewards card makes sense. Frequent travelers benefit from travel miles cards. For simplicity, a flat-rate cash back card is hard to beat."
  },
  {
    q: "Does applying for a card hurt my credit score?",
    a: "Yes, applying triggers a hard inquiry which may temporarily affect your score. The impact is usually small and fades within a few months."
  },
  {
    q: "Are the 'Apply Now' links paid partnerships?",
    a: "Some links are affiliate links, meaning CardWise may earn a commission if you apply. This never influences our ratings — our editorial team operates independently."
  },
  {
    q: "What is APR and why does it matter?",
    a: "APR (Annual Percentage Rate) is the interest you'll pay if you carry a balance. If you pay your full statement each month, APR won't cost you anything."
  },
  {
    q: "What credit score do I need to qualify?",
    a: "It varies by card. Premium travel cards typically require a strong credit history. Entry-level cards are available for those with limited credit history."
  },
  {
    q: "How often is the comparison table updated?",
    a: "We review and update our card data regularly to reflect the latest offers, rates, and bonuses directly from Bangladeshi banks."
  }
];

export default function Home() {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [compareCards, setCompareCards] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/cards")
      .then((res) => setCards(res.data || []))
      .catch((err) => {
        console.error("Failed to load cards:", err);
        setError("Failed to load cards. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCards = cards.filter((card) => {
    const matchesFilter = filter === "all" || (card.category || "").includes(filter);
    const matchesSearch =
      search === "" ||
      (card.card_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (card.bank_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (card.rewards || "").toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleCompare = (card) => {
    if (compareCards.find(c => c.id === card.id)) {
      setCompareCards(compareCards.filter(c => c.id !== card.id));
    } else if (compareCards.length < 3) {
      setCompareCards([...compareCards, card]);
    }
  };

  const isInCompare = (cardId) => compareCards.some(c => c.id === cardId);

  const renderStars = (rating) => {
    return "★".repeat(rating || 0) + "☆".repeat(5 - (rating || 0));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <span className="hero-badge">🏆 #1 Credit Card Comparison in Bangladesh</span>
        <h1>
          Find the card that<br />
          <span>fits your life.</span>
        </h1>
        <p>
          Compare the best credit cards from Bangladeshi banks — rewards, fees, APR, and bonuses — all in one place. No fluff, just facts.
        </p>
        <div className="hero-search">
          <input
            type="text"
            placeholder="Search by card name or feature…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => {}}>Search</button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">{cards.length}+</div>
            <div className="stat-label">Cards Compared</div>
          </div>
          <div className="stat">
            <div className="stat-num">50K+</div>
            <div className="stat-label">Monthly Users</div>
          </div>
          <div className="stat">
            <div className="stat-num">100%</div>
            <div className="stat-label">Unbiased Reviews</div>
          </div>
        </div>
      </section>

      {/* Compare Section */}
      <section className="table-section" id="compare">
        <div className="table-header">
          <div>
            <div className="section-label">Compare</div>
            <div className="section-title">Top Credit Cards in Bangladesh</div>
            <div className="section-sub" style={{ fontSize: ".88rem" }}>Updated March 2026 · Affiliate links may apply</div>
          </div>
          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`filter-btn ${filter === cat.value ? "active" : ""}`}
                onClick={() => setFilter(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="table-wrap">
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#9ca3af" }}>Loading cards...</div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#ef4444" }}>{error}</div>
          ) : filteredCards.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#9ca3af" }}>
              {cards.length === 0 ? "No cards found. Add cards from admin panel." : "No cards match your search."}
            </div>
          ) : (
            <table id="cardTable">
              <thead>
                <tr>
                  <th>Compare</th>
                  <th>Card</th>
                  <th>Annual Fee</th>
                  <th>APR</th>
                  <th>Rewards / Benefits</th>
                  <th>Sign-up Bonus / Perk</th>
                  <th>Rating</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredCards.map((card) => (
                  <tr key={card.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={isInCompare(card.id)}
                        onChange={() => toggleCompare(card)}
                        disabled={!isInCompare(card.id) && compareCards.length >= 3}
                        className="compare-checkbox"
                      />
                    </td>
                    <td>
                      <div className="card-cell">
                        <div className="card-img-wrap">
                          {card.image_url ? (
                            <img src={card.image_url} alt={card.card_name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                          ) : null}
                          <span className="card-img-placeholder">🏦</span>
                        </div>
                        <div>
                          <div className="card-name">{card.card_name}</div>
                          <div className="card-issuer">{card.bank_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{card.annual_fee}</td>
                    <td style={{ fontSize: ".85rem" }}>{card.apr}</td>
                    <td style={{ fontSize: ".85rem", maxWidth: "200px" }}>{card.rewards}</td>
                    <td style={{ fontSize: ".82rem", maxWidth: "160px" }}>{card.signup_bonus}</td>
                    <td>
                      <div className="rating">{renderStars(card.rating)}</div>
                    </td>
                    <td>
                      {card.affiliate_link ? (
                        <a className="apply-btn" href={card.affiliate_link} target="_blank" rel="noopener">Apply →</a>
                      ) : (
                        <button className="apply-btn" onClick={() => alert("Link not set yet.")}>Apply →</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <p className="affiliate-note">* CardWise may receive compensation when you click "Apply Now." This does not affect our ratings or rankings.</p>
      </section>

      {/* Compare Bar */}
      {compareCards.length > 0 && (
        <div className="compare-bar">
          <div className="compare-bar-content">
            <div className="compare-cards-preview">
              {compareCards.map(card => (
                <div key={card.id} className="compare-card-mini">
                  <span>{card.card_name}</span>
                  <button onClick={() => toggleCompare(card)}>×</button>
                </div>
              ))}
              {compareCards.length < 3 && (
                <span className="compare-more">Select up to {3 - compareCards.length} more</span>
              )}
            </div>
            <button className="btn btn-primary" onClick={() => setShowCompare(true)}>
              Compare ({compareCards.length})
            </button>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompare && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && setShowCompare(false)}>
          <div className="modal compare-modal">
            <div className="modal-header">
              <h3>Compare Cards</h3>
              <button className="modal-close" onClick={() => setShowCompare(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="compare-table-wrap">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      {compareCards.map(card => (
                        <th key={card.id}>{card.card_name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bank</td>
                      {compareCards.map(card => (
                        <td key={card.id}>{card.bank_name}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Annual Fee</td>
                      {compareCards.map(card => (
                        <td key={card.id}>{card.annual_fee}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>APR</td>
                      {compareCards.map(card => (
                        <td key={card.id}>{card.apr}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Rewards</td>
                      {compareCards.map(card => (
                        <td key={card.id}>{card.rewards}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Sign-up Bonus</td>
                      {compareCards.map(card => (
                        <td key={card.id}>{card.signup_bonus}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Category</td>
                      {compareCards.map(card => (
                        <td key={card.id}>{card.category}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Rating</td>
                      {compareCards.map(card => (
                        <td key={card.id}>{renderStars(card.rating)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td></td>
                      {compareCards.map(card => (
                        <td key={card.id}>
                          {card.affiliate_link ? (
                            <a className="apply-btn" href={card.affiliate_link} target="_blank" rel="noopener">Apply →</a>
                          ) : (
                            <button className="apply-btn" onClick={() => alert("Link not set yet.")}>Apply →</button>
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section id="features">
        <div className="section-label">Why CardWise</div>
        <div className="section-title">Smarter decisions start here.</div>
        <div className="section-sub">
          We do the research so you don't have to — cutting through the noise to surface what actually matters.
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>Unbiased Comparisons</h3>
            <p>Our rankings are based on real data and user reviews — not who pays us the most.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Updated Regularly</h3>
            <p>Rates, fees, and bonuses change. We keep our database fresh so you always see current offers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Powerful Filters</h3>
            <p>Filter by category, annual fee, and more to find your perfect match fast.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>No Hidden Costs</h3>
            <p>We surface all the fine print — foreign transaction fees, penalty APRs, and expiry rules.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="section-label">FAQ</div>
        <div className="section-title">Common questions, answered.</div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
