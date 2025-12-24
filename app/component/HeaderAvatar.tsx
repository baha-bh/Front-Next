"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../lib/supabase";

export default function HeaderAvatar() {
  const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png");

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', userId)
      .single();
    if (data?.avatar_url) {
      setAvatarUrl(data.avatar_url);
    } else {
      setAvatarUrl("/default-avatar.png");
    }
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) fetchProfile(user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setAvatarUrl("/default-avatar.png");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Link href="/profile" className="group relative block w-10 h-10">
      <Image
        src={avatarUrl}
        alt="User Avatar"
        fill
        className="rounded-full border border-gray-500 object-cover group-hover:border-yellow-300 transition-all duration-300"
      />
    </Link>
  );
}