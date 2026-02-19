"use client"

import UserTable from '@/components/admin/UserTable'
import { useAuth } from '@/context/AuthContext'
import React from 'react'

const UserPage = () => {
    const { user } = useAuth() 
  return (
    <div>
        <UserTable user={user} />

    </div>
  )
}

export default UserPage