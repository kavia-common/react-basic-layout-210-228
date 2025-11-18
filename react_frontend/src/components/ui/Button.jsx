import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Button.module.css";

/**
 * PUBLIC_INTERFACE
 * Button - Accessible, customizable button for modern React apps
 *
 * @param {'primary'|'secondary'|'success'|'outline'|'ghost'} [variant='primary'] - Button color style.
 * @param {'sm'|'md'|'lg'} [size='md'] - Button size.
 * @param {boolean} [disabled=false] - Disabled button or not.
 * @param {boolean} [fullWidth=false] - Stretch to container width if true.
 * @param {function} [onClick] - Click handler.
 * @param {'button'|'submit'|'reset'} [type='button'] - Button type.
 * @param {string} [className] - Additional classnames.
 * @param {React.ReactNode} children - Button label/content.
 * @param {boolean} [loading=false] - Show loading spinner and make aria-busy.
 * @param {React.ReactNode} [icon] - Icon element (displayed left by default).
 * @param {'left'|'right'} [iconPosition='left'] - Where to show the icon ('left' or 'right')
 * @param {string} [ariaLabel] - ARIA label for accessibility (button with icon only).
 *
 * @returns {JSX.Element}
 */
const VARIANTS = ["primary", "secondary", "success", "outline", "ghost"];
const SIZES = ["sm", "md", "lg"];

export const Button = React.forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      type = "button",
      disabled = false,
      fullWidth = false,
      loading = false,
      icon = null,
      iconPosition = "left",
      className = "",
      children,
      onClick,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const v = VARIANTS.includes(variant) ? variant : "primary";
    const s = SIZES.includes(size) ? size : "md";

    // Render spinner for loading state
    const spinner = (
      <span
        className={styles["spinner"]}
        aria-hidden="true"
        data-testid="button-spinner"
      />
    );

    // Simple icon wrapper for placement (optionally add spacing)
    const IconWrapper = ({ position }) =>
      icon ? (
        <span
          className={clsx(
            styles["button-icon"],
            position === "left"
              ? styles["icon-left"]
              : styles["icon-right"],
            loading && styles["invisible"]
          )}
        >
          {icon}
        </span>
      ) : null;

    // Buttons must have accessible text/label.
    const buttonAriaLabel =
      ariaLabel ||
      (typeof children === "string" ? children : undefined) ||
      undefined;

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          styles.button,
          styles[`variant-${v}`],
          styles[`size-${s}`],
          fullWidth && styles["full-width"],
          isDisabled && styles["disabled"],
          loading && styles["loading"],
          className
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-label={buttonAriaLabel}
        onClick={isDisabled ? undefined : onClick}
        tabIndex={isDisabled ? -1 : 0}
        {...rest}
      >
        {/* Loading spinner overlays icon/label */}
        {loading ? spinner : null}
        {icon && iconPosition === "left" ? <IconWrapper position="left" /> : null}
        {/* Children/label - hidden if loading for overlay effect */}
        <span className={clsx(loading && styles["invisible"])}>
          {children}
        </span>
        {icon && iconPosition === "right" ? <IconWrapper position="right" /> : null}
      </button>
    );
  }
);

// PropTypes for public interface documentation and dev validation
Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "outline",
    "ghost",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  "aria-label": PropTypes.string,
};

Button.defaultProps = {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  fullWidth: false,
  loading: false,
  icon: null,
  iconPosition: "left",
  className: "",
};

Button.displayName = "Button";
export default Button;
