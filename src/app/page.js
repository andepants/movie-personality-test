"use client"
import React from 'react';
import Recommendation from '../component/Recommendation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const searchQuery = 'Romantic Comadies';
  const notify = () => toast("Wow so easy !");

  return (
    <main>
      <button onClick={notify}>Notify !</button>
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
      <Recommendation searchQuery={searchQuery} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  )
}
