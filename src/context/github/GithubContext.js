import { createContext, useReducer, useContext } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: true,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)
  //   const [users, setUsers] = useState([])
  //   const [isLoading, setisLoading] = useState(false)

  const fetchUsers = async () => {
    // setisLoading(true)
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const data = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
    // setUsers(data)
    // setisLoading(false)
  }

  return (
    <GithubContext.Provider
      value={{ users: state.users, isLoading: state.isLoading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(GithubContext)
}

export default useAppContext
