-- Seed realistic buyer demand records for Agrios demand board
-- Uses subqueries for crop_id so IDs don't need to be hardcoded
-- buyer_id references the admin account as placeholder buyer

INSERT INTO buyer_demands 
  (buyer_id, buyer_name, crop_id, quantity_display, offered_price, price_unit,
   delivery_location, delivery_state, deadline, contact_email, contact_phone, 
   notes, status, is_verified_buyer, expires_at)
SELECT 
  (SELECT id FROM users WHERE role='admin' LIMIT 1),
  'Dangote Foods Ltd',
  cr.id,
  '50 tonnes',
  99000,
  '50kg bag',
  'Mile 12 Market, Lagos',
  'Lagos',
  NOW() + INTERVAL '14 days',
  'procurement@dangotefoods.example.ng',
  '08031234567',
  'Grade A maize only. Must be dry, <14% moisture. Bulk preferred. Payment within 48h of delivery.',
  'open',
  true,
  NOW() + INTERVAL '14 days'
FROM crops cr WHERE LOWER(cr.name)='maize' LIMIT 1;

INSERT INTO buyer_demands 
  (buyer_id, buyer_name, crop_id, quantity_display, offered_price, price_unit,
   delivery_location, delivery_state, deadline, contact_email, contact_phone, 
   notes, status, is_verified_buyer, expires_at)
SELECT 
  (SELECT id FROM users WHERE role='admin' LIMIT 1),
  'Northern Groundnut Exporters',
  cr.id,
  '20 tonnes',
  90000,
  '50kg bag',
  'Kano Free Trade Zone',
  'Kano',
  NOW() + INTERVAL '21 days',
  'buy@ngexport.example.ng',
  '08057891234',
  'Sound bold groundnuts, aflatoxin-tested. Export quality only. Willing to pay premium for certified stock.',
  'open',
  true,
  NOW() + INTERVAL '21 days'
FROM crops cr WHERE LOWER(cr.name)='groundnut' LIMIT 1;

INSERT INTO buyer_demands 
  (buyer_id, buyer_name, crop_id, quantity_display, offered_price, price_unit,
   delivery_location, delivery_state, deadline, contact_email, contact_phone, 
   notes, status, is_verified_buyer, expires_at)
SELECT 
  (SELECT id FROM users WHERE role='admin' LIMIT 1),
  'Abuja Farm Fresh Ltd',
  cr.id,
  '500 baskets',
  24000,
  'basket',
  'Wuse Market, Abuja',
  'FCT',
  NOW() + INTERVAL '7 days',
  'orders@abujafarmfresh.example.ng',
  '08096543210',
  'Fresh tomatoes, ripe but firm. Weekly standing order — reliable suppliers only.',
  'open',
  false,
  NOW() + INTERVAL '7 days'
FROM crops cr WHERE LOWER(cr.name)='tomato' LIMIT 1;

INSERT INTO buyer_demands 
  (buyer_id, buyer_name, crop_id, quantity_display, offered_price, price_unit,
   delivery_location, delivery_state, deadline, contact_email, contact_phone, 
   notes, status, is_verified_buyer, expires_at)
SELECT 
  (SELECT id FROM users WHERE role='admin' LIMIT 1),
  'Enugu Milling Co.',
  cr.id,
  '30 tonnes',
  44000,
  '50kg bag',
  'New Market, Enugu',
  'Enugu',
  NOW() + INTERVAL '10 days',
  'mill@enugumill.example.ng',
  '08112233445',
  'Cassava for industrial starch processing. Must meet moisture standard. Regular contract possible.',
  'open',
  true,
  NOW() + INTERVAL '10 days'
FROM crops cr WHERE LOWER(cr.name)='cassava' LIMIT 1;

INSERT INTO buyer_demands 
  (buyer_id, buyer_name, crop_id, quantity_display, offered_price, price_unit,
   delivery_location, delivery_state, deadline, contact_email, contact_phone, 
   notes, status, is_verified_buyer, expires_at)
SELECT 
  (SELECT id FROM users WHERE role='admin' LIMIT 1),
  'PH Grocery Wholesalers',
  cr.id,
  '200 bags',
  64000,
  '50kg bag',
  'Rumuola Market, Port Harcourt',
  'Rivers',
  NOW() + INTERVAL '5 days',
  'bulk@phgrocery.example.ng',
  '08167890123',
  'Long grain parboiled rice. Must be sorted, stone-free. Payment on delivery.',
  'open',
  false,
  NOW() + INTERVAL '5 days'
FROM crops cr WHERE LOWER(cr.name)='rice' LIMIT 1;
