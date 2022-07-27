import { Component } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './app.less'

const queryClient = new QueryClient()

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return  <QueryClientProvider client={queryClient}>{this.props.children}</QueryClientProvider>;
  }
}

export default App
