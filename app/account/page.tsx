import React from 'react'
import AccountForm from './Form'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import Tweet from './Tweet'
import Likes from './Likes'
import NewTweet from './NewTweet'

export const dynamic= 'force-dynamic'

const page = async() => {
  const supabase = createServerComponentClient<Database>({cookies})

  const {data: {session}} = await supabase.auth.getSession();

  const {data } = await supabase.from('tweets').select('* , likes(*)').order('created_at',{
    ascending:false
  })


  const tweet = data?.map(tweets => ({
    ...tweets,
    user_has_liked_tweet : !!tweets.likes.find((like) => 
      like.user_id === session?.user.id
    ),

    likes: tweets.likes.length
  }))?? []
  return (    
    <div className='bg-gray-900 text-white text-lg w-full '>
      <div className='flex justify-between px-4 py-6 border border-t-0 border-gray-800'>
        <h1 className='text-xl font-bold'>home</h1>
         <AccountForm/>
      </div>
      <Tweet/>
       <NewTweet tweet={tweet}/>
    </div>
  )
}

export default page