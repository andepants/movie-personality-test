import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1 className="flex m-5 p-2 justify-center text-5xl font-bold text-gray-800 mb-4">Movie Personality Test</h1>

      <Link href='/quiz' className="flex justify-center">
        <button className="px-4 m-2 py-2 rounded bg-blue-500 text-white font-bold">
          Quiz
        </button>
      </Link>
      <Link href='/results' className="flex justify-center">
        <button className="px-4 m-2 py-2 rounded bg-blue-500 text-white font-bold">
          Results
        </button>
      </Link>
    </main>
  )
}
