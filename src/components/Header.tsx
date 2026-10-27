import { Link } from 'react-router-dom'
import Monogram from './Monogram'
import { LOGO_VARIANT, PERSON } from '../config'

export default function Header() {
  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <Link to="/" state={{ scroll: 'top' }} className="brand" aria-label="На главную">
          <Monogram variant={LOGO_VARIANT} size={34} />
          <span className="brand__name">{PERSON.name}</span>
        </Link>
        <nav className="nav" aria-label="Разделы">
          <Link to="/" state={{ scroll: 'works' }}>Работы</Link>
          <Link to="/" state={{ scroll: 'about' }}>Обо мне</Link>
          <Link to="/" state={{ scroll: 'contacts' }}>Контакты</Link>
        </nav>
        <a className="pill" href={PERSON.telegramUrl} target="_blank" rel="noreferrer">Написать</a>
      </div>
    </header>
  )
}
