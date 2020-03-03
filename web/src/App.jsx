import React from 'react'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import store from './redux/store'
import Page from './Page'
import './yqui.css'

const App = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={Backend}>
        <Page />
      </DndProvider>
    </Provider>
  )
}

export default App
