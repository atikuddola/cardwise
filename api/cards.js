const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { data, error } = await supabase
          .from("cards")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) return res.status(500).json({ error: error.message });
        res.json(data || []);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;

    case "POST":
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
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
  }
};
