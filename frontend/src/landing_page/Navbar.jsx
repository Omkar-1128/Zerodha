import React, { useEffect, useRef } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

function Navbar() {
  const menuRef = useRef(null);
  const togglerRef = useRef(null);

  useEffect(() => {
    const isMobile = () => window.matchMedia("(max-width: 991.98px)").matches;

    const closeMenu = () => {
      const menuEl = menuRef.current;
      if (!menuEl) return;

      if (window.bootstrap?.Collapse) {
        const collapse = window.bootstrap.Collapse.getOrCreateInstance(menuEl, {
          toggle: false,
        });
        collapse.hide();
      } else {
        menuEl.classList.remove("show");
        menuEl.setAttribute("aria-expanded", "false");
        if (togglerRef.current)
          togglerRef.current.setAttribute("aria-expanded", "false");
      }
    };

    const handleDocumentClick = (e) => {
      const menuEl = menuRef.current;
      const togglerEl = togglerRef.current;
      if (!menuEl) return;

      const menuIsOpen = menuEl.classList.contains("show");

      if (
        isMobile() &&
        menuIsOpen &&
        !menuEl.contains(e.target) &&
        (!togglerEl || !togglerEl.contains(e.target))
      ) {
        closeMenu();
      }
    };

    // ✅ Close menu when a nav link is clicked (mobile only)
    const handleNavLinkClick = () => {
      if (isMobile()) closeMenu();
    };

    // Attach event listeners
    document.addEventListener("click", handleDocumentClick);
    const links = document.querySelectorAll(".navbar-nav .nav-link");
    links.forEach((link) => link.addEventListener("click", handleNavLinkClick));

    // Cleanup on unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      links.forEach((link) =>
        link.removeEventListener("click", handleNavLinkClick)
      );
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-border">
        <div className="container">
          <Link to="/">
            <img className="nav-image" src="/Media/images/logo.svg" alt="Logo" />
          </Link>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            ref={menuRef}
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/Signup">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/About">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Support">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <button
            className="navbar-toggler d-lg-none nav-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            ref={togglerRef}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
