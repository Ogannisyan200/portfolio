import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { categories, projects, type Category } from '../data/projects'
import { img } from '../data/images'
import { PERSON } from '../config'

const skills = [
  'Figma', 'Дизайн-системы', 'Прототипирование', 'UX и UI', 'Адаптивный дизайн', 'Лендинги',
  'Брендбуки', 'Photoshop', 'Illustrator', 'React', 'TypeScript', 'HTML и CSS', 'Storybook',
]

const steps = [
  { t: 'Исследование', d: 'Разбираю задачу, пользователей и сценарии. Смотрю, как всё работает сейчас и где люди спотыкаются.' },
  { t: 'Прототип', d: 'Собираю структуру и связи экранов в Figma и проверяю логику раньше, чем рисую визуал.' },
  { t: 'Согласование', d: 'Показываю команде и заказчику, закрываю граничные случаи: пустые экраны, ошибки, роли.' },
  { t: 'Продакшн', d: 'Передаю в разработку со спецификацией и компонентами или собираю сама на React и TypeScript.' },
]

export default function Home() {
  const [cat, setCat] = useState<'all' | Category>('all')
  const loc = useLocation()

  useEffect(() => {
    const id = (loc.state as { scroll?: string } | null)?.scroll
    if (!id || id === 'top') {
      window.scrollTo(0, 0)
      return
    }
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    return () => window.clearTimeout(t)
  }, [loc.key, loc.state])

  const list = projects.filter((p) => cat === 'all' || p.cats.includes(cat))
  // большая первая карточка в общем списке; последняя тоже на всю ширину, если иначе осталась бы одна в ряду
  const firstWide = cat === 'all'
  const rest = list.length - (firstWide ? 1 : 0)
  const isWide = (i: number) => (firstWide && i === 0) || (rest % 2 === 1 && i === list.length - 1)

  return (
    <main id="top">
      <section className="hero">
        <div className="wrap">
          <h1 className="hero__title">
            Дизайн, который <em>собирается</em>
          </h1>
          <p className="hero__sub">
            Оганнисян Рита. UI/UX и веб-дизайн. Проектирую в Figma и довожу до кода на React.
          </p>
          <div className="hero__cta">
            <Link className="btn btn--solid" to="/" state={{ scroll: 'works' }}>Смотреть работы</Link>
            <Link className="btn" to="/" state={{ scroll: 'about' }}>Обо мне</Link>
          </div>
        </div>
      </section>

      <section id="about" className="sec-home about">
        <div className="wrap about__grid">
          <Reveal>
            <div className="label">Обо мне</div>
            <h2 className="h2">Люблю дизайн во всех его слоях: UX, UI, веб и код</h2>
          </Reveal>
          <Reveal delay={90}>
            <p>
              Я дизайнер, который умеет в код. Мне интересны и продуманные сценарии, и аккуратный интерфейс, и момент, когда макет оживает в браузере.
            </p>
            <p>
              Работаю в продуктовой команде образовательной платформы: проектирую кабинеты, таблицы, тренажёры и дашборды для сотен тысяч школьников и тысяч наставников, а потом сама собираю их на React и TypeScript. Поэтому в моих макетах сразу есть все состояния, сетка и компоненты.
            </p>
            <div className="tags">{skills.map((s) => <span key={s}>{s}</span>)}</div>
            <div className="facts">
              <div><b>210 000+</b><span>школьников пользуются интерфейсами платформы EL</span></div>
              <div><b>3 000</b><span>наставников работают в таблицах, которые я спроектировала</span></div>
            </div>
            <a className="btn btn--solid about__resume" href={PERSON.resume} download>Скачать резюме</a>
          </Reveal>
        </div>
      </section>

      <section id="works" className="sec-home works">
        <div className="wrap">
          <Reveal>
            <div className="label">Работы</div>
            <h2 className="h2">Избранные проекты</h2>
            <div className="filters" role="group" aria-label="Категории работ">
              {categories.map((c) => (
                <button key={c.id} type="button" className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                  {c.label}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="grid" key={cat}>
            {list.map((p, i) => {
              const cv = img(p.cover)
              return (
                <Link key={p.slug} to={`/work/${p.slug}`} className={`card${isWide(i) ? ' card--wide' : ''}`} style={{ animationDelay: `${i * 70}ms` }}>
                  <div className="card__shot">
                    <img src={cv.src} width={cv.w} height={cv.h} alt="" loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />
                  </div>
                  <div className="card__meta">
                    <strong>{p.title}</strong>
                    <span>{p.type}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section id="process" className="sec-home process">
        <div className="wrap">
          <Reveal>
            <div className="label">Как я работаю</div>
            <h2 className="h2">От идеи до продакшна</h2>
          </Reveal>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.t}>
                <Reveal delay={i * 80}>
                  <span className="steps__n">0{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contacts" className="sec-home contacts">
        <div className="wrap contacts__in">
          <Reveal>
            <h2 className="h2">Давайте сделаем что-то вместе</h2>
            <p className="contacts__tg">Пишите в Telegram: <a href={PERSON.telegramUrl} target="_blank" rel="noreferrer">@{PERSON.telegram}</a></p>
          </Reveal>
          <Reveal delay={90} className="contacts__btns">
            <a className="btn btn--solid" href={PERSON.telegramUrl} target="_blank" rel="noreferrer">Написать в Telegram</a>
            <a className="btn" href={PERSON.resume} download>Скачать резюме</a>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
