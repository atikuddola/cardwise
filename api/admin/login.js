const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const { email, password } = req.body;

      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const bcrypt = require("bcrypt");
      const match = await bcrypt.compare(password, data.password);
      
      if (!match) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const jwt = require("jsonwebtoken");
      const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET || "secret");
      
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
