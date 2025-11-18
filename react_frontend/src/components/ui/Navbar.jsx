import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Navbar.module.css";

/**
 * PUBLIC_INTERFACE
 * Navbar - Responsive, accessible navigation bar for modern React apps.
 *
 * @param {Array<{label: string, href: string, external?: boolean}>} [links] - Navigation links.
 * @param {string} brand - Brand text or title.
 * @param {React.ReactNode} [logo] - Optional logo (React node element).
 * @param {boolean} [fixed=false] - If true, navbar is fixed to the top.
 * @param {boolean} [transparent=false] - If true, navbar background is transparent.
 * @param {function} [onLinkClick] - Callback(link, index) when a nav link is clicked.
 * @param {string} [className] - Additional classnames.
 * @returns {JSX.Element}
 */
function Navbar({
  brand = "KaviaApp",
  logo,
  links,
  fixed = false,
  transparent = false,
  onLinkClick,
  className = "",
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Navbar links: fallback if none supplied
  const navLinks = Array.isArray(links) && links.length > 0
    ? links
    : [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ];

  // Handle link: click closes menu & notifies parent
  const handleLink = (link, idx, e) => {
    if (onLinkClick) onLinkClick(link, idx, e);
    setMenuOpen(false);
  };

  // Accessibility: close menu with Esc key
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && menuOpen) setMenuOpen(false);
  };

  // Compose navbar classes
  const navbarClass = clsx(
    styles.navbar,
    fixed && styles.fixed,
    transparent && styles.transparent,
    className
  );

  // Mobile menu button aria-label
  const menuToggleLabel = menuOpen ? "Close main menu" : "Open main menu";

  return (
    <nav
      className={navbarClass}
      aria-label="Main navigation"
      role="navigation"
      onKeyDown={handleKeyDown}
      data-testid="navbar"
    >
      <div className={styles.container}>
        {/* Brand/Logo section */}
        <a href="/" className={styles.brand} tabIndex={0}>
          {logo ? (
            <span className={styles.logo} aria-hidden="true">
              {logo}
            </span>
          ) : null}
          <span className={styles.title}>{brand}</span>
        </a>

        {/* Desktop nav links */}
        <ul className={styles.links} role="menubar">
          {navLinks.map((link, idx) => (
            <li key={link.label + link.href} role="none">
              <a
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={styles.link}
                tabIndex={0}
                onClick={e => handleLink(link, idx, e)}
                role="menuitem"
                aria-label={link.label}
              >
                {link.label}
                {link.external && (
                  <span className={styles.external} aria-hidden="true" title="Opens in new tab">↗</span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger for mobile */}
        <button
          className={clsx(styles.menuToggle, menuOpen && styles.open)}
          aria-label={menuToggleLabel}
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-menu"
          onClick={() => setMenuOpen(v => !v)}
          tabIndex={0}
          type="button"
        >
          <span className={styles.menuIcon}>
            {/* Animated icon */}
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* Mobile menu: rendered below main nav bar */}
      <div
        id="navbar-mobile-menu"
        className={clsx(styles.mobileMenu, menuOpen && styles.show)}
        hidden={!menuOpen}
        tabIndex={-1}
        role="menu"
      >
        <ul className={styles.mobileLinks} aria-label="Mobile navigation">
          {navLinks.map((link, idx) => (
            <li key={link.label + link.href} role="none">
              <a
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={styles.link}
                tabIndex={0}
                onClick={e => handleLink(link, idx, e)}
                role="menuitem"
                aria-label={link.label}
              >
                {link.label}
                {link.external && (
                  <span className={styles.external} aria-hidden="true" title="Opens in new tab">↗</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      external: PropTypes.bool,
    })
  ),
  brand: PropTypes.string,
  logo: PropTypes.node,
  fixed: PropTypes.bool,
  transparent: PropTypes.bool,
  onLinkClick: PropTypes.func,
  className: PropTypes.string,
};

export default Navbar;
