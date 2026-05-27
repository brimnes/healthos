import Link from "next/link";
import { Download, Filter } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MarkerBadge } from "@/components/status";
import { markers } from "@/lib/mock-data";

export default function MarkersPage() {
  return (
    <AppShell active="/markers">
      <PageHeader
        title="Все показатели"
        subtitle="Единая таблица подтверждённых анализов"
        actions={
          <>
            <button className="btn"><Filter size={14} /> Фильтры</button>
            <button className="btn"><Download size={14} /> CSV/XLSX</button>
          </>
        }
      />
      <div className="border-b border-border bg-surface px-8 py-4">
        <input className="input max-w-md" placeholder="Поиск показателя или кода: HGB, ТТГ..." />
      </div>
      <div className="overflow-auto bg-surface">
        <table className="table">
          <thead>
            <tr>
              <th className="pl-8">показатель</th>
              <th>категория</th>
              <th>значение</th>
              <th>единица</th>
              <th>референс</th>
              <th>статус</th>
              <th>дата</th>
            </tr>
          </thead>
          <tbody>
            {markers.map((marker) => (
              <tr key={marker.code}>
                <td className="pl-8">
                  <Link href={`/markers/${marker.code}`} className="font-medium text-text">{marker.name}</Link>
                  <div className="mono text-xs text-faint">{marker.code}</div>
                </td>
                <td className="text-muted">{marker.group}</td>
                <td className="mono font-semibold">{marker.value}</td>
                <td className="text-muted">{marker.unit}</td>
                <td className="mono text-xs text-faint">{marker.range[0]}-{marker.range[1]}</td>
                <td><MarkerBadge status={marker.status} /></td>
                <td className="mono text-xs text-faint">12.09.2025</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
