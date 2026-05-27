import Link from "next/link";
import { Check, FolderOpen, Scan, Upload } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";

const queue = [
  ["krov_invitro_12_09_2025.pdf", "requires_review", "100%", "Развёрнутый анализ крови"],
  ["biohimiya_gemotest.pdf", "processing", "78%", "Биохимия + липиды"],
  ["zaklyuchenie.docx", "uploaded", "0%", "Заключение врача"]
];

export default function UploadPage() {
  return (
    <AppShell active="/upload">
      <PageHeader title="Загрузка документов" subtitle="PDF, DOCX, JPG, PNG, HEIC" />
      <div className="grid grid-cols-[1fr_360px] gap-6 p-8">
        <section className="space-y-5">
          <div className="surface flex flex-col items-center gap-4 border-dashed bg-[var(--accent-soft)] px-10 py-16 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl border border-border bg-surface text-accent"><Upload size={28} /></span>
            <div>
              <h2 className="text-xl font-semibold">Перетащите файлы сюда</h2>
              <p className="mt-1 text-sm text-muted">Несколько файлов сразу, до 50 МБ каждый</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-primary"><FolderOpen size={14} /> Выбрать файлы</button>
              <button className="btn"><Scan size={14} /> Сфотографировать</button>
            </div>
          </div>

          <div className="surface overflow-hidden">
            <div className="border-b border-border p-4">
              <h2 className="font-semibold">Очередь обработки</h2>
            </div>
            {queue.map(([name, status, progress, found]) => (
              <div key={name} className="grid grid-cols-[1fr_220px_auto] items-center gap-4 border-b border-border p-4 last:border-0">
                <div>
                  <div className="font-medium">{name}</div>
                  <div className="text-xs text-faint">{found}</div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs text-muted">
                    <span>{status}</span>
                    <span className="mono">{progress}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-3)]">
                    <div className="h-full rounded-full bg-accent" style={{ width: progress }} />
                  </div>
                </div>
                {status === "requires_review" ? <Link className="btn btn-sm btn-primary" href="/review/1">Проверить</Link> : <button className="btn btn-sm btn-ghost">Отмена</button>}
              </div>
            ))}
          </div>
        </section>

        <aside className="surface h-fit p-5">
          <div className="eyebrow mb-4">как это работает</div>
          {["Загрузка", "OCR", "AI-извлечение JSON", "Проверка человеком", "Сохранение в историю"].map((step, index) => (
            <div key={step} className="mb-4 flex gap-3 last:mb-0">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border bg-[var(--surface-2)] text-xs">{index + 1}</span>
              <div>
                <div className="text-sm font-medium">{step}</div>
                <div className="text-xs leading-5 text-faint">{index === 3 ? "Без подтверждения данные не попадают в анализы." : "Шаг пайплайна MVP."}</div>
              </div>
            </div>
          ))}
          <div className="mt-5 flex gap-2 text-xs text-muted"><Check size={14} /> Приватное хранилище и RLS на следующем этапе.</div>
        </aside>
      </div>
    </AppShell>
  );
}
