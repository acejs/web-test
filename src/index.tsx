import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Routes } from './router'
import 'antd/dist/antd.css'

const App = () => {
  return <div>
    <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {
                  Routes.map(info => <Route key={info.name} exact component={info.component} path={info.path}></Route>)
                }
              </Switch>
            </Suspense>
        </Router>
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'))
