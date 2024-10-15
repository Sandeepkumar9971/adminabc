"use client"
import React from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLaout'
import Employeetable from '@/components/Tables/Employeetable'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { teams_client } from '@/clients/query/teams'

const Page = () => {
  const {data,isLoading} = useQuery('fatchalluser',teams_client.all)
  if(isLoading)return <DefaultLayout><h2>Loading...</h2></DefaultLayout>
  console.log(data);
  return (
    <div>
        <DefaultLayout>
            <div className='p-4 flex justify-end'>
                <Link href={'/dashboard/teams/new'} className='bg-primary text-white p-4'>Add New Member</Link>
            </div>
           <Employeetable data={data}/>
        </DefaultLayout>
      
    </div>
  )
}

export default Page
