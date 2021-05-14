import React, { useEffect, useState } from 'react'
import { getLocalStorage, getURLQuery } from '@/libs/tools'
import { useHistory } from 'react-router-dom'
import { IQuestion } from '@/pages/draft/question'
import { Button, Row, Col, message } from 'antd'
import Test from './modal/test'

const regex =
  /<p><block class="__q"(.(?!(\/block><br\/><\/p>)))*<\/block><br\/><\/p>/g

const regTarget = /：(.*)（/

const splitString = (content: string[], arr: string[]) => {
  for (const str of arr) {
    for (let i = 0; i < content.length; i++) {
      if (content[i].includes(str)) {
        content.splice(i, 1, ...content[i].split(str).filter(v => v !== ''))
      }
    }
  }
  return content
}

const Index = () => {
  // const [articleId, setArticleId] = useState('')
  const [content, setContent] = useState<string[]>([])
  const history = useHistory()
  const [questionList, setQuestionList] = useState<IQuestion[]>([])
  const [serialNumber, setSerialNumber] = useState<number[][]>([])
  const [visible, toggleVisible] = useState<boolean>(false)
  const [testInfo, setTestInfo] = useState<{list: IQuestion[], serialNumber: number[]}>({ list: [], serialNumber: [] })
  // const [testList, setTestList] = useState<IQuestion[]>([])

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
      questionList: IQuestion[]
    }
    const split = content.match(regex) as string[]
    // 匹配出每段测试题序号
    const serialNumber = new Array(split.length)
    for (let i = 0; i < split.length; i++) {
      const group = regTarget.exec(split[i])
      if (!group) continue
      const target = group[1].trim()
      serialNumber[i] = target.split(',').map(v => parseInt(v.trim(), 10))
    }
    setSerialNumber(serialNumber)
    const ans = splitString([content], split)
    setContent(ans)

    setQuestionList(questionList)
  }, [])

  const handleTest = (index: number) => {
    const list: IQuestion[] = []
    for (const i of serialNumber[index]) {
      list.push(questionList[i - 1])
    }
    setTestInfo({
      list: JSON.parse(JSON.stringify(list)),
      serialNumber: serialNumber[index].map(i => i - 1)
    })
    toggleVisible(true)
  }

  const handleClick = () => {
    const { answer, questionList } = JSON.parse(getLocalStorage(articleId)!)
    if (!answer || Object.values(answer).length !== questionList.length) {
      message.error('请完成测试题！ 此处若存在未完成的题，可以置入弹窗，并打开让用户继续完成，省略这部分交互！')
      return false
    }
    const total = questionList.length
    let right = 0
    for (let i = 0; i < questionList.length; i++) {
      if (questionList[i].rightAnswer === answer[i]) right++
    }
    history.push(`/result?total=${total}&right=${right}`)
  }

  return (
    <div style={{ padding: '24px' }}>
      {
        Array.isArray(content) && content.length > 0
         ? content.map((html, index) => {
            return <div key={index}>
              <div dangerouslySetInnerHTML={{__html: html}}></div>
              <p>第 {index + 1} 段结束有测试题哦，<Button type="link" onClick={() => handleTest(index)}>测试一下</Button> 掌握的情况吧</p>
            </div>
          })
         : ''
      }
      <Test visible={visible} toggleVisible={toggleVisible} info={testInfo} />

      <Row>
        <Col span={4} offset={18}>
          <Button type="primary" size="large" onClick={() => handleClick()}>完成阅读</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Index
