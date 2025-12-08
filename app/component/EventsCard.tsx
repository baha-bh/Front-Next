"use client";

import { type Events } from "../lib/Events";

interface Props {
  event: Events;
}

export default function EventCard({ event }: Props) {
  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-gray-700 shadow-md hover:border-amber-600/40 transition-all duration-300 bg-zinc-900/50">
      <div className="flex flex-col md:flex-row p-6 gap-6 bg-black/50 backdrop-blur-md">
        
        {/* Левый круг с иконкой */}
        <div className="flex-shrink-0 w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center">
          <img
            src={event.icon || "/placeholder-icon.png"}
            alt={event.name}
            className="w-12 h-12 object-contain"
          />
        </div>

        {/* Центральный текстовый блок */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-amber-400 drop-shadow-md">
              {event.name.toUpperCase()}
            </h2>
            <span className="text-sm font-semibold border px-2 py-0.5 rounded bg-black/50 text-gray-200 border-gray-600">
              Category: {event.category}
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{event.effect}</p>
          <div className="text-sm text-gray-400 mt-2">
            Duration: {event.Duration}
          </div>
        </div>

        {/* ПРАВЫЙ БЛОК: картинка с маской и поверх placeholder */}
        <div className="relative w-64 h-64 flex-shrink-0 hidden md:block">
          <div
            className="absolute inset-0 bg-cover mask-portal rounded-full"
            style={{
              backgroundImage: `url(${event.image})`,
              backgroundPosition: "center",
            }}
          />
          <img
            src="https://minionsart.github.io/aow4db/Icons/Interface/Runecircle.png"
            alt="overlay"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.15] translate-y-[5%]"
/>
</div>
</div>
</div>
);
}