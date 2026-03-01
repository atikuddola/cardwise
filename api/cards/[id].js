const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "PUT":
      try {
        const { bank_name, card_name, annual_fee, apr, rewards, signup_bonus, category, rating, affiliate_link, image_url } = req.body;
        const { data, error } = await supabase
          .from("cards")
          .update({
            bank_name,
            card_name,
            annual_fee,
            apr,
            rewards,
            signup_bonus,
            category,
            rating,
            affiliate_link,
            image_url
          })
          .eq("id", id)
          .select();
        if (error) return res.status(500).json({ error: error.message });
        res.json(data[0]);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;

    case "DELETE":
      try {
        const { error } = await supabase.from("cards").delete().eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        res.json({ success: true });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
  }
};
