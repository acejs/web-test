import React, { useEffect, useState } from 'react'
import { getLocalStorage, getURLQuery } from '@/libs/tools'
import { useHistory } from 'react-router-dom'

const regex =
  /<p><block class="__q"(.(?!(\/block><br\/><\/p>)))*<\/block><br\/><\/p>/g

// const regex =
//   /[^(<p><block class="__q"(.(?!(\/block><br\/><\/p>)))*<\/block><br\/><\/p>)]*/g
const Index = () => {
  // const [articleId, setArticleId] = useState('')
  const [content, setContent] = useState({ __html: '' })
  const history = useHistory()
  const [questionList, setQuestionList] = useState<any>([])
  const articleId = getURLQuery()

  useEffect(() => {
    if (!articleId) {
      history.push('/')
      return
    }
    const cache = getLocalStorage(articleId)
    if (!cache) {
      history.push('/')
      return
    }

    const { content, questionList } = JSON.parse(cache) as {
      content: string
      questionList: any
    }
    console.log(content.match(regex))
    console.log(questionList)
    setContent({ __html: content })

    setQuestionList(questionList)
  }, [])

  return (
    <div style={{ padding: '24px' }} dangerouslySetInnerHTML={content}></div>
  )
}

export default Index
