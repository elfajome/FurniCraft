# FurniCraft Architecture Guide

This document is the main technical reference for understanding how the project is structured, how data flows, and where each responsibility lives.

## 1) Project Purpose

`FurniCraft` is a React + Vite furniture storefront app with:
- Product browsing and details
- Cart and wishlist flows
- Basic auth-ready state and service layer
- Redux Toolkit for global state
- A service layer that now follows explicit `Facade` and `Singleton` patterns (functional style, no classes)

---

## 2) High-Level Architecture

Request/data flow in this project:

1. `src/main.jsx`
   - Bootstraps React and injects Redux `store`.
2. `src/App.jsx`
   - Defines route tree (`/`, `/shop`, `/shop/:id`, `/cart`, ...).
3. `src/components/layout/Layout.jsx`
   - Shared frame (`Header`, `Footer`, `ScrollToTop`, `Outlet`).
4. Pages under `src/pages/*`
   - Render UI and dispatch Redux actions.
5. Redux slices under `src/store/slices/*`
   - Hold state + reducers + async thunks.
   - Consume app services through `servicesFacade`.
6. `src/services/index.js` (`Facade`)
   - Unified gateway for feature layers to call domain services.
7. Service implementations
   - API-based: `productService`, `authService`
   - Browser storage: `cartService`, `wishlistService`
8. API core `src/api/client.js` (`Singleton`)
   - One shared API client instance + request helpers.

---

## 3) Pattern Usage (Current)

### `Singleton` (explicit)
- File: `src/api/client.js`
- `getApiClient()` returns a single frozen client instance.
- `api` is derived from that singleton and reused everywhere.
- Benefit: one centralized HTTP behavior surface.

### `Facade` (explicit)
- File: `src/services/index.js`
- `servicesFacade` exposes stable domains:
  - `servicesFacade.products.*`
  - `servicesFacade.auth.*`
  - `servicesFacade.cart.*`
  - `servicesFacade.wishlist.*`
- Benefit: feature code does not depend on internal service file layout.

---

## 4) Source Tree Responsibilities

## `src/`

### App shell and wiring
- `main.jsx`: App entrypoint, Redux Provider setup.
- `App.jsx`: Central route map.
- `index.css`: Global styles and utility classes.

### Configuration and shared utilities
- `config/env.js`: Centralized Vite environment read model.
- `utils/formatEgp.js`: EGP money formatting helper.

### API layer
- `api/client.js`: URL building, HTTP request wrapper, singleton API client.

### Service layer
- `services/index.js`: App service facade + exports.
- `services/api.endpoints.js`: All backend route constants in one place.
- `services/productService.js`: Product data source (mock/API switch).
- `services/authService.js`: Auth data source (mock/API switch).
- `services/cartService.js`: Cart persistence in localStorage.
- `services/wishlistService.js`: Wishlist persistence in localStorage.

### State management
- `store/index.js`: Redux store creation and slice registration.
- `store/slices/productsSlice.js`: Product list, categories, selected product.
- `store/slices/authSlice.js`: User/token/loading/error and auth thunks.
- `store/slices/cartSlice.js`: Cart line items + quantity + totals/selectors.
- `store/slices/wishlistSlice.js`: Wishlist items + selectors/toggles.

### UI composition
- `components/layout/*`: Global layout frame (`Header`, `Footer`, `Layout`).
- `components/common/*`: Reusable page-level helpers (`PageHero`, `Pagination`, `ScrollToTop`).
- `components/sections/*`: Section-level blocks (`FeaturesStrip`).
- `components/ui/*`: Primitive/reusable UI building blocks (`Button`, `Input`, `ProductCard`).

### Pages
- `pages/Home.jsx`: Landing and merchandising sections.
- `pages/Products.jsx`: Product listing and filtering-related UI.
- `pages/ProductDetail.jsx`: Product details and item-level actions.
- `pages/Cart.jsx`: Cart table, quantity updates, totals.
- `pages/Wishlist.jsx`: Wishlist grid and add-to-cart path.
- `pages/Checkout.jsx`: Checkout screen scaffold/flow.
- `pages/Account.jsx`: Account page scaffold.
- `pages/Blog.jsx`: Blog page scaffold.
- `pages/About.jsx`: About page content.
- `pages/Contact.jsx`: Contact page content.
- `pages/Comparison.jsx`: Product comparison page scaffold.

---

## 5) Data Ownership and Boundaries

- UI components/pages:
  - Should focus on rendering and interaction.
  - Should avoid direct infrastructure access (`fetch`, `localStorage`).
- Redux slices:
  - Own state transitions and async orchestration.
  - Call `servicesFacade` only.
- Services:
  - Own external interactions (HTTP/storage).
- API client:
  - Own cross-cutting HTTP concerns (headers, errors, base URL).

This boundary keeps business logic readable and easier to swap later.

---

## 6) Route Map

Declared in `src/App.jsx`:

- `/` -> `Home`
- `/shop` -> `Products`
- `/shop/:id` -> `ProductDetail`
- `/products` -> `Products` (backward compatibility)
- `/products/:id` -> `ProductDetail` (backward compatibility)
- `/cart` -> `Cart`
- `/checkout` -> `Checkout`
- `/contact` -> `Contact`
- `/blog` -> `Blog`
- `/compare` -> `Comparison`
- `/wishlist` -> `Wishlist`
- `/about` -> `About`
- `/account` -> `Account`

---

## 7) How To Add New Features (Recommended Workflow)

For a new domain (example: `orders`):

1. Add endpoints in `services/api.endpoints.js`.
2. Create service implementation `services/orderService.js`.
3. Expose it from `servicesFacade` in `services/index.js`.
4. Add `store/slices/ordersSlice.js` for state and thunks.
5. Register reducer in `store/index.js`.
6. Use slice actions/selectors from page/components.

Rule: new feature layers consume only `servicesFacade`, not direct infra.

---

## 8) Conventions Used

- Functional JavaScript style (no classes).
- One responsibility per folder layer.
- Centralized endpoint/config definitions.
- Centralized service gateway (`Facade`).
- Centralized API instance (`Singleton`).

---

## 9) Quick Onboarding Checklist

New developer learning order:

1. Read `src/App.jsx` (routes and page map).
2. Read `src/store/index.js` (state domains).
3. Read slices in `src/store/slices/*` (behavior).
4. Read `src/services/index.js` (service gateway).
5. Read `src/api/client.js` and `src/services/*.js` (infra).
6. Jump to target page/component for UI details.

If you follow this order, you can trace any feature from screen -> state -> service -> API/storage quickly.
