"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Question {
  id: number;
  text: string;
  type: "boolean" | "input" | "checkbox";
  options: string | null;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

export default function QuizViewPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`,
        );
        if (r.ok) {
          const data = (await r.json()) as Quiz;
          setQuiz(data);
        }
      } catch (e) {
        console.error("view_fetch_error", e);
      }
    }
    if (id) void load();
  }, [id]);

  if (!quiz)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-mono text-[10px] text-zinc-800">
        FETCHING_DETAILS...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <Link
            href="/quizzes"
            className="text-[10px] font-mono hover:text-white uppercase tracking-tighter"
          >
            ← Back
          </Link>
          <Link
            href={`/quizzes/${id}/edit`}
            className="text-[10px] font-mono text-indigo-500 hover:text-indigo-300 uppercase underline"
          >
            Edit_Mode
          </Link>
        </div>

        <header className="mb-16 border-b border-zinc-900 pb-8">
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tighter mb-2">
            {quiz.title}
          </h1>
          <p className="text-[10px] font-mono text-zinc-600 uppercase">
            Object_ID: {quiz.id}
          </p>
        </header>

        <div className="space-y-10">
          {quiz.questions.map((q, idx) => (
            <div
              key={q.id}
              className="group border-l border-zinc-900 pl-6 py-1"
            >
              <span className="text-[10px] font-mono text-zinc-700 block mb-2 tracking-widest uppercase">
                {idx + 1}
              </span>
              <p className="text-lg text-zinc-200 leading-snug">{q.text}</p>

              <div className="mt-4 flex gap-2">
                {q.type === "boolean" && (
                  <div className="flex gap-2 opacity-20">
                    <span className="border border-zinc-800 px-3 py-1 text-[10px]">
                      TRUE
                    </span>
                    <span className="border border-zinc-800 px-3 py-1 text-[10px]">
                      FALSE
                    </span>
                  </div>
                )}
                {q.type === "checkbox" && q.options && (
                  <div className="grid gap-1.5 opacity-30 mt-2">
                    {(JSON.parse(q.options) as string[]).map((opt, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className="w-2.5 h-2.5 border border-zinc-700"></div>{" "}
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
