import Link from 'next/link'

export default function Header() {
  return (
    <div className="text-left container">
      <nav className="flex items-center text-2xl md:text-3xl font-bold tracking-tight md:tracking-tighter leading-tight mb-12 mt-8">
        <Link href="/">
          <a className="text-black hover:text-gray-600 hover:underline mr-3">Home</a>
        </Link>
      </nav>
    </div>
  )
}
