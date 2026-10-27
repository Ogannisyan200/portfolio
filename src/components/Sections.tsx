import { useState } from 'react'
import type { Section } from '../data/projects'
import Zoom from './Zoom'
import Reveal from './Reveal'

function Head({ title, text }: { title?: string; text?: string }) {
  if (!title && !text) return null
  return (
    <div className="sec__head">
      {title && <h2>{title}</h2>}
      {text && <p>{text}</p>}
    </div>
  )
}

function Tabs({ items, value, onChange, label }: { items: { label: string }[]; value: number; onChange: (i: number) => void; label: string }) {
  if (items.length < 2) return <div className="cmp__label">{items[0]?.label}</div>
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((it, i) => (
        <button key={it.label} role="tab" type="button" aria-selected={value === i} className="tab" onClick={() => onChange(i)}>
          {it.label}
        </button>
      ))}
    </div>
  )
}

export default function Sections({ sections, title }: { sections: Section[]; title: string }) {
  return (
    <>
      {sections.map((s, i) => (
        <Reveal key={i} className="sec">
          <Head title={s.title} text={s.text} />
          {s.kind === 'gallery' && (
            <div className={`gal gal--${s.cols ?? 2}`}>
              {s.shots.map((sh) => (
                <figure key={sh.img} className="gal__item">
                  <Zoom name={sh.img} alt={sh.caption ?? `${title}, ${s.title ?? 'экран'}`} scroll={sh.scroll} maxH={s.cols === 3 ? 520 : 600} />
                  {sh.caption && <figcaption>{sh.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
          {s.kind === 'phones' && (
            <div className="phones">
              {s.shots.map((sh) => (
                <figure key={sh.img} className="phone">
                  <div className="phone__frame">
                    <Zoom name={sh.img} alt={sh.caption ?? `${title}, мобильная версия`} scroll={sh.scroll} maxH={640} />
                  </div>
                  {sh.caption && <figcaption>{sh.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
          {s.kind === 'compare' && <Compare s={s} title={title} />}
        </Reveal>
      ))}
    </>
  )
}

function Compare({ s, title }: { s: Extract<Section, { kind: 'compare' }>; title: string }) {
  const [b, setB] = useState(0)
  const [a, setA] = useState(0)
  return (
    <div className="cmp">
      <div className="cmp__col">
        <div className="cmp__tag">До</div>
        <Tabs items={s.before} value={b} onChange={setB} label="Прежний сайт" />
        <Zoom key={s.before[b].img} name={s.before[b].img} alt={`${title}, прежний сайт: ${s.before[b].label}`} scroll maxH={620} />
      </div>
      <div className="cmp__col">
        <div className="cmp__tag cmp__tag--after">После</div>
        <Tabs items={s.after} value={a} onChange={setA} label="Новый макет" />
        <Zoom key={s.after[a].img} name={s.after[a].img} alt={`${title}, новый макет: ${s.after[a].label}`} scroll maxH={620} />
      </div>
    </div>
  )
}
