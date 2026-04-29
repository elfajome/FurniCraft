# FurniCraft

<div align="center">

### Modern Furniture E-Commerce Experience Built with React + Vite

![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

</div>

---

## Live Demo

> Coming soon...

**Demo URL Placeholder:** `https://your-live-demo-link-here`

---

## Preview

> Replace the image below with a real screenshot from your project UI.

![FurniCraft Preview](https://via.placeholder.com/1400x750.png?text=FurniCraft+Preview+Screenshot)

---

## Why FurniCraft?

FurniCraft is a stylish furniture storefront focused on clean UI, smooth browsing, and modern e-commerce interactions.  
It includes product listing, details, wishlist, cart flow, comparison, checkout, and account pages in one cohesive React app architecture.

---

## Features

- Elegant homepage with hero, featured products, and inspiration sections
- Shop page with product browsing and details page per item
- Cart management with quantity-aware state
- Wishlist system with real-time counter badges
- Product comparison page for side-by-side decision support
- Checkout and account flows ready for backend integration
- Fully componentized layout with reusable UI parts
- Responsive design patterns for desktop and mobile

---

## Tech Stack

- **Frontend:** React 19, React DOM
- **Build Tool:** Vite 7
- **Routing:** React Router DOM 7
- **State Management:** Redux Toolkit + React Redux
- **Styling:** Tailwind CSS 4
- **Icons:** React Icons
- **Linting:** ESLint 9

---

## Project Structure

```bash
FurniCraft/
├── src/
│   ├── api/              # API client setup
│   ├── components/       # Layout, common, sections, UI components
│   ├── config/           # Environment and app-level config
│   ├── pages/            # Route pages (Home, Shop, Cart, Checkout, etc.)
│   ├── services/         # Service layer for products, auth, cart, wishlist
│   ├── store/            # Redux store + slices
│   ├── utils/            # Utility helpers
│   ├── App.jsx           # Route definitions
│   └── main.jsx          # App bootstrap
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/<your-username>/FurniCraft.git
cd FurniCraft
```

### 2) Install dependencies

```bash
npm install
```

### 3) Start development server

```bash
npm run dev
```

### 4) Build for production

```bash
npm run build
```

### 5) Preview production build

```bash
npm run preview
```

---

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

---

## Roadmap

- [ ] Add real backend integration and authentication persistence
- [ ] Add product search and advanced filtering
- [ ] Add order history in account section
- [ ] Add unit/integration tests
- [ ] Deploy and link live demo

---

## Contributing

Contributions, ideas, and suggestions are welcome.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Author

**Your Name**  
GitHub: [@your-username](https://github.com/your-username)

---

## License

This project is currently unlicensed.  
You can add an `MIT` license by creating a `LICENSE` file.
