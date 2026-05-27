/* global React, Icon, Sidebar, Topbar, LineChart, Sparkline, MARKERS, HISTORY_DATES, PROFILE */

function DashboardScreen() {
  const featured = MARKERS.find(m => m.code === 'FER');
  const keyMarkers = ['HGB', 'FER', 'VITD', 'TSH', 'LDL', 'GLU'].map(c => MARKERS.find(m => m.code === c));

  return (
    <div className="phos-root" style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sidebar active="dashboard" />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Доброе утро, Анна"
          subtitle="Последние анализы — 12 сентября, 18 дней назад"
          right={<>
            <button className="btn">
              <Icon name="calendar" size={14} /> Последние 12 мес
              <Icon name="chevronDown" size={12} style={{ color: 'var(--mist-text-faint)' }} />
            </button>
            <button className="btn"><Icon name="download" size={14} /> Экспорт</button>
            <button className="btn btn-primary"><Icon name="upload" size={14} /> Загрузить</button>
          </>}
        />

        <div style={{
          flex: 1, padding: '24px 32px 40px', overflow: 'auto',
          display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24,
        }}>
          {/* main column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>

            {/* hero row: health score + key change */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
              <HealthScoreCard />
              <NextStepCard />
            </div>

            {/* key markers grid */}
            <section>
              <SectionHeader title="Ключевые показатели"
                hint="6 из 47 закреплены"
                action={<button className="btn btn-sm"><Icon name="plus" size={12} /> Закрепить</button>}
              />
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
              }}>
                {keyMarkers.map(m => <MarkerTile key={m.code} m={m} />)}
              </div>
            </section>

            {/* trend chart */}
            <section className="surface" style={{ padding: '20px 22px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <div className="t-eyebrow" style={{ marginBottom: 6 }}>в фокусе</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <h3 className="t-h2" style={{ margin: 0 }}>{featured.name}</h3>
                    <span className="num" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>{featured.value}</span>
                    <span style={{ color: 'var(--mist-text-faint)', fontSize: 13 }}>{featured.unit}</span>
                    <span className="badge badge-amber"><span className="dot" /> ниже нормы</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, padding: 3, borderRadius: 10, background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)' }}>
                  {['3М', '6М', '1Г', '2Г', 'Всё'].map((p, i) => (
                    <span key={p} style={{
                      padding: '4px 10px', fontSize: 12, fontWeight: 500, borderRadius: 7,
                      color: i === 2 ? 'var(--mist-text)' : 'var(--mist-text-faint)',
                      background: i === 2 ? 'var(--mist-surface)' : 'transparent',
                      border: i === 2 ? '1px solid var(--mist-border)' : '1px solid transparent',
                    }}>{p}</span>
                  ))}
                </div>
              </div>
              <LineChart
                data={featured.history.map((y, i) => ({ x: i, y }))}
                range={featured.range}
                yMin={Math.min(...featured.history, featured.range[0]) - 10}
                yMax={Math.max(...featured.history, featured.range[1]) + 20}
                unit={' ' + featured.unit}
                xLabels={HISTORY_DATES.map(d => d.split(' ')[0])}
                h={220}
              />
              <div style={{
                padding: '14px 0 4px',
                display: 'flex', gap: 14, fontSize: 12.5, color: 'var(--mist-text-muted)',
                borderTop: '1px solid var(--mist-border)', marginTop: 10,
              }}>
                <Stat lbl="Текущее" val={`${featured.value} ${featured.unit}`} bold />
                <Stat lbl="Δ за 6 мес" val="−16" color="var(--status-amber)" />
                <Stat lbl="Минимум" val={`${Math.min(...featured.history)}`} />
                <Stat lbl="Среднее" val={(featured.history.reduce((a, b) => a + b, 0) / featured.history.length).toFixed(0)} />
              </div>
            </section>

            {/* timeline + recent docs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
              <TimelineCard />
              <RecentDocsCard />
            </div>
          </div>

          {/* right: AI chat */}
          <AIChatPanel />
        </div>
      </main>
    </div>
  );
}

function HealthScoreCard() {
  // arc gauge
  const score = 82;
  const r = 70;
  const c = Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div className="surface" style={{
      padding: '22px 24px', display: 'flex', gap: 28, alignItems: 'center',
      background: 'var(--mist-surface)',
    }}>
      <div style={{ position: 'relative', width: 160, height: 110 }}>
        <svg viewBox="0 0 160 110" width="160" height="110">
          <path d={`M 16 96 A ${r} ${r} 0 0 1 144 96`} fill="none"
            stroke="var(--mist-border)" strokeWidth="10" strokeLinecap="round" />
          <path d={`M 16 96 A ${r} ${r} 0 0 1 144 96`} fill="none"
            stroke="var(--mist-accent-strong)" strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`} pathLength={c} />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 6,
        }}>
          <span className="num" style={{ fontSize: 42, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: 11, color: 'var(--mist-text-faint)', marginTop: 2 }}>/ 100</span>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="t-eyebrow" style={{ marginBottom: 8 }}>health score</div>
        <div style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.35, marginBottom: 8, letterSpacing: '-0.012em' }}>
          В целом всё спокойно. Стоит обсудить ферритин и динамику ТТГ с врачом.
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--mist-text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--status-mint)' }} />
            17 в норме
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--status-amber)' }} />
            4 на границе
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--status-coral)' }} />
            0 критичных
          </span>
        </div>
      </div>
    </div>
  );
}

function NextStepCard() {
  return (
    <div className="surface" style={{
      padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14,
      background: 'linear-gradient(140deg, var(--mist-accent-tint) 0%, var(--mist-surface) 70%)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="sparkles" size={14} style={{ color: 'var(--mist-accent-strong)' }} />
        <span className="t-eyebrow" style={{ color: 'var(--mist-accent-strong)' }}>следующий шаг</span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.012em', lineHeight: 1.35 }}>
        Запланировать контроль ферритина, если врач уже рекомендовал наблюдение.
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--mist-text-muted)', lineHeight: 1.5 }}>
        Динамика снижалась 4 цикла подряд, последнее значение ниже выбранного референса.
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
        <button className="btn btn-sm btn-primary"><Icon name="calendar" size={12} /> Поставить напоминание</button>
        <button className="btn btn-sm">Подробнее</button>
      </div>
    </div>
  );
}

function MarkerTile({ m }) {
  const statusBadge = {
    mint: { cls: 'badge-mint', txt: 'в норме' },
    amber: { cls: 'badge-amber', txt: 'на границе' },
    coral: { cls: 'badge-coral', txt: 'отклонение' },
  }[m.status];
  const delta = m.history[m.history.length - 1] - m.history[m.history.length - 2];
  const accent = m.status === 'mint' ? 'var(--status-mint)' :
                 m.status === 'amber' ? 'var(--status-amber)' : 'var(--status-coral)';
  return (
    <div className="surface" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: 'var(--mist-text-faint)', letterSpacing: '0.02em' }}>{m.name}</span>
        <span className={`badge ${statusBadge.cls}`}><span className="dot" />{statusBadge.txt}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span className="num" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.025em' }}>{m.value}</span>
        <span style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>{m.unit}</span>
        <span style={{ marginLeft: 'auto' }}>
          <Sparkline data={m.history} color={accent} range />
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11.5 }}>
        <span style={{ color: 'var(--mist-text-faint)' }} className="mono">норма {m.range[0]}–{m.range[1]}</span>
        <span style={{ color: delta > 0 ? 'var(--status-mint)' : 'var(--status-coral)', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Icon name={delta > 0 ? 'arrowUp' : 'arrowDown'} size={11} stroke={2} />
          {delta > 0 ? '+' : ''}{delta.toFixed(delta % 1 ? 1 : 0)}
        </span>
      </div>
    </div>
  );
}

function SectionHeader({ title, hint, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <h3 className="t-h2" style={{ margin: 0 }}>{title}</h3>
        {hint && <span style={{ fontSize: 12.5, color: 'var(--mist-text-faint)' }}>{hint}</span>}
      </div>
      {action}
    </div>
  );
}

function Stat({ lbl, val, color, bold }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 80 }}>
      <span style={{ fontSize: 11, color: 'var(--mist-text-faint)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>{lbl}</span>
      <span className="num" style={{ fontSize: 14, fontWeight: bold ? 500 : 400, color: color || 'var(--mist-text)' }}>{val}</span>
    </div>
  );
}

function TimelineCard() {
  const events = [
    { d: '12 сен', icon: 'flask', t: 'Развёрнутый анализ крови + биохимия + гормоны', s: '24 + 14 + 4 показателя', tag: 'Инвитро', color: 'mint' },
    { d: '05 сен', icon: 'scan', t: 'УЗИ щитовидной железы', s: 'без особенностей', tag: 'МЕДСИ', color: 'mint' },
    { d: '20 авг', icon: 'user', t: 'Приём эндокринолога', s: 'добавлены рекомендации врача', tag: 'Чайка', color: 'sky' },
    { d: '14 июн', icon: 'scan', t: 'УЗИ органов брюшной полости', s: 'норма', tag: 'Чайка', color: 'mint' },
    { d: '20 мая', icon: 'flask', t: 'Анализ крови + ферритин', s: 'ферритин 18 ↓', tag: 'KDL', color: 'amber' },
  ];
  return (
    <div className="surface" style={{ padding: '18px 20px' }}>
      <SectionHeader title="Хронология" hint="последние 6 событий"
        action={<a style={{ fontSize: 12.5, color: 'var(--mist-accent-strong)' }}>смотреть все →</a>} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {events.map((e, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '54px 28px 1fr auto', gap: 12,
            alignItems: 'center', padding: '12px 0',
            borderBottom: i < events.length - 1 ? '1px solid var(--mist-border)' : 'none',
          }}>
            <span className="mono" style={{ fontSize: 11.5, color: 'var(--mist-text-faint)' }}>{e.d}</span>
            <span style={{
              width: 28, height: 28, borderRadius: 8,
              background: `var(--status-${e.color}-bg)`, color: `var(--status-${e.color})`,
              display: 'grid', placeItems: 'center',
            }}><Icon name={e.icon} size={14} /></span>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: '-0.005em' }}>{e.t}</span>
              <span style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>{e.s}</span>
            </div>
            <span className="badge badge-ghost">{e.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentDocsCard() {
  const docs = [
    { name: 'Развёрнутый анализ крови', meta: '12.09 · Инвитро · 1.2 МБ' },
    { name: 'Биохимия + липиды', meta: '12.09 · Гемотест · 0.8 МБ' },
    { name: 'УЗИ щитовидной железы', meta: '05.09 · МЕДСИ · 2.4 МБ' },
    { name: 'Заключение эндокринолога', meta: '20.08 · Чайка · 0.3 МБ' },
  ];
  return (
    <div className="surface" style={{ padding: '18px 20px' }}>
      <SectionHeader title="Документы" hint="32 файла"
        action={<a style={{ fontSize: 12.5, color: 'var(--mist-accent-strong)' }}>все →</a>} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {docs.map((d, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 8px', borderRadius: 8,
          }}>
            <span style={{
              width: 30, height: 36, borderRadius: 6,
              background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)',
              display: 'grid', placeItems: 'center',
              fontFamily: 'Geist Mono', fontSize: 9, color: 'var(--mist-text-faint)',
            }}>PDF</span>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
              <span style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span>
              <span style={{ fontSize: 11.5, color: 'var(--mist-text-faint)' }}>{d.meta}</span>
            </div>
            <Icon name="arrowRight" size={13} style={{ color: 'var(--mist-text-faint)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AIChatPanel() {
  const messages = [
    { role: 'ai', text: 'Доброе утро, Анна. Просмотрела ваши новые анализы от 12 сентября — есть пара вещей, на которые стоит взглянуть. Хотите, разберём по порядку?' },
    { role: 'user', text: 'Да, начни с самого важного' },
    { role: 'ai', html: true, content: (
      <>
        <p style={{ margin: 0, marginBottom: 8 }}>Главное — ферритин снизился до <b>22 нг/мл</b> при референсе 30–150. Это уже четвёртое снижение подряд:</p>
        <div style={{
          padding: '10px 12px', background: 'var(--mist-surface-2)',
          border: '1px solid var(--mist-border)', borderRadius: 10, marginBottom: 8,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--mist-text-faint)' }}>FER · нг/мл</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="num" style={{ fontSize: 18, fontWeight: 500 }}>22</span>
              <span style={{ fontSize: 11, color: 'var(--status-amber)' }}>↓ 16 за 6 мес</span>
            </div>
          </div>
          <Sparkline data={[42, 38, 31, 24, 18, 22]} color="var(--status-amber)" w={70} h={26} />
        </div>
        <p style={{ margin: 0 }}>В истории есть консультация от 20 августа. Лучше сверить динамику с рекомендациями врача и не менять назначения самостоятельно.</p>
      </>
    ) },
    { role: 'user', text: 'А ТТГ?' },
    { role: 'ai', text: 'ТТГ 4.2 мЕд/л — около верхней границы выбранного референса. По истории виден постепенный рост, поэтому это можно обсудить с эндокринологом на следующем приёме. Хотите, добавлю заметку?' },
  ];

  return (
    <aside style={{
      background: 'var(--mist-surface)',
      border: '1px solid var(--mist-border)',
      borderRadius: 16,
      display: 'flex', flexDirection: 'column',
      maxHeight: 'calc(100vh - 120px)',
      position: 'sticky', top: 24,
      alignSelf: 'flex-start',
    }}>
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid var(--mist-border)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 8,
          background: 'var(--mist-accent-soft)', color: 'var(--mist-accent-strong)',
          display: 'grid', placeItems: 'center',
        }}><Icon name="sparkles" size={14} /></div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
          <span style={{ fontSize: 13.5, fontWeight: 500 }}>Ассистент</span>
          <span style={{ fontSize: 10.5, color: 'var(--mist-text-faint)' }}>отвечает по вашим данным</span>
        </div>
        <Icon name="more" size={16} style={{ color: 'var(--mist-text-faint)' }} />
      </div>

      <div style={{ flex: 1, padding: '16px 14px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '92%',
            background: m.role === 'user' ? 'var(--mist-text)' : 'var(--mist-surface-2)',
            color: m.role === 'user' ? 'var(--mist-surface)' : 'var(--mist-text)',
            border: m.role === 'user' ? '1px solid var(--mist-text)' : '1px solid var(--mist-border)',
            padding: '10px 12px', borderRadius: 14,
            borderBottomRightRadius: m.role === 'user' ? 4 : 14,
            borderBottomLeftRadius: m.role === 'ai' ? 4 : 14,
            fontSize: 13, lineHeight: 1.5,
          }}>
            {m.html ? m.content : m.text}
          </div>
        ))}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '4px 0' }}>
          {['Что изменилось за 6 мес?', 'Сравни с прошлым годом', 'Что значит ферритин?'].map(s => (
            <span key={s} style={{
              fontSize: 12, padding: '5px 10px', borderRadius: 999,
              background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)',
              color: 'var(--mist-text-muted)', cursor: 'default',
            }}>{s}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 12px 14px', borderTop: '1px solid var(--mist-border)' }}>
        <div style={{ position: 'relative' }}>
          <input className="input" placeholder="Спросите о ваших анализах…" style={{ paddingRight: 70, fontSize: 13 }} />
          <button className="btn btn-sm btn-primary" style={{
            position: 'absolute', right: 4, top: 4, height: 30, padding: '0 10px',
          }}><Icon name="arrowUp" size={13} stroke={2} /></button>
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--mist-text-faint)', marginTop: 6, textAlign: 'center' }}>
          Не заменяет консультацию врача
        </div>
      </div>
    </aside>
  );
}

window.DashboardScreen = DashboardScreen;
