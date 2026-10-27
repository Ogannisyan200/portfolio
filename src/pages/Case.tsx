import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Sections from '../components/Sections'
import { bySlug, projects } from '../data/projects'

export default function Case() {
  const { slug } = useParams()
  const p = bySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (p) document.title = `${p.title} — Оганнисян Рита`
    return () => {
      document.title = 'Оганнисян Рита — дизайнер'
    }
  }, [p])

  if (!p) return <Navigate to="/" replace />

  const idx = projects.findIndex((x) => x.slug === p.slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <main className="case">
      <div className="wrap">
        <Link className="back" to="/" state={{ scroll: 'works' }}>← Все работы</Link>

        <header className="case__head">
          <div className="label">{p.type}</div>
          <h1 className="case__title">{p.title}</h1>
          <p className="case__sub">{p.subtitle}</p>
        </header>

        <dl className="meta">
          <div><dt>Роль</dt><dd>{p.role}</dd></div>
          {p.meta.map((m) => (
            <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
          ))}
        </dl>

        {p.note && <p className="nda">{p.note}</p>}

        <Reveal className="intro">
          <div>
            <div className="label">О проекте</div>
            <p>{p.brief}</p>
          </div>
          <div>
            <div className="label">Задача</div>
            <p>{p.task}</p>
          </div>
        </Reveal>

        {p.stats && (
          <Reveal className="stats">
            {p.stats.map((s) => (
              <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </Reveal>
        )}

        <section className="decisions">
          <Reveal><h2 className="h2 h2--sm">Что сделано и почему</h2></Reveal>
          <div className="decisions__grid">
            {p.decisions.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 70}>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <Sections sections={p.sections} title={p.title} />

        <Reveal className="next">
          <div className="label">Следующая работа</div>
          <Link to={`/work/${next.slug}`} className="next__link">
            <span>{next.title}</span>
            <i aria-hidden="true">→</i>
          </Link>
        </Reveal>
      </div>
    </main>
  )
}
