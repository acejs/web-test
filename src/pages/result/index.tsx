import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'

const Index = () => {
  const history = useHistory()
  const params = history.location.search.slice(1).split('&')
  const result: any = {}
  for (const str of params) {
    const [key, value] = str.split('=')
    result[key] = parseInt(value, 10)
  }

  const handleClick = () => {
    history.push('/')
  }

  return <div style={{marginTop: '200px', textAlign: 'center'}}>
    <h1>{`${((result.right / result.total) * 100).toFixed(2)}%正确率`}</h1>
    <p>可以根据正确率展示不同的UI界面</p>

    <Button onClick={() => handleClick()}>返回首页</Button>
  </div>
}

export default Index