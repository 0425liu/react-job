import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
@connect(
  state => state
)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    if (!this.props.chat.chatmsg.length) return null
    const Item = List.Item;
    const Brief = Item.Brief
    const userid = this.props.user._id
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const userinfo = this.props.chat.users;
    const chatList = Object.values(msgGroup).sort((a, b) => {
      let a_last = this.getLast(a).create_time
      let b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    console.log(chatList)
    return (
      <div>
        <List>
          {chatList.map(v => {
            const lastItem = this.getLast(v)
            const unreadNum = v.filter(v => !v.read && v.to === userid).length
            const targetId = v[0].from === userid ? v[0].to : v[0].from

            const name = userinfo[targetId] ? userinfo[targetId].name : ''
            const avatar = userinfo[targetId] ? userinfo[targetId].avatar : ''
            return (
              <Item arrow="horizontal" extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`../img/${avatar}.png`)} key={lastItem._id}
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {lastItem.content}
                <Brief>{name}</Brief>
              </Item>
            )
          })}
        </List>
      </div>
    )
  }
}
export default Msg