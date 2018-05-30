import React from 'react'
import { List, InputItem, NavBar, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from "../../util"
@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentWillUnmount() {
    this.props.readMsg(this.props.match.params.user)
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    this.fixCarousel()


  }
  handleSumit() {
    // socket.emit('sendmsg', { text: this.state.text })
    // this.setState({
    //   text: ''🤔
    // })
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({
      text: '',
      showEmoji: false
    })
  }
  fixCarousel() {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    }, 0)

  }
  render() {
    const userid = this.props.match.params.user
    const users = this.props.chat.users
    if (!users[userid]) return null
    const chatId = getChatId(userid, this.props.user._id)
    console.log(chatId)
    console.log(this.props.chat.chatmsg)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatId)
    const emoji = '😁'.split(" ").filter(v => v)
      .map(v => ({ text: v }))
    return (
      <div id="chat-page">
        <NavBar moode='dark' leftContent='back' onLeftClick={() => { this.props.history.goBack() }}>
          {users[userid].name}
        </NavBar>
        {chatmsgs.map((v, i) => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid ? (
            <List key={i}>
              <List.Item thumb={avatar}>{v.content}</List.Item>
            </List>

          )
            : (<List key={v._id}>
              <List.Item extra={<img src={avatar} alt='' />} className="chat-me">{v.content}</List.Item>
            </List>)
        }
        )}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              onChange={v => { this.setState({ text: v }) }}
              value={this.state.text}
              extra={
                <div>
                  <span aria-label='img' role="img" style={{ marginRight: 15 }} onClick={() => {
                    this.setState({ showEmoji: !this.state.showEmoji })
                    this.fixCarousel()
                  }}>😁</span>
                  <span onClick={() => this.handleSumit()}>发送</span>
                </div>}
            >
              信息
             </InputItem>
          </List>
          {this.state.showEmoji ?
            <Grid data={emoji} columnNum={9} carouselMaxRow={4} onClick={el => {
              this.setState({
                text: this.state.text + el.text
              })
            }}>

            </Grid> :
            null
          }

        </div>
      </div>

    )
  }
}
export default Chat