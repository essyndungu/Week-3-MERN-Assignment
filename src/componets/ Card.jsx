export default function Card({ title, children }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg dark:bg-gray-800">
      <h2 className="font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
}
