import { Download, Sparkles } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";

const sections = [
  {
    title: "Что изменилось",
    items: [
      "Ферритин впервые немного вырос после периода снижения. План контроля лучше сверить с врачом.",
      "Витамин D находится в выбранном референсе.",
      "Воспалительные маркеры по подтверждённым данным выглядят стабильными."
    ]
  },
  {
    title: "Что обсудить с врачом",
    items: [
      "ТТГ около верхней границы выбранного референса и постепенно рос в истории.",
      "Ферритин ниже выбранного референса.",
      "Какие анализы стоит повторить и в какие сроки."
    ]
  }
];

export default function AISummaryPage() {
  return (
    <AppShell active="/ai-summary">
      <PageHeader
        title="AI-сводка"
        subtitle="Формируется только по подтверждённым данным"
        actions={
          <>
            <button className="btn"><Download size={14} /> PDF</button>
            <button className="btn btn-primary"><Sparkles size={14} /> Обновить</button>
          </>
        }
      />
      <div className="grid grid-cols-[1fr_380px] gap-0">
        <section className="max-w-4xl p-10">
          <div className="mb-8">
            <div className="eyebrow mb-3">в двух словах</div>
            <p className="text-3xl leading-snug tracking-[-0.025em]">
              В целом всё спокойно. Есть несколько изменений, которые удобно показать врачу:
              ферритин и динамику ТТГ.
            </p>
          </div>
          <div className="mb-8 grid grid-cols-3 gap-3">
            <div className="surface p-5"><div className="mono text-3xl font-semibold text-[var(--mint)]">17</div><div className="text-sm text-muted">в норме</div></div>
            <div className="surface p-5"><div className="mono text-3xl font-semibold text-[var(--amber)]">4</div><div className="text-sm text-muted">требуют внимания</div></div>
            <div className="surface p-5"><div className="mono text-3xl font-semibold text-faint">0</div><div className="text-sm text-muted">срочных</div></div>
          </div>
          {sections.map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="mb-3 text-xl font-semibold">{section.title}</h2>
              <div className="surface divide-y divide-border">
                {section.items.map((item) => (
                  <p key={item} className="m-0 p-4 text-sm leading-6 text-muted">{item}</p>
                ))}
              </div>
            </div>
          ))}
          <div className="surface-soft p-4 text-sm leading-6 text-muted">
            Сервис не является медицинским изделием и не заменяет консультацию врача.
            Сводка помогает подготовиться к приёму и не должна использоваться для самостоятельного лечения.
          </div>
        </section>
        <aside className="min-h-[calc(100vh-72px)] border-l border-border bg-surface p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-soft text-accent"><Sparkles size={16} /></span>
            <div>
              <div className="font-semibold">Ассистент</div>
              <div className="text-xs text-faint">вопросы по сводке</div>
            </div>
          </div>
          <div className="space-y-3 text-sm leading-6">
            <div className="rounded-2xl rounded-bl-md border border-border bg-[var(--surface-2)] p-3">Могу подготовить список вопросов к эндокринологу.</div>
            <div className="ml-auto rounded-2xl rounded-br-md bg-text p-3 text-white">Сформируй вопросы по ТТГ</div>
            <div className="rounded-2xl rounded-bl-md border border-border bg-[var(--surface-2)] p-3">
              Что означает рост ТТГ в моей истории? Нужно ли повторить анализ? Какие сопутствующие показатели посмотреть?
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
