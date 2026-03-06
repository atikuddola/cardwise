# Credit Card Data Format

Use this format when collecting card information from banks/websites. Copy and paste the entire block for each card.

---

## Card Entry Format

```
BANK_NAME: [Bank Name]
CARD_NAME: [Card Name]
ANNUAL_FEE: [Annual Fee - e.g., ৳6,000 or Lifetime free]
APR: [APR - e.g., 15% or 27%]
REWARDS: [Rewards/Benefits - e.g., 2x points on dining]
SIGNUP_BONUS: [Sign-up Bonus - e.g., ৳10,000 welcome voucher]
CATEGORY: [Category - travel, cashback, cashback no-fee, no-fee, student, islamic]
RATING: [1-5 - e.g., 4]
AFFILIATE_LINK: [URL or leave empty]
IMAGE_URL: [Image URL or leave empty]
```

---

## Examples

### Example 1: Travel Card
```
BANK_NAME: Dutch-Bangla Bank
CARD_NAME: DBBL Visa Signature
ANNUAL_FEE: ৳6,000
APR: 15%
REWARDS: Points on all spends; annual health checkup
SIGNUP_BONUS: Priority Pass – 1,300+ airport lounges
CATEGORY: travel
RATING: 5
AFFILIATE_LINK: 
IMAGE_URL: 
```

### Example 2: Cashback Card
```
BANK_NAME: Standard Chartered BD
CARD_NAME: SC Smart Visa Platinum
ANNUAL_FEE: ৳3,000 (waivable)
APR: 26%
REWARDS: 8% cashback groceries; 10% cashback dining
SIGNUP_BONUS: ৳22,000/yr savings via Foodpanda deals
CATEGORY: cashback
RATING: 5
AFFILIATE_LINK: https://example.com/apply
IMAGE_URL: 
```

### Example 3: No Annual Fee Card
```
BANK_NAME: Eastern Bank (EBL)
CARD_NAME: EBL Diners Club International
ANNUAL_FEE: Lifetime free*
APR: 27%
REWARDS: 5% cashback at Agora/Meena Bazar; 10% at Aarong
SIGNUP_BONUS: Up to ৳30,000 hospitalization coverage
CATEGORY: cashback no-fee
RATING: 4
AFFILIATE_LINK: 
IMAGE_URL: 
```

### Example 4: Student Card
```
BANK_NAME: BRAC Bank
CARD_NAME: BRAC Student Card
ANNUAL_FEE: ৳500
APR: 24%
REWARDS: 1x points on all purchases; cashback on food delivery
SIGNUP_BONUS: Free gift voucher on first use
CATEGORY: student
RATING: 3
AFFILIATE_LINK: 
IMAGE_URL: 
```

---

## Valid Category Values

| Category | Description |
|----------|-------------|
| `travel` | Travel rewards cards |
| `cashback` | Cash back cards |
| `cashback no-fee` | Cash back + no annual fee |
| `no-fee` | No annual fee cards |
| `student` | Student credit cards |
| `islamic` | Islamic/Sharia-compliant cards |

---

## How to Add Cards

### Option 1: Admin Dashboard
1. Login to /admin
2. Click "➕ Add Card"
3. Fill in the form using the data from above format

### Option 2: Direct Supabase Insert
```sql
INSERT INTO cards (bank_name, card_name, annual_fee, apr, rewards, signup_bonus, category, rating, affiliate_link, image_url)
VALUES (
  'Bank Name',
  'Card Name',
  '৳6,000',
  '15%',
  'Rewards description',
  'Signup bonus description',
  'travel',
  5,
  '',
  ''
);
```

---

## Quick Reference

| Field | Required | Example |
|-------|----------|---------|
| bank_name | Yes | Dutch-Bangla Bank |
| card_name | Yes | DBBL Visa Signature |
| annual_fee | No | ৳6,000 or "Lifetime free" |
| apr | No | 15% or "N/A" |
| rewards | No | 2x points on dining |
| signup_bonus | No | ৳10,000 voucher |
| category | No | cashback |
| rating | No | 4 |
| affiliate_link | No | https://... |
| image_url | No | https://... |
