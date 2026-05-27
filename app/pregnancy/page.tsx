import { Calendar, Download, Upload } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { MarkerChart } from "@/components/marker-chart";
import { MarkerBadge } from "@/components/status";
import { markers, pregnancy } from "@/lib/mock-data";

export default function PregnancyPage() {
  const focus = ["HGB", "FER", "TSH", "GLU"].map((code) => markers.find((marker) => marker.code === code)!);
  return (
    <AppShell active="/pregnancy">
      <PageHeader
        title="Беременность"
        subtitle={`${pregnancy.currentWeek} неделя · ${pregnancy.trimester} триместр · ПДР ${pregnancy.dueDate}`}
        actions={
          <>
            <button className="btn"><Calendar size={14} /> Календарь</button>
            <button className="btn"><Download size={14} /> Отчёт врачу</button>
            <button className="btn btn-primary"><Upload size={14} /> Добавить</button>
          </>
        }
      />
      <div className="grid grid-cols-[1fr_360px] gap-6 p-8">
        <section className="space-y-6">
          <div className="surface grid grid-cols-[220px_1fr] gap-8 p-6">
            <div className="grid h-52 w-52 place-items-center rounded-full border-[14px] border-accent text-center">
              <div><div className="mono text-6xl font-semibold">{pregnancy.currentWeek}</div><div className="text-sm text-faint">неделя</div></div>
            </div>
            <div className="self-center">
              <div className="eyebrow mb-2">специальный режим</div>
              <h2 className="text-2xl font-semibold">Анализы с привязкой к неделе беременности</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
                Система показывает дату анализа, триместр и неделю на момент сдачи. AI-комментарии осторожны
                и предназначены для подготовки к консультации.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {focus.map((marker) => (
              <div key={marker.code} className="surface p-4">
                <div className="mb-3 flex items-center justify-between"><span className="text-sm text-faint">{marker.name}</span><MarkerBadge status={marker.status} /></div>
                <div className="mono text-3xl font-semibold">{marker.value} <span className="text-xs text-faint">{marker.unit}</span></div>
              </div>
            ))}
          </div>
          <div className="surface p-6">
            <h2 className="mb-4 text-xl font-semibold">Динамика гемоглобина</h2>
            <MarkerChart marker={focus[0]} />
          </div>
        </section>
        <aside className="space-y-5">
          <div className="surface p-5">
            <div className="eyebrow mb-3">AI-сводка</div>
            <p className="text-sm leading-6 text-muted">
              На 18 неделе заметных резких изменений по закреплённым показателям не видно.
              Ферритин ниже выбранного референса, это можно обсудить с врачом.
            </p>
          </div>
          <div className="surface-soft p-4 text-xs leading-5 text-muted">Сервис не является медицинским изделием и не заменяет консультацию врача.</div>
        </aside>
      </div>
    </AppShell>
  );
}
