import User from '../interfaces/User'
import { supabase } from '../helpers/supabase'

class UserApis {
  static getUser = async (username: string) => {
    try {
      const response = await supabase
        .from<User>('user_account')
        .select('username, user_password')
        .match({ username: username })

      if (response.error) throw response.error
      else return response.data[0]

    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  static insertUser = async (user: User) => {
    try {
      const response = await supabase
        .from<User>('user_account')
        .insert({
          username: user.username,
          email: user.email,
          user_password: user.user_password
        })
      
      if (response.error) throw response.error
      else return response.data
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }
}

export default UserApis