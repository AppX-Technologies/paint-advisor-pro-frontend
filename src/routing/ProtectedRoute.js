import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { Typography } from '@mui/material'
const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!user) {
    return (
      <div className='unauthorized'>
        <Typography component="h1" variant="h5">
          Unauthorized 😔
        </Typography>
        <Typography component="h5" variant="h6">
          <NavLink to='/login'>Login</NavLink> to gain access
        </Typography>
      </div>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute