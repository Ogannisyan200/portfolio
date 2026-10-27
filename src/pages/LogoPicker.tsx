import { Link } from 'react-router-dom'
import Monogram, { type LogoVariant } from '../components/Monogram'
import { PERSON } from '../config'

const variants: { id: LogoVariant; title: string; text: string }[] = [
  { id: 'ligature', title: 'Лигатура', text: 'О и Р делят одну вертикаль. Самый компактный знак.' },
  { id: 'ring', title: 'Круг', text: 'Буквы в тонком круге, как кольцо на экране с дроном.' },
  { id: 'orbit', title: 'Орбита', text: 'Буквы внутри наклонной орбиты с точкой.' },
]

export default function LogoPicker() {
  return (
    <main className="case">
      <div className="wrap">
        <Link className="back" to="/">← На главную</Link>
        <header className="case__head">
          <div className="label">Монограмма</div>
          <h1 className="case__title">Три варианта «ОР»</h1>
          <p className="case__sub">Выбранный вариант прописывается в src/config.ts, строка LOGO_VARIANT.</p>
        </header>
        <div className="logos">
          {variants.map((v) => (
            <div key={v.id} className="logos__item">
              <div className="logos__big"><Monogram variant={v.id} size={120} /></div>
              <div className="logos__row">
                <Monogram variant={v.id} size={34} />
                <span>{PERSON.name}</span>
              </div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
              <code>{v.id}</code>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
