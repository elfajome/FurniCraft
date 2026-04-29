import { forwardRef } from 'react'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover border-transparent',
  secondary: 'bg-secondary text-white hover:opacity-90 border-transparent',
  outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary-light',
  ghost: 'bg-transparent text-text hover:bg-surface-alt border-transparent',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const Button = forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      type = 'button',
      className = '',
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center font-medium rounded-lg border transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant] || variants.primary}
          ${sizes[size] || sizes.md}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
