'use client'
import React, { useEffect } from 'react'
import Likes from './Likes'
import { experimental_useOptimistic as useOptimistic } from 'react'
import { Database } from '@/lib/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import {FaHandDots} from 'react-icons/fa6'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const dynamic= 'force-dynamic'


type tweet = Database['public']["Tables"]["tweets"]['Row']


const NewTweet = ({tweet}:{tweet:any}) => {

  const [optimisticTweets, addOptimisticTweet] = useOptimistic<tweet[],tweet>(
    tweet,
    (currentOptimisticTweets, NewTweets) => {
      const newOptimisticTweets = [...currentOptimisticTweets];
      const index = newOptimisticTweets.findIndex(
        (tweets) => tweets.id === NewTweets.id
      );
      newOptimisticTweets[index] = NewTweets


      return newOptimisticTweets
        }
  )

   const supabase = createClientComponentClient();
   const router = useRouter()
  useEffect(() => {
    const channel  = supabase.channel('realtime_tweets').on('postgres_changes',{
      event:"*",
      schema: 'public',
      table: 'tweets'
    }, (payload) => {
      router.refresh()
    } ).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [supabase,router])


  return  optimisticTweets.map((tweets:any) => (
    <div key={tweets.id} className='border border-gray-800 border-t-0 px-4 py-8'>
      <div className='flex justify-between pb-3'>
        <div className='w-10 h-10 rounded-full bg-gray-700 -mt-2 flex justify-between'>
        <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

        </div>
        <div >
         <FaHandDots size='1.5rem'/>
        </div>
      </div>
      {tweets.title}
      <br />
      <div className='flex justify-between items-center'>
      <Likes tweet= {tweets} addOptimisticTweet={addOptimisticTweet}/>
      <AlertDialog>
  <AlertDialogTrigger>Comment</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>this is still underdevelopment?</AlertDialogTitle>
      <AlertDialogDescription>
        this section postponed.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>thank</AlertDialogCancel>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

      </div>
    </div>

   ))
}

export default NewTweet