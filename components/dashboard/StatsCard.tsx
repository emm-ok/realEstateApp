import React from 'react'

const StatsCard = ({ Icon, value, label, }) => {
  return (
    <div className="p-4 shadow rounded-md">
        <div className=' flex justify-between items-center gap-4 capitalize'>
            <Icon size={28} />
            <p>{label}</p>
        </div>
        <p className='font-bold text-lg mt-6'>{value}</p>
    </div>
  )
}

export default StatsCard