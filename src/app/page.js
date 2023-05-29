"use client"
import React from 'react';
import Recommendation from '../component/Recommendation';

export default function Home() {
  const searchQuery = 'Romantic Comadies';
  return (
    <main>
      <h1 class="flex m-5 p-2 justify-center text-5xl font-bold text-gray-800 mb-4">Movie Personality Test</h1>
      <Recommendation searchQuery={searchQuery} />
    </main>
  )
}
