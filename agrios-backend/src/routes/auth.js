# Auth register route patch

In `agrios-backend/src/routes/auth.js`, find the POST /register handler.

## 1. Destructure the new fields from req.body

**Before:**
```js
const { full_name, email, password, phone, state, role } = req.body;
```

**After:**
```js
const {
  full_name, email, password, phone, state, role,
  lga, harvest_size_kg, crops_grown, buyer_contact_consent
} = req.body;
```

## 2. Add them to the INSERT query

**Before** (your existing INSERT):
```js
const result = await query(
  `INSERT INTO users (full_name, email, password_hash, phone, state, role)
   VALUES ($1, $2, $3, $4, $5, $6)
   RETURNING id, full_name, email, phone, state, role, subscription_tier, is_verified, created_at`,
  [full_name, email, passwordHash, phone || null, state || null, role || 'farmer']
);
```

**After:**
```js
const result = await query(
  `INSERT INTO users
     (full_name, email, password_hash, phone, state, lga, role,
      crops_grown, harvest_size_kg, buyer_contact_consent)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
   RETURNING id, full_name, email, phone, state, lga, role,
             crops_grown, harvest_size_kg, buyer_contact_consent,
             subscription_tier, is_verified, created_at`,
  [
    full_name,
    email,
    passwordHash,
    phone         || null,
    state         || null,
    lga           || null,
    role          || 'farmer',
    crops_grown   && crops_grown.length ? crops_grown : '{}',
    harvest_size_kg ? parseInt(harvest_size_kg) : null,
    buyer_contact_consent === true || buyer_contact_consent === 'true',
  ]
);
```

## 3. Mount the farmers route in index.js

In `agrios-backend/src/index.js`, add alongside the other route mounts:

```js
app.use('/api/farmers', require('./routes/farmers'));
```

That's the full patch. The farmers.js file is the new route file to add at `agrios-backend/src/routes/farmers.js`.
