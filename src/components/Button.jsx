export default function Button({
  children,
  type,
  ...props
}) {
  return (
    <button
      type={type}
      className="btn"
      {...props}
    >
      {children}
    </button>
  );
}
