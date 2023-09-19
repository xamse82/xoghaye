import React from 'react'

const Navbar = () => {
  return (
    <div className='flex h-full w-full justify-between'>
             <div className='text-bold text-3xl bg-slate-800 text-rose-950 shadow-2xl shadow-black'>
               xogmaal
             </div>
             <div className='flex p-4'>
                <div>login</div>
                <div>register</div>
                <div>write</div>
                <div>read</div>
             </div>
    </div>
  )
}

export default Navbar