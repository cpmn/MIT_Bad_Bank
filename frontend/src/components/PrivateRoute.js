import  {useContext} from 'react'
import { AuthContext } from '../config/auth'
import Unauthorized from './Unauthorized'

function RequireAuth({ children }) {    
  const { currentUser } = useContext(AuthContext)
  return currentUser ? children :  <Unauthorized />;  
}
export default RequireAuth