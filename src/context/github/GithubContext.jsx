import { createContext, useReducer, useContext } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    isLoading: false,
    repos: []
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)
  //   const [users, setUsers] = useState([])
  //   const [isLoading, setisLoading] = useState(false)

  const searchUsers = async (text) => {
    setLoading()
    // setisLoading(true)
    const params = new URLSearchParams({
      q: text
    })
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const {items} = await response.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
    // setUsers(data)
    // setisLoading(false)
  }


  const getUser = async (login) => {
    setLoading()
    // setisLoading(true)
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if(response.status === 404){
      window.location = "/notfound"
    }
    else{
    const data = await response.json()

    dispatch({
      type: 'GET_USER',
      payload: data,
    })
    // setUsers(data)
    // setisLoading(false)
    }
  }

  const getRepo = async(repo) => {
    const response = await fetch(`${GITHUB_URL}/users/${repo}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if(response.status === 404){
      window.location = "/notfound"
    }
    else{
    const data = await response.json()

    dispatch({
      type: 'GET_REPO',
      payload: data,
    })
    // setUsers(data)
    // setisLoading(false)
    }
  }


  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    })
  }

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_SEARCH',
    })
  }
  return (
    <GithubContext.Provider
      value={{ users: state.users, user: state.user, repos: state.repos, isLoading: state.isLoading, searchUsers, clearUsers, getUser, getRepo }}
    >
      {children}
    </GithubContext.Provider>
  )
}

const useGithubContext = () => {
  return useContext(GithubContext)
}

export default useGithubContext
