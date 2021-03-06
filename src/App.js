import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Footer, Navbar } from './components/layouts'
import Alert from './components/layouts/Alert'
import { AlertProvider } from './context/alert/AlertContext'
import { GithubProvider } from './context/github/GithubContext'
import { Home, About, NotFound, User } from './pages'

export default function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />
            <main className='container mx-auto px-3 pb-12'>
              <Alert />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/user/:login' element={<User />} />
                <Route path='/notFound' element={<NotFound />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer></Footer>
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  )
}
