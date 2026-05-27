import Link from "next/link";
import { Filter, SortAsc, Upload } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { DocumentBadge } from "@/components/status";
import { documentStatusMeta, documents } from "@/lib/mock-data";
import type { DocumentStatus } from "@/lib/types";

const statuses: DocumentStatus[] = ["uploaded", "processing", "requires_review", "completed", "error"];

export default function DocumentsPage() {
  return (
    <AppShell active="/documents">
      <PageHeader
        title="Документы"
        subtitle="32 файла · приватное хранилище"
        actions={
          <>
            <button className="btn"><Filter size={14} /> Фильтры</button>
            <button className="btn"><SortAsc size={14} /> По дате</button>
            <Link className="btn btn-primary" href="/upload"><Upload size={14} /> Загрузить</Link>
          </>
        }
      />
      <div className="grid grid-cols-5 gap-3 border-b border-border bg-surface px-8 py-5">
        {statuses.map((status) => (
          <div key={status} className="surface-soft p-4">
            <div className="eyebrow mb-2">{documentStatusMeta[status].label}</div>
            <div className="mono text-3xl font-semibold">{documents.filter((doc) => doc.status === status).length}</div>
          </div>
        ))}
      </div>
      <div className="overflow-auto bg-surface">
        <table className="table">
          <thead>
            <tr>
              <th className="pl-8">файл</th>
              <th>тип</th>
              <th>дата</th>
              <th>источник</th>
              <th>показатели</th>
              <th>статус</th>
              <th>действия</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="pl-8">
                  <div className="font-medium">{doc.name}</div>
                  <div className="mono text-xs text-faint">{doc.size}</div>
                </td>
                <td>{doc.documentType}</td>
                <td className="mono text-xs text-muted">{doc.date}</td>
                <td className="text-muted">{doc.lab}</td>
                <td className="mono">{doc.markers}</td>
                <td><DocumentBadge status={doc.status} /></td>
                <td>
                  {doc.status === "requires_review" ? (
                    <Link className="btn btn-sm btn-primary" href={`/review/${doc.id}`}>Проверить</Link>
                  ) : (
                    <button className="btn btn-sm">Открыть</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
