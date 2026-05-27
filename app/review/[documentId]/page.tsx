import Link from "next/link";
import { Check, Download, Plus, Trash2, X } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MarkerBadge } from "@/components/status";

const rows = [
  ["Гемоглобин", "HGB", "124", "г/л", "120-150", "mint", "99%"],
  ["Эритроциты", "RBC", "4.15", "×10¹²/л", "3.9-4.7", "mint", "98%"],
  ["Лейкоциты", "WBC", "6.0", "×10⁹/л", "4.0-9.0", "mint", "99%"],
  ["Ферритин", "FER", "22", "нг/мл", "30-150", "amber", "99%"],
  ["Железо сывороточное", "FE", "9.6", "мкмоль/л", "9-30", "amber", "86%"],
  ["ТТГ", "TSH", "4.2", "мЕд/л", "0.4-4.0", "amber", "78%"]
] as const;

export default function ReviewPage({ params }: { params: { documentId: string } }) {
  return (
    <AppShell active="/documents">
      <PageHeader
        title="Проверка распознавания"
        subtitle={`Документ #${params.documentId} · данные сохранятся только после подтверждения`}
        actions={
          <>
            <Link className="btn" href="/documents"><X size={14} /> Отменить</Link>
            <button className="btn"><Download size={14} /> Скачать JSON</button>
            <button className="btn btn-primary"><Check size={14} /> Подтвердить</button>
          </>
        }
      />
      <div className="grid h-[calc(100vh-72px)] grid-cols-[1fr_1.15fr]">
        <section className="border-r border-border bg-[var(--surface-2)] p-6">
          <div className="mx-auto min-h-[680px] max-w-[520px] rounded-lg border border-border bg-white p-10 shadow-sm">
            <div className="mb-6 flex items-start justify-between border-b border-border pb-5">
              <div>
                <div className="text-lg font-bold">ИНВИТРО</div>
                <div className="text-xs text-faint">Медицинская компания</div>
              </div>
              <div className="mono text-right text-xs text-muted">12.09.2025<br />№ 9418-2025</div>
            </div>
            <div className="mb-5 text-sm">
              <b>Пациент:</b> Соколова Анна А.<br />
              <b>Биоматериал:</b> Венозная кровь
            </div>
            <div className="mb-3 font-bold">ОБЩИЙ АНАЛИЗ КРОВИ</div>
            {rows.slice(0, 5).map((row) => (
              <div key={row[1]} className="grid grid-cols-[1.4fr_.5fr_.6fr_.7fr] border-b border-dashed border-border py-2 text-xs">
                <span>{row[0]}</span><span>{row[2]}</span><span>{row[3]}</span><span>{row[4]}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="flex min-h-0 flex-col bg-surface">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <input className="input" placeholder="Найти показатель..." />
            <button className="btn"><Plus size={14} /> Добавить строку</button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="pl-6">показатель</th>
                  <th>значение</th>
                  <th>единица</th>
                  <th>референс</th>
                  <th>статус</th>
                  <th>confidence</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, code, value, unit, ref, status, confidence]) => (
                  <tr key={code}>
                    <td className="pl-6">
                      <div className="font-medium">{name}</div>
                      <div className="mono text-xs text-faint">{code}</div>
                    </td>
                    <td><input className="input h-8 max-w-[90px]" defaultValue={value} /></td>
                    <td><input className="input h-8 max-w-[120px]" defaultValue={unit} /></td>
                    <td><input className="input h-8 max-w-[130px]" defaultValue={ref} /></td>
                    <td><MarkerBadge status={status} /></td>
                    <td className="mono text-xs text-muted">{confidence}</td>
                    <td><button className="btn btn-sm btn-ghost"><Trash2 size={13} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-border bg-[var(--surface-2)] p-4">
            <span className="text-sm text-muted">После подтверждения строки попадут в `lab_results`.</span>
            <button className="btn btn-primary"><Check size={14} /> Подтвердить все</button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
