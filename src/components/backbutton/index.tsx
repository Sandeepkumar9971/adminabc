"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowBigLeft } from 'lucide-react'


const BACK = () => {
    const route = useRouter()
  return (
    <div>
      <h2 className='flex flex-row cursor-pointer' onClick={()=>{route.back()}}><ArrowBigLeft/>Back</h2>
    </div>
  )
}

export default BACK
