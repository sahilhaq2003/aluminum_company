import type { HTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={`btn-box btn-primary rounded-[4px] px-4 py-2 text-sm font-semibold transition ${props.className ?? ""}`} />;
}
export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-[4px] border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-[#0A2463] focus:ring-2 ${props.className ?? ""}`} />;
}
export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`w-full rounded-[4px] border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-[#0A2463] focus:ring-2 ${props.className ?? ""}`} />;
}
export function Label(props: HTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={`mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600 ${props.className ?? ""}`} />;
}
export function Card(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`rounded-[6px] border border-slate-200 bg-white shadow-sm ${props.className ?? ""}`} />;
}
export function Badge(props: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} className={`rounded-[4px] bg-slate-100 px-2.5 py-1 text-xs font-semibold ${props.className ?? ""}`} />;
}
