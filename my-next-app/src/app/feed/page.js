"use client";
import { useEffect, useState } from "react";

export default function FeedPage() {
  const [publicDreams, setPublicDreams] = useState([]);

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem("dreamEntries") || "[]");
    setPublicDreams(entries.filter((entry) => entry.isPublic));
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">🌐 Public Dream Feed</h2>
      {publicDreams.length === 0 ? (
        <p className="text-gray-600">No public dreams yet.</p>
      ) : (
        <ul className="space-y-4">
          {publicDreams.map((dream, idx) => (
            <li key={idx} className="bg-white rounded shadow p-4">
              <h3 className="text-xl font-semibold">{dream.emoji} {dream.title}</h3>
              <p className="text-sm text-gray-500">{dream.date} • Mood: {dream.mood} • Theme: {dream.theme}</p>
              <p className="mt-2 text-gray-800">{dream.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
