import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { register, clearMsg } from '../../redux/user.redux'
import InputChange from '../../component/inputchange/inputchange'

@connect(
  state => state.user,
  { register, clearMsg }
)
@InputChange
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount() {
    this.props.clearMsg()
    this.props.handleChange('type', 'genius')
  }
  handleRegister() {
    this.props.register(this.props.state)
  }

  render() {
    const RadioItem = Radio.RadioItem;
    console.log(this.props.type)
    return (

      < div >
        {this.props.redirecTo ? <Redirect to={this.props.redirecTo}></Redirect> : null}
        < Logo ></Logo >
        <h2>我是注册页面</h2>
        <List>
          {this.props.msg}
          <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
          <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          <InputItem type="password" onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem onChange={() => this.props.handleChange('type', 'genius')} checked={this.props.state.type === 'genius'}>牛人</RadioItem>
          <RadioItem onChange={() => this.props.handleChange('type', 'boss')} checked={this.props.state.type === 'boss'}>boss</RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div >
    )
  }
}
export default Register