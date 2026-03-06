const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required");
  console.log("\nUsage:");
  console.log("  SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=your_key node create-admin.js email password");
  console.log("\nOr set environment variables and run:");
  console.log("  export SUPABASE_URL=https://xxx.supabase.co");
  console.log("  export SUPABASE_SERVICE_ROLE_KEY=your_key");
  console.log("  node create-admin.js email@domain.com mypassword");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin(email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { data, error } = await supabase
      .from("admins")
      .insert([{ email, password: hashedPassword }])
      .select();
    
    if (error) {
      if (error.code === '23505') {
        console.log(`Admin with email "${email}" already exists.`);
        
        const { data: existing, error: fetchError } = await supabase
          .from("admins")
          .select("id, email")
          .eq("email", email)
          .single();
        
        if (existing) {
          console.log(`Existing admin: ${existing.email} (ID: ${existing.id})`);
        }
      } else {
        console.error("Error creating admin:", error.message);
      }
      return;
    }
    
    console.log(`Admin created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`ID: ${data[0].id}`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: node create-admin.js <email> <password>");
  console.log("\nExample:");
  console.log("  node create-admin.js admin@example.com mypassword123");
  process.exit(1);
}

createAdmin(args[0], args[1]);
