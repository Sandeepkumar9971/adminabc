import React from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import BACK from '@/components/backbutton'
import Appraisalnew from '@/components/form/Appraisalnew'

const page = () => {
  return (
    <div>
      <DefaultLayout>
        <div>
          <BACK/>
        </div>
    <Appraisalnew/>
      </DefaultLayout>
    </div>
  )
}

export default page
