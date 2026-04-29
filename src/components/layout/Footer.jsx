import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="footer" className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link to="/" className="text-2xl font-extrabold text-text">
              FurniCraft.
            </Link>
            <p className="mt-6 text-sm text-text-muted leading-relaxed">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 745823 MUS
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-text-muted font-semibold">Links</p>
            <ul className="mt-6 space-y-4 text-sm font-medium">
              <li>
                <Link className="hover:text-primary transition-colors" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" to="/blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm text-text-muted font-semibold">Help</p>
            <ul className="mt-6 space-y-4 text-sm font-medium">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Payment Options
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Returns
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Privacy Policies
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm text-text-muted font-semibold">Newsletter</p>
            <form
              className="mt-6 flex items-center gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="flex-1 bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="text-sm font-semibold tracking-wide border-b border-text py-2 hover:text-primary hover:border-primary transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-text-muted">
            {new Date().getFullYear()} FurniCraft. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
