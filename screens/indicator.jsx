/* global React, Icon, Sidebar, Topbar, LineChart, Sparkline, MARKERS, HISTORY_DATES */

function IndicatorScreen() {
  const m = MARKERS.find(x => x.code === 'FER');
  const related = ['HGB', 'FE', 'B12'].map(c => MARKERS.find(x => x.code === c));

  return (
    <div className="phos-root" style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sidebar active="indicators" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title={m.name}
          breadcrumbs={['Показатели', m.group, m.name]}
          subtitle={m.code + ' · ' + m.unit}
          right={<>
            <button className="btn"><Icon name="plus" size={14} /> Закрепить</button>
            <button className="btn"><Icon name="download" size={14} /></button>
            <button className="btn"><Icon name="more" size={14} /></button>
          </>}
        />

        <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px 40px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            {/* hero */}
            <section className="surface" style={{ padding: '24px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28, marginBottom: 22 }}>
                <div>
                  <div className="t-eyebrow" style={{ marginBottom: 8 }}>текущее значение · 12.09.2025</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span className="num" style={{ fontSize: 64, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1 }}>{m.value}</span>
                    <span style={{ fontSize: 17, color: 'var(--mist-text-faint)' }}>{m.unit}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 6 }}>
                  <span className="badge badge-amber" style={{ height: 24, fontSize: 12 }}>
                    <span className="dot" /> ниже целевого
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--mist-text-faint)' }} className="mono">
                    норма {m.range[0]}–{m.range[1]} {m.unit}
                  </span>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>Δ за 6 месяцев</span>
                  <span className="num" style={{ fontSize: 22, fontWeight: 500, color: 'var(--status-amber)' }}>−16</span>
                </div>
              </div>

              {/* range visualization */}
              <div style={{ padding: '14px 0' }}>
                <div className="range-bar">
                  <div className="marker" style={{ left: `${(m.value / 200) * 100}%` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--mist-text-faint)' }} className="mono">
                  <span>0</span>
                  <span style={{ color: 'var(--status-coral)' }}>← ниже референса</span>
                  <span>30</span>
                  <span>150 норма</span>
                  <span style={{ color: 'var(--status-amber)' }}>избыток →</span>
                  <span>200+</span>
                </div>
              </div>

              {/* time selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, marginBottom: 12 }}>
                <h3 className="t-h3" style={{ margin: 0 }}>Динамика</h3>
                <span style={{ flex: 1 }} />
                <div style={{ display: 'flex', gap: 4, padding: 3, borderRadius: 10, background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)' }}>
                  {['3М', '6М', '1Г', '2Г', '5Л', 'Всё'].map((p, i) => (
                    <span key={p} style={{
                      padding: '4px 10px', fontSize: 12, fontWeight: 500, borderRadius: 7,
                      color: i === 4 ? 'var(--mist-text)' : 'var(--mist-text-faint)',
                      background: i === 4 ? 'var(--mist-surface)' : 'transparent',
                      border: i === 4 ? '1px solid var(--mist-border)' : '1px solid transparent',
                    }}>{p}</span>
                  ))}
                </div>
              </div>

              <LineChart
                data={m.history.map((y, i) => ({ x: i, y }))}
                range={m.range}
                yMin={0}
                yMax={160}
                unit={' нг/мл'}
                xLabels={HISTORY_DATES.map(d => d.split(' ')[0])}
                h={260}
              />

              {/* annotations row */}
              <div style={{
                marginTop: 18, padding: '14px 16px',
                background: 'var(--mist-accent-tint)',
                border: '1px solid color-mix(in oklch, var(--mist-accent) 30%, var(--mist-border))',
                borderRadius: 12,
                display: 'flex', alignItems: 'flex-start', gap: 12,
              }}>
                <Icon name="sparkles" size={16} style={{ color: 'var(--mist-accent-strong)', marginTop: 2 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 4 }}>
                    Снижается 4 цикла подряд
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--mist-text-muted)', lineHeight: 1.5 }}>
                    Снижение началось с августа 2024. В сентябре впервые видна стабилизация.
                    Возможные причины и дальнейшие шаги лучше обсудить с врачом, особенно если есть симптомы
                    или уже назначено наблюдение.
                  </div>
                </div>
              </div>
            </section>

            {/* history detail */}
            <section className="surface">
              <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--mist-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="t-h3" style={{ margin: 0 }}>История измерений</h3>
                <span style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>6 измерений</span>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: 22 }}>дата</th>
                    <th>значение</th>
                    <th>Δ</th>
                    <th>в норме</th>
                    <th>источник</th>
                    <th style={{ paddingRight: 22 }}>заметка</th>
                  </tr>
                </thead>
                <tbody>
                  {m.history.map((v, i) => {
                    const prev = i > 0 ? m.history[i - 1] : null;
                    const delta = prev !== null ? v - prev : null;
                    const inRange = v >= m.range[0] && v <= m.range[1];
                    return (
                      <tr key={i}>
                        <td style={{ paddingLeft: 22 }}><span className="mono" style={{ fontSize: 12 }}>{HISTORY_DATES[i]}</span></td>
                        <td><span className="num" style={{ fontSize: 14, fontWeight: 500 }}>{v}</span> <span style={{ fontSize: 11, color: 'var(--mist-text-faint)' }}>{m.unit}</span></td>
                        <td>
                          {delta !== null && (
                            <span className="num" style={{
                              fontSize: 12.5,
                              color: delta > 0 ? 'var(--status-mint)' : delta < 0 ? 'var(--status-amber)' : 'var(--mist-text-faint)',
                            }}>{delta > 0 ? '+' : ''}{delta}</span>
                          )}
                        </td>
                        <td>
                          <span className={`badge ${inRange ? 'badge-mint' : 'badge-amber'}`}>
                            <span className="dot" />{inRange ? 'да' : 'нет'}
                          </span>
                        </td>
                        <td><span style={{ fontSize: 12.5, color: 'var(--mist-text-muted)' }}>{['KDL', 'Инвитро', 'Гемотест', 'KDL', 'Инвитро', 'Инвитро'][i]}</span></td>
                        <td style={{ paddingRight: 22, color: 'var(--mist-text-faint)', fontSize: 12 }}>
                          {i === 3 && 'консультация эндокринолога'}
                          {i === 4 && 'консультация и рекомендации врача'}
                          {i === 5 && '+ контроль через 6 нед'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </div>

          {/* right column */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* about */}
            <div className="surface" style={{ padding: '18px 20px' }}>
              <div className="t-eyebrow" style={{ marginBottom: 10 }}>что это</div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>
                <b>Ферритин</b> — белок, в котором ваше тело хранит запасы железа.
                Он часто помогает врачу оценивать обеспеченность железом вместе с жалобами,
                гемоглобином и другими показателями.
              </p>
              <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['железо', 'гематология', 'женское здоровье'].map(t => (
                  <span key={t} className="badge badge-ghost">{t}</span>
                ))}
              </div>
            </div>

            {/* related */}
            <div className="surface" style={{ padding: '18px 20px' }}>
              <div className="t-eyebrow" style={{ marginBottom: 12 }}>связанные показатели</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {related.map(r => (
                  <div key={r.code} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '8px 0',
                    borderBottom: '1px solid var(--mist-border)',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: 'var(--mist-text-faint)' }}>{r.code}</div>
                    </div>
                    <Sparkline data={r.history} color={r.status === 'mint' ? 'var(--status-mint)' : 'var(--status-amber)'} w={60} h={22} />
                    <div style={{ textAlign: 'right', minWidth: 50 }}>
                      <div className="num" style={{ fontSize: 14, fontWeight: 500 }}>{r.value}</div>
                      <div style={{ fontSize: 10, color: 'var(--mist-text-faint)' }}>{r.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI insight */}
            <div className="surface" style={{
              padding: '18px 20px',
              background: 'linear-gradient(160deg, var(--mist-accent-tint) 0%, var(--mist-surface) 75%)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Icon name="sparkles" size={14} style={{ color: 'var(--mist-accent-strong)' }} />
                <span className="t-eyebrow" style={{ color: 'var(--mist-accent-strong)' }}>AI-комментарий</span>
              </div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>
                В последних циклах виден нисходящий тренд, а в последнем измерении — небольшая стабилизация.
                Это не диагноз, но хороший повод подготовить вопросы врачу и сверить план контроля.
              </p>
              <button className="btn btn-sm" style={{ marginTop: 12 }}>
                Спросить подробнее <Icon name="arrowRight" size={11} />
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

window.IndicatorScreen = IndicatorScreen;
