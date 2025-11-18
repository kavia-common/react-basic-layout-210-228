import React from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

/**
 * PUBLIC_INTERFACE
 * Button - Customizable, accessible button for modern React apps.
 *
 * Props:
 * @param {'primary'|'secondary'|'success'|'ghost'} [variant='primary'] - Button color style.
 * @param {'sm'|'md'|'lg'} [size='md'] - Button size.
 * @param {boolean} [fullWidth=false] - If true, button takes full width of container.
 * @param {boolean} [loading=false] - Shows loading state (spinning indicator if possible).
 * @param {boolean} [disabled=false] - Disables button (either by prop or when loading).
 * @param {function} [onClick] - Click handler.
 * @param {'button'|'submit'|'reset'} [type='button'] - Button type.
 * @param {string} [className] - Custom class names.
 * @param {React.ReactNode} children - Button contents.
 *
 * Accessibility:
 * - Adds aria-busy when loading, disables interaction and communicates busy state.
 * - Sets type prop (button, submit, reset) for correctness in forms.
 */
const VARIANTS = ['primary', 'secondary', 'success', 'ghost'];
const SIZES = ['sm', 'md', 'lg'];

export const Button = React.forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled = false,
      onClick,
      type = "button",
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const v = VARIANTS.includes(variant) ? variant : "primary";
    const s = SIZES.includes(size) ? size : "md";

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
        aria-busy={loading}
        aria-disabled={isDisabled}
        onClick={onClick}
        tabIndex={isDisabled ? -1 : 0}
        {...rest}
      >
        {/* Loading indicator (CSS spinner or text fallback) */}
        {loading ? (
          <span className={styles["spinner"]} aria-hidden="true" />
        ) : null}
        <span className={clsx(loading && styles["invisible"])}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
