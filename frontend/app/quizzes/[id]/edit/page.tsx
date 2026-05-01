"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuizForm from "@/src/components/QuizForm";
import { Quiz } from "@/src/components/types/quiz";

export default function EditPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<Quiz | null>(null);

  useEffect(() => {
    async function fetchOriginal() {
      try {
        const r = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`,
        );
        if (r.ok) {
          const data = (await r.json()) as Quiz;
          const formatted: Quiz = {
            ...data,
            questions: data.questions.map((q) => ({
              ...q,
              optionsString: q.options
                ? (JSON.parse(q.options) as string[]).join(", ")
                : "",
            })),
          };
          setInitialData(formatted);
        }
      } catch (e) {
        console.error("fetch_error", e);
      }
    }
    if (id) void fetchOriginal();
  }, [id]);

  if (!initialData)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-mono text-xs text-zinc-700">
        LOADING_STATE_DATA
      </div>
    );

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <QuizForm initialData={initialData} id={id as string} />
    </main>
  );
}
