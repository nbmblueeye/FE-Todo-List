import { Outlet } from 'react-router-dom'
import  {Header } from '../components'

const Layout = () => {
  return (
    <div className='min-w-full min-h-screen bg-gray-100'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout