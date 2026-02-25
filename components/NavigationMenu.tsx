'use client'

import Link from 'next/link'

export default function NavigationMenu() {
  return (
    <nav className="fixed bottom-6 right-6 z-20">
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-4 py-3 shadow-lg">
        <ul className="flex flex-col gap-2 text-xs">
          <li>
            <Link
              href="/projects"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Projets
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-600 hover:text-black transition-colors"
            >
              À propos
            </Link>
          </li>
          <li>
            <Link
              href="/studio"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Studio
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
