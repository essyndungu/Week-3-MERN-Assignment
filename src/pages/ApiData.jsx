import { useState, useEffect } from "react";

export default function ApiData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = data.filter(item => item.title.includes(search));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded mb-4 w-full"
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map(post => (
          <div key={post.id} className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
