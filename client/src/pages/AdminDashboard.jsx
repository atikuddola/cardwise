import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const categories = [
  { value: "travel", label: "Travel" },
  { value: "cashback", label: "Cash Back" },
  { value: "cashback no-fee", label: "Cash Back + No Fee" },
  { value: "travel no-fee", label: "Travel + No Fee" },
  { value: "student", label: "Student" },
  { value: "islamic", label: "Islamic" },
  { value: "no-fee", label: "No Annual Fee" },
];

export default function AdminDashboard() {
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [form, setForm] = useState({
    bank_name: "",
    card_name: "",
    annual_fee: "",
    apr: "",
    rewards: "",
    signup_bonus: "",
    category: "cashback",
    rating: 4,
    affiliate_link: "",
    image_url: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin_logged_in");
    if (!isLoggedIn) {
      navigate("/admin");
    }
    loadCards();
  }, [navigate]);

  const loadCards = () => {
    API.get("/cards").then((res) => setCards(res.data || []));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin");
  };

  const openModal = (card = null) => {
    if (card) {
      setEditingCard(card);
      setForm({
        bank_name: card.bank_name || "",
        card_name: card.card_name || "",
        annual_fee: card.annual_fee || "",
        apr: card.apr || "",
        rewards: card.rewards || "",
        signup_bonus: card.signup_bonus || "",
        category: card.category || "cashback",
        rating: card.rating || 4,
        affiliate_link: card.affiliate_link || "",
        image_url: card.image_url || ""
      });
    } else {
      setEditingCard(null);
      setForm({
        bank_name: "",
        card_name: "",
        annual_fee: "",
        apr: "",
        rewards: "",
        signup_bonus: "",
        category: "cashback",
        rating: 4,
        affiliate_link: "",
        image_url: ""
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCard(null);
  };

  const saveCard = async () => {
    if (!form.card_name || !form.bank_name) {
      alert("Card name and issuer required.");
      return;
    }
    try {
      if (editingCard) {
        await API.put(`/cards/${editingCard.id}`, form);
      } else {
        await API.post("/cards", form);
      }
      loadCards();
      closeModal();
    } catch (err) {
      alert("Error saving card");
    }
  };

  const deleteCard = async (id) => {
    if (!confirm("Delete this card?")) return;
    try {
      await API.delete(`/cards/${id}`);
      loadCards();
    } catch (err) {
      alert("Error deleting card");
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div id="adminPage">
      <div className="admin-header">
        <div className="admin-title">
          <Link to="/" className="logo">Card<span>Wise</span></Link>
          <span className="admin-badge">ADMIN</span>
        </div>
        <div style={{ display: "flex", gap: ".7rem", flexWrap: "wrap" }}>
          <button className="btn btn-primary btn-sm" onClick={() => openModal()}>➕ Add Card</button>
          <Link to="/" className="btn btn-gray btn-sm">← View Site</Link>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="admin-table-card">
        <h3>
          <span>📋 All Cards <span style={{ color: "#9ca3af", fontWeight: 400, fontSize: ".85rem" }}>({cards.length} cards)</span></span>
        </h3>
        <div className="admin-tbl-wrap">
          <table className="admin-tbl">
            <thead>
              <tr>
                <th>Image</th>
                <th>Card Name</th>
                <th>Issuer</th>
                <th>Annual Fee</th>
                <th>APR</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Affiliate Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cards.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center", padding: "2rem", color: "#9ca3af" }}>
                    No cards yet. Click "Add Card" to get started.
                  </td>
                </tr>
              ) : (
                cards.map((card) => (
                  <tr key={card.id}>
                    <td>
                      {card.image_url ? (
                        <img className="admin-thumb" src={card.image_url} alt={card.card_name} onError={(e) => { e.target.style.display = 'none'; }} />
                      ) : (
                        <div className="admin-thumb-placeholder">🏦</div>
                      )}
                    </td>
                    <td><strong style={{ fontSize: ".9rem" }}>{card.card_name}</strong></td>
                    <td style={{ color: "#4b5563" }}>{card.bank_name}</td>
                    <td>{card.annual_fee}</td>
                    <td>{card.apr}</td>
                    <td>
                      <span style={{ background: "#eff6ff", color: "#2563eb", padding: ".2rem .6rem", borderRadius: "99px", fontSize: ".75rem", fontWeight: 600 }}>
                        {card.category}
                      </span>
                    </td>
                    <td style={{ color: "#f59e0b" }}>{renderStars(card.rating)}</td>
                    <td>
                      {card.affiliate_link ? (
                        <a href={card.affiliate_link} target="_blank" rel="noopener" style={{ color: "#2563eb", fontSize: ".8rem", textDecoration: "none" }}>🔗 Link set</a>
                      ) : (
                        <span style={{ color: "#9ca3af", fontSize: ".8rem" }}>No link</span>
                      )}
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn btn-primary btn-sm" onClick={() => openModal(card)}>✏️ Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteCard(card.id)}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <div className="modal-header">
              <h3>{editingCard ? "✏️ Edit Card" : "➕ Add New Card"}</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Card Name</label>
                  <input className="input" id="fName" placeholder="e.g. DBBL Visa Signature" value={form.card_name} onChange={(e) => setForm({ ...form, card_name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Issuer / Bank</label>
                  <input className="input" id="fIssuer" placeholder="e.g. Dutch-Bangla Bank" value={form.bank_name} onChange={(e) => setForm({ ...form, bank_name: e.target.value })} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Annual Fee</label>
                  <input className="input" id="fFee" placeholder="e.g. ৳6,000" value={form.annual_fee} onChange={(e) => setForm({ ...form, annual_fee: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>APR</label>
                  <input className="input" id="fApr" placeholder="e.g. 27%" value={form.apr} onChange={(e) => setForm({ ...form, apr: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Rewards / Benefits</label>
                <input className="input" id="fRewards" placeholder="e.g. 2x points on dining & travel" value={form.rewards} onChange={(e) => setForm({ ...form, rewards: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Sign-up Bonus / Key Perk</label>
                <input className="input" id="fBonus" placeholder="e.g. ৳10,000 welcome voucher" value={form.signup_bonus} onChange={(e) => setForm({ ...form, signup_bonus: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Affiliate Link (Apply Now URL)</label>
                <input className="input" id="fLink" placeholder="https://..." value={form.affiliate_link} onChange={(e) => setForm({ ...form, affiliate_link: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select className="select" id="fTag" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <div className="star-input">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} onClick={() => setForm({ ...form, rating: n })} className={n <= form.rating ? "on" : ""}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Card Image URL (optional)</label>
                <input className="input" placeholder="https://..." value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-gray" onClick={closeModal}>Cancel</button>
              <button className="btn btn-success" onClick={saveCard}>💾 Save Card</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
