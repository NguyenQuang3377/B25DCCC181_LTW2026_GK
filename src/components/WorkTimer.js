import { Component } from 'react'

class WorkTimer extends Component {
  constructor(props) {
    super(props)
    this.state = { seconds: 0 }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick() {
    this.setState((state) => ({ seconds: state.seconds + 1 }))
  }

  render() {
    return <p>Đã xem: {this.state.seconds} giây</p>
  }
}

export default WorkTimer