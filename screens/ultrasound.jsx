/* global React, Icon, Sidebar, Topbar, ULTRASOUNDS */

function UltrasoundScreen() {
  const items = ULTRASOUNDS;
  return (
    <div className="phos-root" style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sidebar active="ultrasound" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="УЗИ и обследования"
          subtitle="6 исследований · 2022 — 2025"
          right={<>
            <button className="btn"><Icon name="filter" size={14} /> Орган</button>
            <button className="btn"><Icon name="sort" size={14} /> По дате</button>
            <button className="btn btn-primary"><Icon name="upload" size={14} /> Добавить</button>
          </>}
        />

        <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px 40px' }}>
          {/* year selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {['2025', '2024', '2023', '2022', 'Все годы'].map((y, i) => (
              <span key={y} style={{
                padding: '6px 14px', fontSize: 13, borderRadius: 999,
                background: i === 0 ? 'var(--mist-text)' : 'var(--mist-surface)',
                color: i === 0 ? 'var(--mist-surface)' : 'var(--mist-text-muted)',
                border: '1px solid ' + (i === 0 ? 'var(--mist-text)' : 'var(--mist-border)'),
                fontWeight: 500, cursor: 'default',
              }}>{y}</span>
            ))}
          </div>

          {/* timeline rail */}
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{
              position: 'absolute', left: 11, top: 6, bottom: 6,
              width: 1, background: 'var(--mist-border)',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {items.map((u, i) => (
                <UltrasoundCard key={u.id} u={u} isFirst={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function UltrasoundCard({ u, isFirst }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* dot */}
      <div style={{
        position: 'absolute', left: -27, top: 22,
        width: 12, height: 12, borderRadius: 999,
        background: isFirst ? 'var(--mist-accent-strong)' : 'var(--mist-surface)',
        border: '2px solid ' + (isFirst ? 'var(--mist-accent-strong)' : 'var(--mist-border-strong)'),
        boxShadow: '0 0 0 4px var(--mist-bg)',
      }} />

      <div className="surface" style={{
        padding: 0,
        display: 'grid', gridTemplateColumns: '220px 1fr auto',
        overflow: 'hidden',
      }}>
        {/* preview / thumbnail */}
        <div style={{
          background: 'var(--mist-surface-2)',
          borderRight: '1px solid var(--mist-border)',
          padding: 18, display: 'flex', flexDirection: 'column', gap: 8,
          position: 'relative',
        }}>
          <UltrasoundThumb organ={u.name} />
          <span className="mono" style={{ fontSize: 11, color: 'var(--mist-text-faint)' }}>{u.date}</span>
        </div>

        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h3 className="t-h3" style={{ margin: 0 }}>{u.name}</h3>
            <span className="badge badge-mint"><span className="dot" />{u.verdict}</span>
          </div>
          <div style={{ display: 'flex', gap: 18, fontSize: 12, color: 'var(--mist-text-faint)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Icon name="folder" size={12} /> {u.clinic}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Icon name="user" size={12} /> {u.doctor}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'var(--mist-text)', textWrap: 'pretty' }}>
            {u.findings}
          </p>

          {/* parameters */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
            marginTop: 4,
            padding: '10px 12px', borderRadius: 10,
            background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)',
          }}>
            {(u.name.includes('щитовид') ? [
              ['прав. доля', '6.2 мл'], ['лев. доля', '5.8 мл'], ['перешеек', '2.1 мм'], ['узлы', 'нет'],
            ] : u.name.includes('брюш') ? [
              ['печень', 'однород.'], ['желчный', 'без камней'], ['поджел.', 'норма'], ['селезёнка', 'не увелич.'],
            ] : u.name.includes('таз') ? [
              ['матка', '47×35×42'], ['эндометрий', '8.2 мм'], ['яичники', 'типичные'], ['свобод. жид.', 'нет'],
            ] : [
              ['BI-RADS', '2'], ['лев. железа', 'фкм'], ['прав. железа', 'фкм'], ['л/у', 'не увелич.'],
            ]).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 10.5, color: 'var(--mist-text-faint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k}</span>
                <span className="num" style={{ fontSize: 13, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 6, borderLeft: '1px solid var(--mist-border)' }}>
          <button className="btn btn-sm"><Icon name="eye" size={12} /> Заключение</button>
          <button className="btn btn-sm"><Icon name="download" size={12} /> Скачать</button>
          <button className="btn btn-sm btn-ghost"><Icon name="more" size={12} /></button>
        </div>
      </div>
    </div>
  );
}

// Minimal abstract ultrasound thumbnail — striped placeholder w/ shape hint
function UltrasoundThumb({ organ }) {
  return (
    <div style={{
      width: '100%', aspectRatio: '4 / 3',
      borderRadius: 8,
      background: 'radial-gradient(120% 90% at 50% 60%, oklch(0.92 0.012 230) 0%, oklch(0.86 0.014 230) 60%, oklch(0.78 0.018 230) 100%)',
      position: 'relative', overflow: 'hidden',
      border: '1px solid var(--mist-border-strong)',
    }}>
      {/* striped overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, oklch(1 0 0 / 0.07) 0 1px, transparent 1px 4px)',
        opacity: 0.6,
      }} />
      {/* sector frame */}
      <svg viewBox="0 0 100 75" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M 50 5 L 95 70 A 50 50 0 0 0 5 70 Z" fill="none"
          stroke="oklch(0.4 0.02 240 / 0.25)" strokeWidth="0.4" strokeDasharray="1 1" />
        <ellipse cx="50" cy="42" rx="22" ry="14" fill="oklch(0.4 0.02 240 / 0.18)" />
        <ellipse cx="50" cy="42" rx="14" ry="9" fill="oklch(0.3 0.02 240 / 0.22)" />
      </svg>
      <span className="mono" style={{
        position: 'absolute', top: 6, left: 8,
        fontSize: 9, color: 'oklch(0.3 0.02 240 / 0.6)',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>UZ · превью</span>
    </div>
  );
}

window.UltrasoundScreen = UltrasoundScreen;
