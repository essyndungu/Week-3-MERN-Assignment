export default function Button({ variant = "primary", children, ...props }) {
  const base = "px-4 py-2 rounded font-semibold transition";
  const styles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  return <button className={`${base} ${styles[variant]}`} {...props}>{children}</button>;
}
