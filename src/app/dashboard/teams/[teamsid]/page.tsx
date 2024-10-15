import React from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import FormLayout from '@/app/forms/form-layout/page'

const page = () => {
  return (
    <div>
        <DefaultLayout>
               <FormLayout/>
        </DefaultLayout>
    </div>
  )
}

export default page
