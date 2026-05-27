/* global React, Icon, Sidebar, Topbar, Sparkline, MARKERS */

function AISummaryScreen() {
  const sections = [
    {
      title: 'Что изменилось с мая',
      tone: 'mint',
      bullets: [
        ['Ферритин стабилизировался впервые за 4 цикла', 'После периода снижения появилось небольшое повышение. План контроля лучше сверить с врачом.'],
        ['Витамин D находится в референсе — 36 нг/мл', 'Прирост +14 нг/мл за 9 месяцев. Дальнейшую тактику стоит обсудить с врачом.'],
        ['Воспалительные маркеры спокойны', 'CRP 1.2 мг/л — ниже среднего по диапазону.'],
      ],
    },
    {
      title: 'На что обратить внимание',
      tone: 'amber',
      bullets: [
        ['ТТГ 4.2 мЕд/л — около верхней границы', 'Растёт 4 месяца подряд. Это можно обсудить с эндокринологом на ближайшем приёме.'],
        ['Холестерин общий 5.3 ммоль/л', 'Чуть выше выбранного референса. Вопросы по контролю и образу жизни лучше обсудить с врачом.'],
      ],
    },
    {
      title: 'Что выглядит хорошо',
      tone: 'sky',
      bullets: [
        ['Гематологический профиль — без особенностей', 'Эритроциты, тромбоциты, лейкоциты — всё в пределах нормы.'],
        ['Печёночные ферменты спокойны', 'АЛТ и АСТ устойчиво в нижней половине диапазона.'],
        ['Гликированный гемоглобин 5.4%', 'Хороший показатель углеводного обмена.'],
      ],
    },
  ];

  return (
    <div className="phos-root" style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sidebar active="ai" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="AI-сводка"
          subtitle="Сформирована 12 сентября 2025"
          breadcrumbs={['Ассистент', 'Сводка по последним анализам']}
          right={<>
            <button className="btn"><Icon name="download" size={14} /> PDF</button>
            <button className="btn"><Icon name="more" size={14} /></button>
            <button className="btn btn-primary"><Icon name="sparkles" size={14} /> Обновить</button>
          </>}
        />

        <div style={{ flex: 1, overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr 380px' }}>
          {/* main report */}
          <div style={{ padding: '32px 40px 60px', maxWidth: 820 }}>
            {/* TL;DR */}
            <div style={{ marginBottom: 36 }}>
              <div className="t-eyebrow" style={{ marginBottom: 10 }}>в двух словах</div>
              <p style={{
                margin: 0,
                fontSize: 28, lineHeight: 1.3,
                letterSpacing: '-0.022em', fontWeight: 400,
                textWrap: 'pretty',
              }}>
                В целом всё спокойно. Ферритин впервые немного вырос после снижения,{' '}
                <span style={{ color: 'var(--mist-text-faint)' }}>а из заметных вещей —</span>{' '}
                ТТГ дрейфует к верхней границе, это стоит обсудить с эндокринологом.
              </p>
            </div>

            {/* highlight chips */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
              marginBottom: 40,
            }}>
              <HighlightChip k="17" lbl="в норме" color="mint" sub="из 21 анализа" />
              <HighlightChip k="4" lbl="требуют внимания" color="amber" sub="ТТГ, FER, FE, LDL" />
              <HighlightChip k="0" lbl="критичных" color="ghost" sub="срочных действий нет" />
            </div>

            {sections.map((s, i) => <SummarySection key={i} s={s} />)}

            {/* Recommendations */}
            <section style={{ marginTop: 36 }}>
              <h3 className="t-h2" style={{ margin: 0, marginBottom: 12 }}>Что можно сделать</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { t: 'Запланировать контроль ферритина и железа', when: 'по плану врача', icon: 'calendar' },
                  { t: 'Обсудить ТТГ с эндокринологом', when: 'на следующем приёме', icon: 'user' },
                  { t: 'Уточнить дальнейший план по витамину D', when: 'после консультации', icon: 'drop' },
                ].map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 18px',
                    border: '1px solid var(--mist-border)',
                    borderRadius: 12,
                    background: 'var(--mist-surface)',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)',
                      display: 'grid', placeItems: 'center', color: 'var(--mist-text-muted)',
                    }}><Icon name={r.icon} size={16} /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em' }}>{r.t}</div>
                      <div style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>{r.when}</div>
                    </div>
                    <button className="btn btn-sm">Добавить в напоминания</button>
                  </div>
                ))}
              </div>
            </section>

            {/* footer */}
            <div style={{
              marginTop: 40,
              padding: '16px 20px',
              borderRadius: 12,
              background: 'var(--mist-surface-2)',
              border: '1px solid var(--mist-border)',
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
              <Icon name="info" size={14} style={{ color: 'var(--mist-text-muted)', marginTop: 2 }} />
              <div style={{ fontSize: 12.5, color: 'var(--mist-text-muted)', lineHeight: 1.55 }}>
                Сервис не является медицинским изделием и не заменяет консультацию врача. Сводка помогает
                подготовиться к приёму и не должна использоваться для самостоятельного лечения.
              </div>
            </div>
          </div>

          {/* right: chat */}
          <SummaryChat />
        </div>
      </main>
    </div>
  );
}

function HighlightChip({ k, lbl, color, sub }) {
  const colorVal = {
    mint: 'var(--status-mint)',
    amber: 'var(--status-amber)',
    coral: 'var(--status-coral)',
    ghost: 'var(--mist-text-faint)',
  }[color];
  return (
    <div className="surface" style={{ padding: '16px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span className="num" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1, color: colorVal }}>{k}</span>
        <span style={{ fontSize: 13, color: 'var(--mist-text)', fontWeight: 500 }}>{lbl}</span>
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--mist-text-faint)', marginTop: 6 }}>{sub}</div>
    </div>
  );
}

function SummarySection({ s }) {
  const colorMap = {
    mint: 'var(--status-mint)',
    amber: 'var(--status-amber)',
    coral: 'var(--status-coral)',
    sky: 'var(--status-sky)',
  };
  return (
    <section style={{ marginBottom: 28 }}>
      <h3 className="t-h2" style={{
        margin: 0, marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: colorMap[s.tone] }} />
        {s.title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {s.bullets.map((b, i) => (
          <div key={i} style={{
            padding: '14px 0',
            borderBottom: i < s.bullets.length - 1 ? '1px solid var(--mist-border)' : 'none',
            display: 'grid', gridTemplateColumns: '1fr', gap: 4,
          }}>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.008em', lineHeight: 1.45 }}>{b[0]}</div>
            <div style={{ fontSize: 13, color: 'var(--mist-text-muted)', lineHeight: 1.55, textWrap: 'pretty' }}>{b[1]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SummaryChat() {
  const messages = [
    { role: 'ai', text: 'Сводка готова. Хотите углубиться в какую-то часть?' },
    { role: 'user', text: 'Объясни простыми словами про ТТГ' },
    { role: 'ai', text: 'ТТГ — это сигнал к щитовидной железе. По вашим данным он постепенно повышался с 2.1 до 4.2. Это не диагноз, но динамику стоит показать эндокринологу.' },
    { role: 'user', text: 'Это опасно?' },
    { role: 'ai', text: 'По одному показателю нельзя делать выводы об опасности. Я бы сформировал список вопросов к врачу и отметил динамику, чтобы её было проще обсудить на приёме.' },
  ];

  return (
    <aside style={{
      borderLeft: '1px solid var(--mist-border)',
      background: 'var(--mist-surface)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        padding: '20px 22px 14px',
        borderBottom: '1px solid var(--mist-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 9,
            background: 'var(--mist-accent-soft)', color: 'var(--mist-accent-strong)',
            display: 'grid', placeItems: 'center',
          }}><Icon name="sparkles" size={14} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: 13.5, fontWeight: 500 }}>Ассистент</span>
            <span style={{ fontSize: 11, color: 'var(--mist-text-faint)' }}>обсуждение сводки</span>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--mist-text-faint)', lineHeight: 1.5 }}>
          Спросите про любой раздел или показатель. Все ответы — на основе ваших данных.
        </p>
      </div>

      <div style={{ flex: 1, padding: '16px 16px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '90%',
            background: m.role === 'user' ? 'var(--mist-text)' : 'var(--mist-surface-2)',
            color: m.role === 'user' ? 'var(--mist-surface)' : 'var(--mist-text)',
            border: m.role === 'user' ? '1px solid var(--mist-text)' : '1px solid var(--mist-border)',
            padding: '10px 12px', borderRadius: 14,
            borderBottomRightRadius: m.role === 'user' ? 4 : 14,
            borderBottomLeftRadius: m.role === 'ai' ? 4 : 14,
            fontSize: 13, lineHeight: 1.55,
          }}>{m.text}</div>
        ))}

        {/* tool call */}
        <div style={{
          alignSelf: 'flex-start', maxWidth: '90%',
          padding: '8px 12px', borderRadius: 14,
          background: 'transparent',
          border: '1px dashed var(--mist-border-strong)',
          color: 'var(--mist-text-faint)', fontSize: 12,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="chart" size={12} />
          сверяю с историей ТТГ за 12 мес…
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '4px 0' }}>
          {['Подготовь вопросы к эндокринологу', 'Что значит «верхняя граница»?', 'Покажи график ТТГ'].map(s => (
            <span key={s} style={{
              fontSize: 12, padding: '5px 10px', borderRadius: 999,
              background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)',
              color: 'var(--mist-text-muted)', cursor: 'default',
            }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 16px 18px', borderTop: '1px solid var(--mist-border)' }}>
        <div style={{ position: 'relative' }}>
          <input className="input" placeholder="Спросите по сводке…" style={{ paddingRight: 70, fontSize: 13 }} />
          <button className="btn btn-sm btn-primary" style={{
            position: 'absolute', right: 4, top: 4, height: 30, padding: '0 10px',
          }}><Icon name="arrowUp" size={13} stroke={2} /></button>
        </div>
      </div>
    </aside>
  );
}

window.AISummaryScreen = AISummaryScreen;
