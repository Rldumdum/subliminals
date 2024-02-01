import NavBar from '@/app/components/Navbar'
import React from 'react'

const MentalHealth = () => {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center  p-24">
        <h1 className="text-4xl">Mental Health</h1>
        <div className="bg-red-500 w-full h-20"></div>
      </main>
    </>
  )
}

export default MentalHealth