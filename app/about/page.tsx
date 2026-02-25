import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-block mb-8 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Retour à l&apos;accueil
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              À propos
            </h1>
            <p className="text-xl text-gray-600">
              Passionné(e) par la création et le design
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                Bonjour ! Je suis Camille, créatif(ve) et designer passionné(e)
                par l&apos;art visuel et les nouvelles technologies.
              </p>

              <p className="leading-relaxed">
                Avec plusieurs années d&apos;expérience dans le domaine du design,
                je m&apos;efforce de créer des projets qui allient esthétique et
                fonctionnalité. Mon approche se concentre sur la simplicité,
                l&apos;élégance et l&apos;attention aux détails.
              </p>

              <p className="leading-relaxed">
                Chaque projet est une opportunité d&apos;explorer de nouvelles idées
                et de repousser les limites de la créativité. Je travaille avec
                diverses techniques et outils pour donner vie à des concepts
                innovants et percutants.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Compétences</h2>
                <div className="space-y-2">
                  {['Design graphique', 'UI/UX Design', 'Motion Design', 'Direction artistique', 'Illustration', 'Branding'].map((skill) => (
                    <div key={skill} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Outils</h2>
                <div className="flex flex-wrap gap-2">
                  {['Photoshop', 'Illustrator', 'After Effects', 'Figma', 'Blender', 'Cinema 4D'].map((tool) => (
                    <span
                      key={tool}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-8">Parcours</h2>
            <div className="space-y-8">
              <div className="border-l-4 border-black pl-6">
                <div className="text-sm text-gray-500 mb-1">2020 - Présent</div>
                <h3 className="text-xl font-semibold mb-2">Designer indépendant</h3>
                <p className="text-gray-600">
                  Collaboration avec diverses entreprises et clients pour créer
                  des identités visuelles uniques et des designs impactants.
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-6">
                <div className="text-sm text-gray-500 mb-1">2018 - 2020</div>
                <h3 className="text-xl font-semibold mb-2">Senior Designer</h3>
                <p className="text-gray-600">
                  Direction créative et conception de projets variés pour
                  une agence de design renommée.
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-6">
                <div className="text-sm text-gray-500 mb-1">2015 - 2018</div>
                <h3 className="text-xl font-semibold mb-2">Designer graphique</h3>
                <p className="text-gray-600">
                  Développement de compétences en design graphique et
                  motion design au sein d&apos;une équipe créative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
