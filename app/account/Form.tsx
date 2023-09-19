'use client'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'
import {Toaster , toast} from 'sonner'
export const dynamic= 'force-dynamic'

const AccountForm = () => {
  const supabase  = createClientComponentClient()
  const router = useRouter();
  
  
  const singout = async() => {
      await supabase.auth.signOut();
      router.refresh();
      toast.success('you logged out seccefully')
      
  }
  return (

    <div>
      <Toaster/>
       <button className='text-sm text-gray-400' onClick={singout}>SingOut</button>
    </div>
  )
}

export default AccountForm