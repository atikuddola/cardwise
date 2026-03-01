-- Complete Schema for CardWise
-- Run this in Supabase SQL Editor

-- Drop existing table if exists (optional - only if you want to start fresh)
-- DROP TABLE IF EXISTS cards;

-- Create cards table with all required columns
CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_name TEXT NOT NULL,
  card_name TEXT NOT NULL,
  annual_fee TEXT DEFAULT 'N/A',
  apr TEXT DEFAULT 'N/A',
  rewards TEXT DEFAULT '—',
  signup_bonus TEXT DEFAULT '—',
  category TEXT DEFAULT 'cashback',
  rating INTEGER DEFAULT 4,
  affiliate_link TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional - disable for easier testing)
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON cards
  FOR SELECT USING (true);

-- Allow authenticated insert/update/delete
CREATE POLICY "Allow authenticated insert" ON cards
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON cards
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete" ON cards
  FOR DELETE USING (true);

-- Insert sample data
INSERT INTO cards (bank_name, card_name, annual_fee, apr, rewards, signup_bonus, category, rating, affiliate_link)
VALUES 
  ('Dutch-Bangla Bank', 'DBBL Visa Signature', '৳6,000', '15%', 'Points on all spends; annual health checkup', 'Priority Pass – 1,300+ airport lounges', 'travel', 5, ''),
  ('Dutch-Bangla Bank', 'DBBL Mastercard World', '৳6,000', '15%', 'Reward points + airport pick/drop (DAC, CGP, ZYL)', 'Unlimited intl. lounge access + 3 guests', 'travel', 5, ''),
  ('The City Bank', 'City Bank Amex Platinum', '৳10,000', '27%', '10x points at Agora; unlimited lounge access', 'FlexiBuy 0% EMI (3–36 months)', 'travel', 5, ''),
  ('The City Bank', 'City Bank Mastercard World Elite', '৳15,000', '27%', 'Elite lifestyle rewards; investment advisory', '৳10,000 welcome voucher', 'travel', 5, ''),
  ('BRAC Bank', 'BRAC Bank Visa Infinite', '৳25,000', '27%', 'High reward points; Priority Pass lounge access', 'BOGO hotel stays; travel insurance', 'travel', 5, ''),
  ('BRAC Bank', 'BRAC Bank Visa Signature', '৳1,500–৳25,000', '27%', 'Reward points; fee waived after 18 txns/yr', 'Free supplementary card', 'travel', 4, ''),
  ('Eastern Bank (EBL)', 'EBL Visa Platinum', '৳0 (yr 1 free)', '27%', '3x pts on dining & travel; EBL SkyLounge access', 'BOGO buffet offers; EMI at 900+ merchants', 'travel', 4, ''),
  ('Eastern Bank (EBL)', 'EBL Diners Club International', 'Lifetime free*', '27%', '5% cashback at Agora/Meena Bazar; 10% at Aarong', 'Up to ৳30,000 hospitalization coverage', 'cashback no-fee', 4, ''),
  ('Standard Chartered BD', 'SC Smart Visa Platinum', '৳3,000 (waivable)', '26%', '8% cashback groceries; 10% cashback dining', '৳22,000/yr savings via Foodpanda deals', 'cashback', 5, ''),
  ('Mutual Trust Bank', 'MTB Visa Signature', '৳10,000', '27%', '2 pts per ৳50; airport pick/drop; intl. lounge', 'Local lifestyle perks & merchant discounts', 'travel', 4, ''),
  ('United Commercial Bank', 'UCB Visa Classic', 'Low / waivable', '27%', '1x points on all purchases', '10% initial cashback for new users', 'cashback no-fee', 3, ''),
  ('The City Bank', 'Biman Bangladesh Amex', '৳1,500', '27%', 'Air miles on every purchase; lounge access', 'Complimentary companion buffet at top restaurants', 'travel', 4, '')
ON CONFLICT DO NOTHING;

-- Verify the data
SELECT * FROM cards LIMIT 5;
