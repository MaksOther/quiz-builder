"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const schema = z.object({
  title: z.string().min(3),
  questions: z
    .array(
      z.object({
        text: z.string().min(3),
        type: z.enum(["boolean", "input", "checkbox"]),
        optionsString: z.string().optional(),
      }),
    )
    .min(1),
});

type FormType = z.infer<typeof schema>;

interface QuizFormProps {
  initialData?: FormType | null;
  id?: string;
}

export default function QuizForm({ initialData, id }: QuizFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const { register, control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      title: "",
      questions: [{ text: "", type: "input", optionsString: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });

  const sendData = async (values: FormType) => {
    setPending(true);
    const payload = {
      title: values.title,
      questions: values.questions.map((q) => ({
        text: q.text,
        type: q.type,
        options:
          q.type === "checkbox" && q.optionsString
            ? q.optionsString
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : null,
      })),
    };

    try {
      const url = id
        ? `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/quizzes`;
      const method = id ? "PUT" : "POST";

      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (r.ok) {
        router.push("/quizzes");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  };

  const questionValues = useWatch({
    control,
    name: "questions",
  });

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-white tracking-tighter">
          {id ? "EDIT_ENTRY" : "NEW_ENTRY"}
        </h1>
        <Link
          href="/quizzes"
          className="text-xs font-mono text-zinc-600 hover:text-white uppercase tracking-widest"
        >
          Back
        </Link>
      </header>

      <form
        onSubmit={(e) => {
          void handleSubmit(sendData)(e);
        }}
        className="space-y-6"
      >
        <div className="bg-[#0d0d0d] border border-zinc-900 p-6 rounded-sm">
          <label className="block text-[10px] font-mono text-zinc-600 uppercase mb-2">
            Quiz Title
          </label>
          <input
            {...register("title")}
            className="w-full bg-transparent border-b border-zinc-800 py-2 text-xl text-white outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="space-y-4">
          {fields.map((field, idx) => {
            const type = questionValues?.[idx]?.type;
            return (
              <div
                key={field.id}
                className="bg-[#0d0d0d] border border-zinc-900 p-6 rounded-sm relative"
              >
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="absolute top-4 right-4 text-[10px] font-mono text-zinc-700 hover:text-red-500 uppercase"
                >
                  [Drop]
                </button>
                <div className="grid gap-6 sm:grid-cols-12">
                  <div className="sm:col-span-8">
                    <label className="block text-[10px] font-mono text-zinc-600 uppercase mb-1">
                      Question
                    </label>
                    <input
                      {...register(`questions.${idx}.text`)}
                      className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-sm px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label className="block text-[10px] font-mono text-zinc-600 uppercase mb-1">
                      Type
                    </label>
                    <select
                      {...register(`questions.${idx}.type`)}
                      className="w-full bg-[#0a0a0a] border border-zinc-900 rounded-sm px-3 py-2 text-sm outline-none"
                    >
                      <option value="input">Text</option>
                      <option value="boolean">Boolean</option>
                      <option value="checkbox">Multiple</option>
                    </select>
                  </div>
                </div>
                {type === "checkbox" && (
                  <div className="mt-4">
                    <input
                      {...register(`questions.${idx}.optionsString`)}
                      placeholder="A, B, C..."
                      className="w-full bg-indigo-500/5 border border-indigo-500/20 rounded-sm px-3 py-2 text-xs text-indigo-200 outline-none"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-10">
          <button
            type="button"
            onClick={() =>
              append({ text: "", type: "input", optionsString: "" })
            }
            className="text-xs font-mono text-zinc-500 hover:text-white uppercase"
          >
            + Add_Block
          </button>
          <button
            type="submit"
            disabled={pending}
            className="bg-zinc-100 text-black px-10 py-3 rounded-sm font-bold text-sm uppercase transition-opacity disabled:opacity-50"
          >
            {pending ? "Writing..." : "Save_Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
