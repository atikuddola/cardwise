const router = require("express").Router();
const supabase = require("../supabaseClient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) return res.status(401).send("Invalid");

  const match = await bcrypt.compare(password, data.password);
  if (!match) return res.status(401).send("Invalid");

  const token = jwt.sign({ id: data.id }, "secret");
  res.json({ token });
});

module.exports = router;