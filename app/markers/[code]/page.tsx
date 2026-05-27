import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MarkerChart } from "@/components/marker-chart";
import { MarkerBadge } from "@/components/status";
import { historyDates, markers } from "@/lib/mock-data";

export default function MarkerPage({ params }: { params: { code: string } }) {
  const marker = markers.find((item) => item.code === params.code);
  if (!marker) notFound();

  return (
    <AppShell active="/markers">
      <PageHeader
        title={marker.name}
        subtitle={`${marker.code} · ${marker.group}`}
        actions={<button className="btn"><Download size={14} /> Экспорт</button>}
      />
      <div className="grid grid-cols-[1fr_360px] gap-6 p-8">
        <section className="space-y-6">
          <div className="surface p-6">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <div className="eyebrow mb-2">текущее значение</div>
                <div className="flex items-baseline gap-3">
                  <span className="mono text-6xl font-semibold">{marker.value}</span>
                  <span className="text-muted">{marker.unit}</span>
                </div>
              </div>
              <MarkerBadge status={marker.status} />
            </div>
            <MarkerChart marker={marker} height={320} />
          </div>
          <div className="surface overflow-hidden">
            <div className="border-b border-border p-4"><h2 className="font-semibold">История измерений</h2></div>
            <table className="table">
              <thead>
                <tr><th className="pl-6">дата</th><th>значение</th><th>референс</th><th>источник</th></tr>
              </thead>
              <tbody>
                {marker.history.map((value, index) => (
                  <tr key={historyDates[index]}>
                    <td className="mono pl-6 text-xs">{historyDates[index]}</td>
                    <td className="mono font-semibold">{value} <span className="text-xs text-faint">{marker.unit}</span></td>
                    <td className="mono text-xs text-faint">{marker.range[0]}-{marker.range[1]}</td>
                    <td><Link href="/documents" className="text-sm text-accent">Открыть документ</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <aside className="space-y-5">
          <div className="surface p-5">
            <div className="eyebrow mb-3">AI-комментарий</div>
            <p className="text-sm leading-6 text-muted">
              Видна динамика по нескольким датам. Если показатель выходит за выбранный референс или меняется устойчиво,
              это можно обсудить с врачом. Сервис не ставит диагнозы и не назначает лечение.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
