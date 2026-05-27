/* global React, Icon, Sidebar, Topbar, PREGNANCY, MARKERS, ULTRASOUNDS, LineChart, HISTORY_DATES */

function PregnancyScreen() {
  const focusMarkers = ['HGB', 'FER', 'TSH', 'GLU'].map(code => MARKERS.find(m => m.code === code));
  const pregnancyUltrasounds = ULTRASOUNDS.slice(0, 3);

  return (
    <div className="phos-root" style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sidebar active="pregnancy" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Беременность"
          subtitle={`${PREGNANCY.currentWeek} неделя · ${PREGNANCY.trimester} триместр · ПДР ${PREGNANCY.dueDate}`}
          right={<>
            <button className="btn"><Icon name="calendar" size={14} /> Календарь</button>
            <button className="btn"><Icon name="download" size={14} /> Отчёт врачу</button>
            <button className="btn btn-primary"><Icon name="upload" size={14} /> Добавить документ</button>
          </>}
        />

        <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px 40px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            <section className="surface" style={{ padding: '22px 24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 26, alignItems: 'center' }}>
                <PregnancyRing week={PREGNANCY.currentWeek} />
                <div>
                  <div className="t-eyebrow" style={{ marginBottom: 8 }}>специальный режим</div>
                  <h2 className="t-h1" style={{ margin: 0, marginBottom: 10 }}>Анализы с привязкой к неделе беременности</h2>
                  <p style={{ margin: 0, color: 'var(--mist-text-muted)', fontSize: 14, lineHeight: 1.55, maxWidth: 620 }}>
                    Система показывает дату анализа, триместр и неделю беременности на момент сдачи.
                    Референсы и AI-комментарии формулируются осторожно и предназначены для подготовки к консультации.
                  </p>
                  <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                    <span className="badge badge-sky"><span className="dot" />старт {PREGNANCY.startDate}</span>
                    <span className="badge badge-mint"><span className="dot" />следующий скрининг {PREGNANCY.nextScreening}</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle title="Показатели в фокусе" hint="группировка по триместрам" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {focusMarkers.map((m, i) => <PregnancyMarker key={m.code} m={m} week={[9, 12, 16, 18][i]} />)}
              </div>
            </section>

            <section className="surface" style={{ padding: '20px 22px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <div className="t-eyebrow" style={{ marginBottom: 6 }}>динамика во время беременности</div>
                  <h3 className="t-h2" style={{ margin: 0 }}>Гемоглобин</h3>
                </div>
                <span className="badge badge-mint"><span className="dot" />18 неделя</span>
              </div>
              <LineChart
                data={focusMarkers[0].history.map((y, i) => ({ x: i, y }))}
                range={focusMarkers[0].range}
                yMin={105}
                yMax={155}
                unit={' г/л'}
                xLabels={HISTORY_DATES.map((_, i) => `${[5, 8, 11, 14, 16, 18][i]}н`)}
                h={230}
              />
            </section>

            <section className="surface">
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--mist-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="t-h3" style={{ margin: 0 }}>УЗИ и скрининги</h3>
                <button className="btn btn-sm"><Icon name="plus" size={12} /> Добавить</button>
              </div>
              {pregnancyUltrasounds.map((u, i) => (
                <div key={u.id} style={{
                  padding: '14px 20px',
                  display: 'grid', gridTemplateColumns: '92px 1fr auto',
                  gap: 16, alignItems: 'center',
                  borderBottom: i < pregnancyUltrasounds.length - 1 ? '1px solid var(--mist-border)' : 'none',
                }}>
                  <span className="badge badge-ghost">{[8, 12, 18][i]} неделя</span>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>{u.clinic} · {u.date}</div>
                  </div>
                  <button className="btn btn-sm"><Icon name="eye" size={12} /> Открыть</button>
                </div>
              ))}
            </section>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="surface" style={{ padding: '18px 20px' }}>
              <div className="t-eyebrow" style={{ marginBottom: 12 }}>триместры</div>
              {[
                ['1 триместр', '1–13 недель', 'completed'],
                ['2 триместр', '14–27 недель', 'active'],
                ['3 триместр', '28–40 недель', 'future'],
              ].map(([title, weeks, state]) => (
                <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--mist-border)' }}>
                  <span style={{
                    width: 9, height: 9, borderRadius: 999,
                    background: state === 'active' ? 'var(--mist-accent-strong)' : state === 'completed' ? 'var(--status-mint)' : 'var(--mist-border-strong)',
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{title}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--mist-text-faint)' }}>{weeks}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="surface" style={{ padding: '18px 20px', background: 'var(--mist-accent-tint)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Icon name="sparkles" size={14} style={{ color: 'var(--mist-accent-strong)' }} />
                <span className="t-eyebrow" style={{ color: 'var(--mist-accent-strong)' }}>AI-сводка</span>
              </div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>
                На 18 неделе заметных резких изменений по закреплённым показателям не видно.
                Ферритин ниже выбранного референса, это можно спокойно обсудить с врачом на плановом приёме.
              </p>
              <button className="btn btn-sm" style={{ marginTop: 12 }}>Подготовить вопросы врачу</button>
            </div>

            <div style={{ fontSize: 11.5, color: 'var(--mist-text-faint)', lineHeight: 1.6, padding: '0 4px' }}>
              Сервис не является медицинским изделием и не заменяет консультацию врача.
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function PregnancyRing({ week }) {
  const pct = week / 40;
  const r = 82;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: 220, height: 220 }}>
      <svg viewBox="0 0 220 220" width="220" height="220">
        <circle cx="110" cy="110" r={r} fill="none" stroke="var(--mist-border)" strokeWidth="14" />
        <circle cx="110" cy="110" r={r} fill="none" stroke="var(--mist-accent-strong)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${pct * c} ${c}`} transform="rotate(-90 110 110)" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div className="num" style={{ fontSize: 54, fontWeight: 500, lineHeight: 1 }}>{week}</div>
          <div style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>неделя из 40</div>
        </div>
      </div>
    </div>
  );
}

function PregnancyMarker({ m, week }) {
  const cls = m.status === 'mint' ? 'badge-mint' : m.status === 'amber' ? 'badge-amber' : 'badge-coral';
  return (
    <div className="surface" style={{ padding: '15px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 12.5, color: 'var(--mist-text-faint)' }}>{m.name}</span>
        <span className={`badge ${cls}`}><span className="dot" />{week}н</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span className="num" style={{ fontSize: 27, fontWeight: 500 }}>{m.value}</span>
        <span style={{ fontSize: 11.5, color: 'var(--mist-text-faint)' }}>{m.unit}</span>
      </div>
      <div className="mono" style={{ marginTop: 6, fontSize: 10.5, color: 'var(--mist-text-faint)' }}>реф. {m.range[0]}–{m.range[1]}</div>
    </div>
  );
}

function SectionTitle({ title, hint }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
      <h3 className="t-h3" style={{ margin: 0 }}>{title}</h3>
      <span style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>{hint}</span>
    </div>
  );
}

window.PregnancyScreen = PregnancyScreen;
