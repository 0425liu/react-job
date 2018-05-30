import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import { login, clearMsg } from '../../redux/user.redux'
import InputChange from '../../component/inputchange/inputchange'
@connect(
  state => state.user,
  { login, clearMsg }
)
@InputChange
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }
  componentDidMount() {
    this.props.clearMsg()
  }
  register() {
    this.props.history.push('/register')
  }

  login() {
    this.props.login(this.props.state)
  }
  render() {
    return (
      <div>
        {this.props.redirecTo ? <Redirect to={this.props.redirecTo}></Redirect> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg}
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
            <InputItem onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.login} type="primary">登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login