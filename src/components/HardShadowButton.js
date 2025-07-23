import { Link } from 'react-router-dom';

/**
 * A versatile hard-shadow button component.
 * @param {string} variant - 'primary' (default, accent color), 'secondary' (surface color), 'contact' (special styling for contact)
 * @param {string} href - for <a> tags
 * @param {string} to - for <Link> tags
 * @param {function} onClick - for <button> tags
 */
const HardShadowButton = ({ href, to, children, variant = 'primary', className = '', ...props }) => {

  const handleContactClick = (e) => {
    // This logic is specifically for the contact variant
    if (variant === 'contact') {
      e.preventDefault();
      window.location.href = 'mailto:muhumuzadeus.ai@gmail.com';
      if (props.onClick) props.onClick(e);
    } else if (props.onClick) {
      props.onClick(e);
    }
  };

  const faceClasses = {
    primary: 'bg-accent text-accent-text',
    secondary: 'bg-surface text-text-primary',
    contact: 'bg-accent text-accent-text dark:bg-surface dark:text-accent',
  };

  const baseClasses = `relative z-10 block border-2 border-border px-6 py-2.5 text-center font-bold text-base transition-transform duration-150 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-1.5 -translate-y-1.5`;
  const combinedFaceClasses = `${baseClasses} ${faceClasses[variant] || faceClasses.primary}`;

  const content = (
    <>
      <span className={combinedFaceClasses}>{children}</span>
      <span className="absolute inset-0 border-2 border-border bg-shadow"></span>
    </>
  );

  const commonWrapperClasses = `group relative inline-block ${className}`;

  if (to) {
    return <Link to={to} className={commonWrapperClasses} {...props}>{content}</Link>;
  }
  if (href) {
    return <a href={href} className={commonWrapperClasses} {...props}>{content}</a>;
  }
  return <button onClick={handleContactClick} className={commonWrapperClasses} {...props}>{content}</button>;
};

export default HardShadowButton;