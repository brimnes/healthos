import { Upload } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";

const items = [
  ["УЗИ щитовидной железы", "05.09.2025", "МЕДСИ", "УЗ-картина без особенностей"],
  ["УЗИ органов брюшной полости", "14.06.2025", "Чайка", "Норма"],
  ["УЗИ малого таза", "02.03.2025", "МЕДСИ", "УЗ-картина без особенностей"]
];

export default function UltrasoundPage() {
  return (
    <AppShell active="/ultrasound">
      <PageHeader title="УЗИ и обследования" subtitle="Заключения, параметры и исходные файлы" actions={<button className="btn btn-primary"><Upload size={14} /> Добавить</button>} />
      <div className="space-y-4 p-8">
        {items.map(([title, date, clinic, conclusion]) => (
          <div key={title} className="surface grid grid-cols-[180px_1fr_auto] items-center gap-6 p-5">
            <div className="rounded-xl border border-border bg-[var(--surface-2)] p-4 text-center">
              <div className="mono text-sm">{date}</div>
              <div className="mt-2 text-xs text-faint">{clinic}</div>
            </div>
            <div>
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted">{conclusion}</p>
            </div>
            <button className="btn btn-sm">Открыть</button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
