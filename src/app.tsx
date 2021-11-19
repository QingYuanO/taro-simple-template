import { Component } from 'react'
import { Provider } from 'react-redux'
import 'windi.css';
import './app.less'
import store from './store'

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App
