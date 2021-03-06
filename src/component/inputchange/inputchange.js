import React from 'react'
export default function InputChange(Comp) {
  return class WrapperCom extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key, value) {

      console.log(key, value)
      this.setState({
        [key]: value
      })
    }
    render() {

      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  }
}