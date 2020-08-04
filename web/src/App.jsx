import React from 'react'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import store from './redux/store'
import Root from './Root'
import './fonts/DSEG7Classic-Regular.ttf'
import './fonts/DSEG7Classic-Regular.woff'
import './fonts/DSEG7Classic-Regular.woff2'
import './App.scss'

const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Root />
      </DndProvider>
    </Provider>
  )
}

export default App
