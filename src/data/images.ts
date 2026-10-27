import meta from './imgmeta.json'

export type Img = { src: string; w: number; h: number }

const sizes = meta as unknown as Record<string, [number, number]>

/** img('lumen/d1') -> { src: 'img/lumen/d1.webp', w, h } */
export function img(name: string): Img {
  const s = sizes[name]
  if (!s) throw new Error('Нет картинки: ' + name)
  return { src: `img/${name}.webp`, w: s[0], h: s[1] }
}
