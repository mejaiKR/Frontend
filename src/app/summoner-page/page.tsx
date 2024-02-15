import React from 'react'
import Image from 'next/image'

const gameData = [
  { date: '2021-10-10', gameCount: 3 },
  { date: '2021-10-11', gameCount: 2 },
  { date: '2021-10-12', gameCount: 1 },
]

export default function SummonerPage() {
  return (
    <>
      <div className=" h-full w-full">
        <div className="flex w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <Image
            src="/profileIcon6271.png"
            alt="Profile Icon"
            width={100}
            height={100}
          />
          <div className="flex flex-col justify-center ml-4">
            <h1>hide on bush</h1>
            <h2>Level: 500</h2>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              전적 갱신
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
