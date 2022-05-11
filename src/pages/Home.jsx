import { useEffect } from "react"
import UserResults from "../components/users/UserResults"
import UserSearch from "../components/users/UserSearch"
import useGithubContext from '../context/github/GithubContext'

const Home = () => {

  return (
    <>

 <UserSearch /> 

   <UserResults />

   
    </>

  )
}

export default Home

