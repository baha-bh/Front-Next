"use client";

import { redirect } from "next/navigation";

export default function WarriorsPage() {
  redirect(`/warriors/culture/${encodeURIComponent("ФЕОДАЛЫ")}`);
}