import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: ""

    }
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  render() {
    const pathName = this.props.location.pathname;
    const redirect = this.props.redirecTo
    return (
      <div>
        {redirect && redirect !== pathName ? <Redirect to={redirect}></Redirect> : null}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <AvatarSelector selectAvatar={text => this.setState({ avatar: text })}></AvatarSelector>
        <InputItem onChange={v => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <TextareaItem onChange={v => this.onChange('desc', v)}
          title="自我介绍"
          autoHeight
        />
        <Button type="primary" onClick={() => { this.props.update(this.state) }}>保存</Button>
      </div>
    )
  }
}
export default GeniusInfo;