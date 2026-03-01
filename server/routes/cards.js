const router = require("express").Router();
const supabase = require("../supabaseClient");

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("cards").select("*").order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { bank_name, card_name, annual_fee, apr, rewards, signup_bonus, category, rating, affiliate_link, image_url } = req.body;
    const { data, error } = await supabase.from("cards").insert([{
      bank_name,
      card_name,
      annual_fee: annual_fee || "N/A",
      apr: apr || "N/A",
      rewards: rewards || "—",
      signup_bonus: signup_bonus || "—",
      category: category || "cashback",
      rating: rating || 4,
      affiliate_link: affiliate_link || "",
      image_url: image_url || ""
    }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { bank_name, card_name, annual_fee, apr, rewards, signup_bonus, category, rating, affiliate_link, image_url } = req.body;
    const { data, error } = await supabase.from("cards").update({
      bank_name, card_name, annual_fee, apr, rewards, signup_bonus, category, rating, affiliate_link, image_url
    }).eq("id", id).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("cards").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
