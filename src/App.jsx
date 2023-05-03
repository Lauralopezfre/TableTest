import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import chakraTheme from '@chakra-ui/theme'
import { Home } from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
      <Home/>
    </Fragment>
  )
}

export default App




