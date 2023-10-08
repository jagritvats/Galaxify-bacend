const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
dotenv.config();

const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABSE_KEY
);

module.exports = supabase;
