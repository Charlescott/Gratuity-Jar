# Code Review: Gratuity Jar Application

---

## Critical Issues

### 1. **Database Schema Typo**

**File:** `server/db/schema.sql:21`

```sql
frequency TEXT CHECK (frequncy IN ('daily', 'weekly', 'monthly') ) DEFAULT 'daily',
```

**Issue:** Column name is `frequency` but the CHECK constraint references `frequncy` (typo).
**Fix:** Change to `CHECK (frequency IN ('daily', 'weekly', 'monthly'))`

### 2. **Hardcoded API URLs**

**Files:** Multiple client files

- `client/src/pages/Login.jsx:19`
- `client/src/pages/Register.jsx:14`
- `client/src/pages/GratitudeEntries.jsx:38, 71, 90`
- `client/src/api/questions.js:2`

**Issue:** All API calls use hardcoded `http://localhost:5000`. This breaks in production and makes the app non-portable.
**Fix:** Create an API configuration file:

```javascript
// client/src/config/api.js
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";
```

---

## High Priority Issues

### 3. **Console.log in Production Code**

**Files:**

- `server/routes/entries.js:49, 70`
- `server/middleware/requireUser.js:23`

**Issue:** Debug console.log statements left in code.
**Fix:** Remove or replace with proper logging library (e.g., `winston`, `pino`).

---

## Medium Priority Issues

### 4. **CSS Typo**

**File:** `client/src/index.css:264`

```css
color: var(iimuted-text);
```

**Issue:** Typo - should be `var(--muted-text)`

### 5. **SQL Query Formatting**

**File:** `server/routes/entries.js:10`

```sql
"SELECT * FROM gratitude_entries WHERE user_id =$1 ORDER BY created_at DESC",
```

**Issue:** Missing space before `$1` (minor formatting issue).

### 6. **Unused/Commented Code**

**File:** `client/src/Layout.jsx`
**Issue:** Entire file is commented out. Should be removed or implemented.

### 7. **Missing Content Validation**

**File:** `server/routes/entries.js:38`
**Issue:** No validation that `content` or `mood` is not empty or only whitespace.
**Fix:** Add validation:

```javascript
if (!content || !content.trim()) {
  return res.status(400).json({ error: "Content cannot be empty" });
}

if (!mood || !mood.trim()) {
  return res.status(400).json({ error: "Mood cannot be empty" });
}
```

---

## Questions

### 1. **Why is Pool connection used over a Client connection?**

**File:** `server/db/index.js:7`

---

## Positive Aspects

1. **SQL Injection Protection:** All queries use parameterized queries - excellent!
2. **Password Hashing:** Using bcrypt with proper salt rounds
3. **JWT Authentication:** Proper token-based auth implementation
4. **User Isolation:** Entries are properly scoped to users
5. **Clean Component Structure:** Good separation of concerns
6. **Modern React Patterns:** Using hooks appropriately
7. **Responsive Design:** CSS includes theme support and good styling
