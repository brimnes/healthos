/* global React, Icon, Sidebar, Topbar */

function UploadScreen() {
  const queue = [
    { name: 'krov_invitro_12_09_2025.pdf', size: '1.2 МБ', state: 'requires_review', progress: 100, markers: 24, found: 'Развёрнутый анализ крови' },
    { name: 'biohimiya_gemotest.pdf',       size: '0.8 МБ', state: 'processing',      progress: 78,  markers: 14, found: 'Биохимия + липиды' },
    { name: 'gormony_kdl.pdf',              size: '0.6 МБ', state: 'processing',      progress: 42,  markers: 4,  found: 'Гормоны щитовидной железы' },
    { name: 'zaklyuchenie.docx',            size: '0.4 МБ', state: 'uploaded',        progress: 0,   markers: 0,  found: 'заключение врача' },
    { name: 'IMG_3421.heic',                size: '3.1 МБ', state: 'uploaded',        progress: 0,   markers: 0,  found: 'фотография анализа' },
  ];

  return (
    <div className="phos-root" style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sidebar active="upload" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Загрузка документов"
          breadcrumbs={['Профиль', 'Документы', 'Новая загрузка']}
          right={<>
            <button className="btn"><Icon name="folder" size={14} /> Из почты</button>
            <button className="btn"><Icon name="folder" size={14} /> Из Google Drive</button>
          </>}
        />

        <div style={{ flex: 1, padding: '28px 32px 40px', overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, maxWidth: 1400 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Drop zone */}
            <div style={{
              border: '1.5px dashed var(--mist-border-strong)',
              borderRadius: 20,
              padding: '54px 36px',
              background: 'linear-gradient(180deg, var(--mist-accent-tint) 0%, var(--mist-surface) 80%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'var(--mist-surface)', border: '1px solid var(--mist-border)',
                display: 'grid', placeItems: 'center', color: 'var(--mist-accent-strong)',
                boxShadow: 'var(--shadow-card)',
              }}>
                <Icon name="upload" size={24} stroke={1.4} />
              </div>
              <div>
                <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.018em', marginBottom: 4 }}>
                  Перетащите файлы сюда
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--mist-text-muted)' }}>
                  PDF, DOCX, JPG, PNG, HEIC · до 50 МБ · несколько файлов сразу
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <button className="btn btn-primary"><Icon name="folder" size={14} /> Выбрать файлы</button>
                <button className="btn"><Icon name="scan" size={14} /> Сфотографировать</button>
              </div>
              <div style={{
                marginTop: 14, display: 'flex', gap: 22, fontSize: 12, color: 'var(--mist-text-faint)',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="check" size={11} /> end-to-end шифрование
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="check" size={11} /> распознавание ~0.4 сек
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="check" size={11} /> любая лаборатория
                </span>
              </div>
            </div>

            {/* Processing queue */}
            <section className="surface">
              <div style={{
                padding: '14px 18px', borderBottom: '1px solid var(--mist-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <h3 className="t-h3" style={{ margin: 0 }}>В обработке</h3>
                  <span style={{ fontSize: 12.5, color: 'var(--mist-text-faint)' }}>4 файла · 5.7 МБ</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-sm">Свернуть всё</button>
                </div>
              </div>
              <div>
                {queue.map((f, i) => <QueueRow key={i} f={f} last={i === queue.length - 1} />)}
              </div>
            </section>
          </div>

          {/* right: how it works */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="surface" style={{ padding: '18px 20px' }}>
              <div className="t-eyebrow" style={{ marginBottom: 12 }}>как это работает</div>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['1', 'Загрузка', 'PDF, фото или скан — без ограничений по лаборатории'],
                  ['2', 'OCR', 'Распознаём текст с учётом структуры таблиц'],
                  ['3', 'AI-извлечение', 'Сопоставляем показатели, единицы, референсные значения'],
                  ['4', 'Проверка', 'Вы подтверждаете распознавание — это занимает ~30 сек'],
                  ['5', 'Готово', 'Данные попадают в графики и сравниваются с историей'],
                ].map(([n, t, s]) => (
                  <li key={n} style={{ display: 'flex', gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 999,
                      background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)',
                      display: 'grid', placeItems: 'center', flex: '0 0 auto',
                      fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--mist-text-muted)',
                    }}>{n}</div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: '-0.005em' }}>{t}</div>
                      <div style={{ fontSize: 12, color: 'var(--mist-text-faint)', lineHeight: 1.4 }}>{s}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="surface" style={{
              padding: '18px 20px',
              background: 'var(--mist-accent-tint)',
              borderColor: 'color-mix(in oklch, var(--mist-accent) 35%, var(--mist-border))',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Icon name="info" size={14} style={{ color: 'var(--mist-accent-strong)' }} />
                <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--mist-accent-strong)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>совет</span>
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--mist-text)' }}>
                Подключите почту и health.os будет автоматически забирать новые
                результаты из лаборатории. Никто не увидит писем, кроме вас.
              </div>
              <button className="btn btn-sm" style={{ marginTop: 12 }}>Подключить почту</button>
            </div>

            <div style={{ fontSize: 11.5, color: 'var(--mist-text-faint)', lineHeight: 1.6, padding: '0 4px' }}>
              Документы хранятся в зашифрованном виде. Только вы можете их прочитать.
              Распознавание происходит на изолированных вычислительных узлах.
              Подробнее в <u>политике обработки данных</u>.
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function QueueRow({ f, last }) {
  const stateLabel = {
    uploaded: { txt: 'uploaded', color: 'var(--mist-text-faint)', icon: 'clock' },
    processing: { txt: 'processing · OCR и AI', color: 'var(--status-sky)', icon: 'scan' },
    requires_review: { txt: 'requires_review · нужна проверка', color: 'var(--status-amber)', icon: 'info' },
    completed: { txt: 'completed', color: 'var(--status-mint)', icon: 'check' },
    error: { txt: 'error', color: 'var(--status-coral)', icon: 'x' },
  }[f.state];

  return (
    <div style={{
      padding: '14px 18px',
      borderBottom: last ? 'none' : '1px solid var(--mist-border)',
      display: 'grid', gridTemplateColumns: '44px 1fr 220px auto', gap: 16, alignItems: 'center',
    }}>
      <div style={{
        width: 36, height: 44, borderRadius: 8,
        background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)',
        display: 'grid', placeItems: 'center',
        fontFamily: 'Geist Mono', fontSize: 9, color: 'var(--mist-text-faint)',
      }}>{f.name.endsWith('heic') ? 'IMG' : f.name.endsWith('docx') ? 'DOC' : 'PDF'}</div>

      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {f.name}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--mist-text-faint)', display: 'flex', gap: 10 }}>
          <span>{f.size}</span>
          {f.found && <><span>·</span><span>{f.found}</span></>}
          {f.markers > 0 && <><span>·</span><span className="mono">{f.markers} показателей</span></>}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name={stateLabel.icon} size={12} style={{ color: stateLabel.color }} />
          <span style={{ fontSize: 12, color: stateLabel.color }}>{stateLabel.txt}</span>
          {f.state === 'processing' && (
            <span className="mono" style={{ fontSize: 11, color: 'var(--mist-text-faint)', marginLeft: 'auto' }}>{f.progress}%</span>
          )}
        </div>
        <div style={{ height: 4, background: 'var(--mist-surface-3)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${f.progress}%`,
            background: f.state === 'done' ? 'var(--status-mint)' : stateLabel.color,
            borderRadius: 999, transition: 'width .3s',
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4 }}>
        {f.state === 'requires_review' ? (
          <button className="btn btn-sm btn-primary">Проверить <Icon name="arrowRight" size={12} /></button>
        ) : (
          <button className="btn btn-sm btn-ghost"><Icon name="x" size={13} /></button>
        )}
      </div>
    </div>
  );
}

window.UploadScreen = UploadScreen;
