import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-block mb-8 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Retour à l&apos;accueil
        </Link>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Contact
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Une question, un projet ? N&apos;hésitez pas à me contacter.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                placeholder="Votre message..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Envoyer le message
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Autres moyens de contact</h2>
            <div className="space-y-2 text-gray-600">
              <p>Email: <a href="mailto:contact@example.com" className="text-black hover:underline">contact@example.com</a></p>
              <p>LinkedIn: <a href="#" className="text-black hover:underline">linkedin.com/in/camille</a></p>
              <p>Instagram: <a href="#" className="text-black hover:underline">@camille</a></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
