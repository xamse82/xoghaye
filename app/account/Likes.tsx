"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import {AiTwotoneHeart} from 'react-icons/ai'

import React from 'react'
export const dynamic= 'force-dynamic'


const Likes = ({tweet ,addOptimisticTweet}:{
    tweet:any,
    addOptimisticTweet: (newtweet : any ) => void
}) => {
  const router = useRouter();
   const handleLikes = async () => {
    
    const supabase = createClientComponentClient()
    const {data:{user}} = await supabase.auth.getUser();

    if (user){
        if (tweet.user_has_liked_tweet ){
            addOptimisticTweet({
                ...tweet,
                likes:tweet.likes -1 ,
                user_has_liked_tweet : tweet.user_has_likes_tweet
            })
            await supabase.from('likes').delete().match({
                user_id:user.id,
                tweet_id:tweet.id
            })

            router.refresh();
        } else{
            addOptimisticTweet({
                ...tweet,
                likes:tweet.likes + 1 ,
                user_has_liked_tweet : tweet.user_has_likes_tweet
            })
            await supabase.from('likes').insert({
                user_id:user.id,
                tweet_id:tweet.id
                
            })
            router.refresh()
           }

        }  
    }


    
  return <button onClick={handleLikes} className='mt-3f flex items-center'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
     className={`${tweet.user_has_liked_tweet ? 'fill-red-600 stroke-red-600' : 'fill-none stroke-gray-600'}`}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
  <span className='ml-2'>
  {tweet.likes} 
  </span></button>
}

export default Likes