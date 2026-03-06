const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Missing environment variables");
  console.log("\nUsage:");
  console.log("  SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=your_key node create-admin.js email password");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin(email, password) {
  try {
    // First check if admins table exists
    const { data: tableCheck } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_name", "admins")
      .single();
    
    if (!tableCheck) {
      console.log("Creating admins table...");
      await supabase.rpc('exec_sql', { query: `
        CREATE TABLE IF NOT EXISTS admins (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `}).catch(async () => {
        // If RPC doesn't work, try direct table creation via API
        console.log("Note: Please create 'admins' table in Supabase dashboard first");
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hash generated");
    
    const { data, error } = await supabase
      .from("admins")
      .insert([{ email, password: hashedPassword }])
      .select();
    
    if (error) {
      if (error.code === '23505') {
        console.log(`Admin with email "${email}" already exists.`);
        
        // Update password
        const { error: updateError } = await supabase
          .from("admins")
          .update({ password: hashedPassword })
          .eq("email", email);
        
        if (updateError) {
          console.log("Also failed to update. Error:", updateError.message);
        } else {
          console.log(`Password updated for ${email}`);
        }
      } else {
        console.error("Error:", error.message);
      }
      return;
    }
    
    console.log(`Admin created successfully!`);
    console.log(`Email: ${email}`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: node create-admin.js <email> <password>");
  console.log("\nExample:");
  console.log("  node create-admin.js admin@cardwise.com mypassword123");
  process.exit(1);
}

createAdmin(args[0], args[1]);
