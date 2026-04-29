# Frontend to Backend Integration

This file explains the prepared structure so integration stays fast and clear.

## Current Structure

```
src/
├── api/
│   └── client.js          ← Unified HTTP client (base URL, headers, error handling)
├── config/
│   └── env.js             ← Reads VITE_* from environment
└── services/
    ├── api.endpoints.js   ← API paths in one place
    ├── productService.js  ← Product service calls (mock for now)
    ├── authService.js     ← Authentication service calls (mock for now)
    └── index.js
```

## Integration Steps

### 1) Enable API base URL

- Copy `.env.example` to `.env`
- Set the backend URL in `.env`:
  ```
  VITE_API_BASE_URL=http://localhost:5000/api
  ```
- Once `VITE_API_BASE_URL` exists, services automatically stop using mock mode (based on `USE_MOCK`).

### 2) Normalize response shape with backend

- If the backend returns `{ data: [...] }` or `{ items: [...] }`, adjust parsing in `api/client.js` or inside each service.
- If you need field-name mapping (`camelCase` ↔ `snake_case`), add mapping in `apiRequest` or service-level transforms.

### 3) Add auth token handling

- In `api/client.js`, read token (from Redux or localStorage) and add it to headers:
  ```js
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  ```
- Store token after `login` in Redux store or localStorage and use it on all requests.

### 4) Update endpoints if needed

- All routes are centralized in `services/api.endpoints.js` — if backend routes differ, update them there only.

### 5) Error handling

- Errors are thrown from `apiRequest` in a unified shape (`error.status`, `error.data`).
- Handle 401/403 or user-facing error messages in one place (e.g., fetch wrapper or interceptor pattern).

## Development Tips

- **Do not call `fetch` or axios directly from components** — always use services (e.g., `productService.getProducts()`).
- **Keep service calls inside Redux layer** — the slice calls `productService.getProducts()` and stores results; later this becomes a real API call without changing components.
- **Align with backend API shape early** — field names, pagination format, and error codes.

After these steps, backend integration will be ready with minimal changes to current code.
