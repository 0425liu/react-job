import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
@withRouter
@connect(
  null,
  { loadData }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    //获取用户信息
    let publicList = ['/login', '/register']
    let pathName = this.props.location.pathname;
    if (publicList.indexOf(pathName) > -1) {
      return
    }
    axios.get('/user/info').then(res => {
      if (res.data.code === 0) {
        this.props.loadData(res.data.data)
      } else {

        this.props.history.push('/login')
      }

    })
    //是否登录
    //现在url地址 login不是不是需要跳转 
    //用户的身份 
    //用户是否需要完善信息
  }
  render() {
    return null
  }
}
export default AuthRoute