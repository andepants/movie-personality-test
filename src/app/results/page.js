import Link from 'next/link'

export default function Results() {
  return (
    <main>
      <h1 class="flex m-5 p-2 justify-center text-5xl font-bold text-gray-800 mb-4">This is the Result component</h1>

      <Link href='/' className="flex justify-center">
        <button className="px-4 m-2 py-2 rounded bg-blue-500 text-white font-bold">
          Home
        </button>
      </Link>
    </main>
  )
}