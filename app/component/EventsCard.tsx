"use client";

import { useState } from "react";
import { events, type Events } from "../lib/Events";

export default function EventCard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(events.map(e => e.category)))];

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter(e => e.category === selectedCategory);

  return (
    <div className="flex gap-6">
      {/* Меню категорий */}
      <div className="flex flex-col gap-3 p-4 border-r border-gray-700">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedCategory === category
                ? "bg-amber-500 text-black"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Карточки */}
      <div className="flex-1 flex flex-col gap-6">
        {filteredEvents.map((event: Events) => (
          <div
            key={event.id}
            className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-gray-700 shadow-md hover:border-amber-600/40 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row p-6 gap-6 bg-black/50 backdrop-blur-md">

              {/* Левый круг с иконкой */}
              <div className="flex-shrink-0 w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center">
                <img
                  src={event.icon || "/placeholder-icon.png"}
                  alt={event.name}
                  className="w-12 h-12"
                />
              </div>

              {/* Центральный текстовый блок */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-amber-400 drop-shadow-md">
                    {event.name.toUpperCase()}
                  </h2>
                  <span className="text-sm font-semibold border px-2 py-0.5 rounded bg-black/50 text-gray-200">
                    Category: {event.category}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{event.effect}</p>
                <div className="text-sm text-gray-400 mt-2">
                  Duration: {event.Duration}
                </div>
              </div>

              {/* ПРАВЫЙ БЛОК: картинка с маской и поверх placeholder */}
              <div className="relative w-64 h-64 flex-shrink-0">
                <div className="absolute inset-0 bg-cover mask-portal rounded-full"
                style={{ backgroundImage: `url(${event.image})`, backgroundPosition: "center" }}/>
                <img
                src="https://minionsart.github.io/aow4db/Icons/Interface/Runecircle.png"
                alt="overlay"
                className="absolute inset-0 w-70 h-70 object-cover pointer-events-none -translate-x-[-2px] -translate-y-[15px]"
                />
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
