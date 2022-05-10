import { useEffect, useState, useContext } from 'react'
import useAppContext from '../../context/github/GithubContext'
import Spinner from '../layouts/Spinner'
import UserItem from './UserItem'


const UserResults = () => {

  const {users, isLoading, fetchUsers} = useAppContext()
  useEffect(() => {
    fetchUsers()
  }, [])


   if (!isLoading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
