"use client";
import { useState, useEffect } from "react";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😎", label: "Cool" },
];

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setHistory(saved);
  }, []);

  const handleMood = (mood) => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      mood,
    };
    const updated = [...history, newEntry];
    setHistory(updated);
    localStorage.setItem("moodHistory", JSON.stringify(updated));
    setSelectedMood(mood);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-300 to-purple-300 p-8">
      <h1 className="text-4xl font-bold mb-4 text-white">How are you feeling today?</h1>
      <div className="flex gap-4 mb-6">
        {moods.map((m) => (
          <button
            key={m.label}
            className="text-3xl bg-white rounded-full shadow p-4 hover:scale-110 transition"
            onClick={() => handleMood(m)}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      {selectedMood && (
        <p className="text-xl text-white mb-6">
          You selected: <strong>{selectedMood.label}</strong> {selectedMood.emoji}
        </p>
      )}

      <h2 className="text-2xl font-semibold text-white mb-2">Mood History</h2>
      <ul className="bg-white rounded-lg p-4 w-full max-w-md shadow space-y-2">
        {history.map((entry, index) => (
          <li key={index} className="flex justify-between">
            <span>{entry.date}</span>
            <span>{entry.mood.emoji} {entry.mood.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
