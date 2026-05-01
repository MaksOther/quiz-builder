"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Quiz } from "@/src/components/types/quiz";

const PlusIcon = () => <span className="text-lg">+</span>;

export default function QuizLibrary() {
  const [items, setItems] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`);
        if (r.ok) {
          const data = await r.json();
          setItems(data);
        }
      } catch (e) {
        console.error("error_loading", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const dropItem = async (id: number) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      const r = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`,
        {
          method: "DELETE",
        },
      );
      if (r.ok) setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      console.error("error_deleting", e);
    }
  };

  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(query.toLowerCase()),
  );

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <span className="text-zinc-600 font-mono text-xs animate-pulse tracking-widest">
          SYNCING_DATA...
        </span>
      </div>
    );

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-400 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-900 pb-10 mb-8 gap-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100 tracking-tighter mb-1">
              QUIZ_REPOSITORY
            </h1>
            <p className="text-xs font-mono uppercase text-zinc-600">
              Active entries: {items.length}
            </p>
          </div>
          <Link
            href="/create"
            className="bg-zinc-100 text-black px-5 py-2 rounded-sm font-bold text-sm hover:bg-white transition-colors"
          >
            <PlusIcon /> CREATE_NEW
          </Link>
        </header>

        <div className="mb-10">
          <input
            type="text"
            placeholder="FILTER_BY_TITLE"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-zinc-900 p-4 rounded-sm font-mono text-[10px] text-zinc-100 outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="grid gap-[1px] bg-zinc-900 border border-zinc-900 rounded-sm overflow-hidden">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#0d0d0d] p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-[#111] group transition-colors"
            >
              <div>
                <h3 className="text-lg font-semibold text-zinc-200 group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[10px] font-mono text-zinc-600 mt-2 uppercase">
                  Questions: {item._count?.questions || 0}
                </p>
              </div>
              <div className="flex items-center gap-6 mt-4 sm:mt-0">
                <Link
                  href={`/quizzes/${item.id}`}
                  className="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-widest"
                >
                  Open →
                </Link>
                <Link
                  href={`/quizzes/${item.id}/edit`}
                  className="text-[10px] font-mono text-zinc-600 hover:text-indigo-400 uppercase"
                >
                  [Edit]
                </Link>
                <button
                  onClick={() => dropItem(item.id)}
                  className="text-[10px] font-mono text-zinc-800 hover:text-red-900 uppercase underline decoration-zinc-800"
                >
                  Drop
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
