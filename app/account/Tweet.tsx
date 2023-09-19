"use client"
import { Database } from '@/lib/database.types'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'
import { title } from 'process'
import React, { useState } from 'react'
import {FiSearch} from'react-icons/fi'

export const dynamic= 'force-dynamic'

const Tweet = () => {
      const router = useRouter();
      const [reset , setAreset] = useState('')
      const [pending , setIspending] = useState(false)
    const addtweet = async (formdata:FormData)=> {

      setIspending(false)
        
        console.log('reset button')
        const supabase = createClientComponentClient <Database>()
        const title = String(formdata.get('title'))
        const {data : {user}, error} = await supabase.auth.getUser();

        await supabase.from('tweets').insert({
          title:title,
          user_id:user?.id,
        })


        router.refresh();

       setAreset('')
        
  
     if (error){
        <div>
          you reeaved seccrdulty
        </div>
     }
    }
  return(
    <div>
        <form action={addtweet} className='p-3'>
           <div className='flex h-full w-full justify-between'>
              <div className='-mt-0.7 bg-gray-400  '><FiSearch size= '1.4rem'/></div>
            <input type="text" name='title' value={reset} className='flex-1 bg-gray-400 w-full rounded-sm text-lg  outline-none ' onChange={(e) => setAreset(e.target.value)} />
           
          <button type='submit' onClick={() =>setIspending(!pending)} className='pl-4 '>
           {pending ? 'loading': 'Post'}
          </button>
          </div>
        </form>
    </div>
  )
}

export default Tweet