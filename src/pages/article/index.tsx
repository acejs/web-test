import React from 'react'
import { getLocalStorage } from '@/libs/tools'
import { useHistory } from 'react-router-dom'

export const POSTID = 'POSTID'
const cache = getLocalStorage(POSTID)

const regex = /<p><block class="__q"(.(?!(\/block><br\/><\/p>)))*<\/block><br\/><\/p>/g

const Index = () => {
  const history = useHistory()
  if (!cache) {
    history.push('/')
    return
  }

  const { content, questionList } = JSON.parse(cache)
  const html = { '__html': content }
  console.log(content)

  return <div style={{padding: '24px'}} dangerouslySetInnerHTML={html}></div>
}

export default Index
