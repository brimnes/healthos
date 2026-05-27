import Link from "next/link";
import { Download, Upload } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MarkerChart } from "@/components/marker-chart";
import { DocumentBadge, MarkerBadge } from "@/components/status";
import { documents, markers } from "@/lib/mock-data";

export default function DashboardPage() {
  const ferritin = markers.find((marker) => marker.code === "FER") ?? markers[0];
  const keyMarkers = markers.slice(0, 6);
  const reviewCount = documents.filter((doc) => doc.status === "requires_review").length;

  return (
    <AppShell active="dashboard">
      <PageHeader
        title="Доброе утро, Анна"
        subtitle="Последние анализы — 12 сентября 2025"
        actions={
          <>
            <Link className="btn" href="/documents"><Download size={14} /> Экспорт</Link>
            <Link className="btn btn-primary" href="/upload"><Upload size={14} /> Загрузить</Link>
          </>
        }
      />
      <div className="grid grid-cols-[1fr_360px] gap-6 p-8">
        <section className="space-y-6">
          <div className="grid grid-cols-[1.15fr_.85fr] gap-4">
            <div className="surface p-6">
              <div className="eyebrow mb-3">health overview</div>
              <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.02em]">
                В целом всё спокойно. Стоит обсудить ферритин и динамику ТТГ с врачом.
              </h2>
              <div className="mt-5 flex gap-3">
                <span className="badge badge-mint">17 в норме</span>
                <span className="badge badge-amber">4 требуют внимания</span>
                <span className="badge badge-ghost">0 срочных</span>
              </div>
            </div>
            <div className="surface bg-[var(--accent-soft)] p-6">
              <div className="eyebrow mb-3 text-accent">следующий шаг</div>
              <h3 className="text-lg font-semibold">Проверить новые распознанные данные</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {reviewCount} документ ждёт подтверждения. Данные попадут в историю только после проверки.
              </p>
              <Link className="btn btn-sm mt-5" href="/review/3">Открыть проверку</Link>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Ключевые показатели</h2>
              <Link href="/markers" className="text-sm font-medium text-accent">Все показатели</Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {keyMarkers.map((marker) => (
                <Link key={marker.code} href={`/markers/${marker.code}`} className="surface p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-faint">{marker.name}</span>
                    <MarkerBadge status={marker.status} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="mono text-3xl font-semibold">{marker.value}</span>
                    <span className="text-xs text-faint">{marker.unit}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="surface p-6">
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <div className="eyebrow mb-1">в фокусе</div>
                <h2 className="text-xl font-semibold">{ferritin.name}</h2>
              </div>
              <MarkerBadge status={ferritin.status} />
            </div>
            <MarkerChart marker={ferritin} />
          </div>
        </section>

        <aside className="space-y-5">
          <div className="surface p-5">
            <div className="eyebrow mb-4">последние документы</div>
            <div className="space-y-3">
              {documents.slice(0, 5).map((doc) => (
                <Link key={doc.id} href="/documents" className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <span>
                    <span className="block text-sm font-medium">{doc.name}</span>
                    <span className="block text-xs text-faint">{doc.date} · {doc.lab}</span>
                  </span>
                  <DocumentBadge status={doc.status} />
                </Link>
              ))}
            </div>
          </div>
          <div className="surface p-5">
            <div className="eyebrow mb-3 text-accent">AI-сводка</div>
            <p className="text-sm leading-6 text-muted">
              Ферритин впервые немного вырос после периода снижения. ТТГ около верхней границы выбранного референса.
              Это можно спокойно обсудить с врачом на плановом приёме.
            </p>
            <Link href="/ai-summary" className="btn btn-sm mt-4">Открыть сводку</Link>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
