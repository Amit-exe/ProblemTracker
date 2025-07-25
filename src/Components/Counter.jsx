import React from 'react'
import { PiShoppingCartSimple } from "react-icons/pi";
import { GoPeople } from "react-icons/go";

function Counter(props) {
  return (
    <div className='flex flex-col min-w-1/3 flex-wrap bg-white rounded-md px-4 py-6 shadow-xl'> 
        <div className='flex flex-row justify-between gap-10 py-3 pb-5'>
        <h2 className='font-bold'> Counter 1</h2>
        <div className='flex flex-row justify-center items-center gap-1'>
        <GoPeople />
        <p className='font-bold'> customers</p>
        </div>
        
        </div>
        <div className='flex flex-col justify-between gap-1'>
            <div className='flex flex-row justify-between rounded-sm bg-gray-100 px-3 py-2'>
                <div className='flex flex-row justify-center items-center gap-1'><PiShoppingCartSimple/>
                <p className='font-bold'>5 items</p>
                </div>
                
                <p>-</p>
            </div > 
            <div className='flex flex-row justify-between rounded-sm bg-gray-100 px-2 py-1 '>
                <p>`\_/` 5 items</p>
                <p>-</p>
            </div>
            <div className='flex flex-row justify-between rounded-sm bg-gray-100 px-2 py-1 '>
                <p>`\_/` 5 items</p>
                <p>-</p>
            </div>
            <div className='flex flex-row justify-between rounded-sm bg-gray-100 px-2 py-1 '>
                <p>`\_/` 5 items</p>
                <p>-</p>
            </div>
        </div>

        <p className='text-xs pt-2'>Total items 9</p>
    </div>
  )
}

export default Counter