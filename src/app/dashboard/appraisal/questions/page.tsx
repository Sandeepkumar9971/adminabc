import React from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <DefaultLayout>
      <div className='p-4 flex justify-end'>
       
                <Link href={'/dashboard/appraisal/questions/new'} className='bg-primary text-white p-4'>Add New Questions</Link>
            </div>
      </DefaultLayout>
    </div>
  )
}

export default page
