"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun, Cloud, Star, Share2, Save, PenTool } from "lucide-react";

export default function JournalPage() {
  const [dream, setDream] = useState({
    title: "",
    description: "",
    mood: "",
    emoji: "😴",
    theme: "",
    isPublic: false,
  });
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Predefined mood options with emojis
  const moodOptions = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😢" },
    { label: "Scared", emoji: "😨" },
    { label: "Confused", emoji: "😕" },
    { label: "Excited", emoji: "🤩" },
    { label: "Peaceful", emoji: "😌" }
  ];
  
  // Theme options
  const themeOptions = [
    { label: "Adventure", icon: <Cloud className="h-4 w-4" /> },
    { label: "Nightmare", icon: <Moon className="h-4 w-4" /> },
    { label: "Fantasy", icon: <Star className="h-4 w-4" /> },
    { label: "Lucid", icon: <Sun className="h-4 w-4" /> },
    { label: "Memory", icon: <PenTool className="h-4 w-4" /> }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDream({ ...dream, [name]: type === "checkbox" ? checked : value });
  };

  const handleMoodSelect = (moodOption) => {
    setDream({ 
      ...dream, 
      mood: moodOption.label,
      emoji: moodOption.emoji 
    });
  };
  
  const handleThemeSelect = (theme) => {
    setDream({ ...dream, theme: theme.label });
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate saving delay
    setTimeout(() => {
      const newEntry = {
        ...dream,
        date: new Date().toISOString().split("T")[0],
        id: Date.now(), // Add unique ID
      };
      
      const existing = JSON.parse(localStorage.getItem("dreamEntries") || "[]");
      localStorage.setItem("dreamEntries", JSON.stringify([...existing, newEntry]));
      
      setLoading(false);
      router.push("/feed");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 py-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center">
            <Moon className="h-6 w-6 mr-2 text-indigo-600" />
            Record Your Dream
          </h2>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short', 
              day: 'numeric'
            })}
          </span>
        </div>
        
        <div className="space-y-6">
          {/* Title input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dream Title</label>
            <input 
              name="title" 
              placeholder="Give your dream a memorable name..." 
              value={dream.title} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          
          {/* Description textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dream Description</label>
            <textarea 
              name="description" 
              placeholder="Describe what happened in your dream..." 
              value={dream.description} 
              onChange={handleChange} 
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" 
            />
          </div>
          
          {/* Mood selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How did this dream make you feel?</label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleMoodSelect(option)}
                  className={`px-4 py-2 rounded-full flex items-center gap-1 transition ${
                    dream.mood === option.label 
                      ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-700" 
                      : "bg-gray-100 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <span>{option.emoji}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Theme selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dream Theme</label>
            <div className="flex flex-wrap gap-2">
              {themeOptions.map((theme) => (
                <button
                  key={theme.label}
                  type="button"
                  onClick={() => handleThemeSelect(theme)}
                  className={`px-4 py-2 rounded-full flex items-center gap-1 transition ${
                    dream.theme === theme.label 
                      ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-700" 
                      : "bg-gray-100 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  {theme.icon}
                  <span>{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Privacy toggle */}
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  name="isPublic" 
                  checked={dream.isPublic}
                  onChange={handleChange} 
                />
                <div className={`block w-10 h-6 rounded-full ${dream.isPublic ? "bg-indigo-600" : "bg-gray-300"} transition`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${dream.isPublic ? "translate-x-4" : ""}`}></div>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Share with community</span>
              </div>
            </label>
          </div>
          {/* Save button */}
          <div className="flex justify-end pt-4">
            <button 
              onClick={handleSubmit} 
              disabled={loading || !dream.title || !dream.description}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition ${
                loading || !dream.title || !dream.description
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save className="h-5 w-5" />
              )}
              <span>{loading ? "Saving..." : "Save Dream"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}