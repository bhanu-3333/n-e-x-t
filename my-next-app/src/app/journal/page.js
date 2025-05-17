"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JournalPage() {
  const [dream, setDream] = useState({
    title: "",
    description: "",
    mood: "",
    emoji: "",
    theme: "",
    isPublic: false,
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDream({ ...dream, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = () => {
    const newEntry = {
      ...dream,
      date: new Date().toISOString().split("T")[0],
    };
    const existing = JSON.parse(localStorage.getItem("dreamEntries") || "[]");
    localStorage.setItem("dreamEntries", JSON.stringify([...existing, newEntry]));
    router.push("/feed");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">✍️ Record a Dream</h2>
      <div className="space-y-4">
        <input name="title" placeholder="Title" value={dream.title} onChange={handleChange} className="w-full p-2 rounded" />
        <textarea name="description" placeholder="Describe your dream..." value={dream.description} onChange={handleChange} className="w-full p-2 rounded" />
        <input name="emoji" placeholder="Emoji 😴" value={dream.emoji} onChange={handleChange} className="w-full p-2 rounded" />
        <input name="mood" placeholder="Mood (Happy, Scared, etc.)" value={dream.mood} onChange={handleChange} className="w-full p-2 rounded" />
        <input name="theme" placeholder="Theme (Adventure, Nightmare...)" value={dream.theme} onChange={handleChange} className="w-full p-2 rounded" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isPublic" checked={dream.isPublic} onChange={handleChange} />
          Make Public
        </label>
        <button onClick={handleSubmit} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Save Dream</button>
      </div>
    </div>
  );
}
