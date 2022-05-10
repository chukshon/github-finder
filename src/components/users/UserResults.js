import { useEffect, useState } from 'react'

const UserResults = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setisLoading(true)
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })

    const data = await response.json()
    setUsers(data)
    setisLoading(false)
  }

  if (!isLoading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md-grid-cols-2'>
        {users.map((user) => {
          return <h3>{user.login}</h3>
        })}
      </div>
    )
  } else {
    return <h3>Loading...</h3>
  }
}

export default UserResults