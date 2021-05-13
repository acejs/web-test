import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Edit, { IInfo } from './modal/edit'
import { getLocalStorage, getURLQuery } from '@/libs/tools'

export interface IQuestion {
  title?: string
  options?: string[]
  rightAnswer?: string
}

export const initialCode = 65

const Question: React.FC<{}> = () => {
  const [questionList, setQuestionList] = useState<IQuestion[]>([])
  const [visible, toggleVisible] = useState(false)
  const [editInfo, setEditInfo] = useState<IInfo>({
    type: 0,
    questionList,
    setQuestionList,
  })
  const draftId = getURLQuery()

  useEffect(() => {
    const cache = getLocalStorage(draftId)
    if (cache) {
      const { questionList } = JSON.parse(cache)
      if (Array.isArray(questionList)) {
        setQuestionList(questionList)
      }
    }
  }, [])

  const edit = (action: string, index?: number) => {
    if (action === 'add') {
      setEditInfo({
        type: 0,
        questionList,
        setQuestionList,
      })
    } else {
      setEditInfo({
        type: 1,
        index,
        questionList,
        setQuestionList,
      })
    }
    toggleVisible(true)
  }

  return (
    <>
      <Card
        title="测试题"
        style={{ width: '49%', marginLeft: '1%' }}
        actions={[<PlusOutlined onClick={() => edit('add')} key="setting" />]}
      >
        {questionList.map((item, index) => {
          return (
            <Card key={index}>
              <Row align="middle">
                <Col span={18}>
                  <h2>
                    {index + 1}. {item.title}
                  </h2>
                </Col>
                <Col span={6}>
                  <Button
                    type="link"
                    onClick={() => edit('edit', index)}
                    size="small"
                  >
                    修改
                  </Button>
                </Col>
              </Row>
              {Array.isArray(item.options)
                ? item.options.map((each, index) => {
                    const code = String.fromCharCode(index + initialCode)
                    return (
                      <Row key={index}>
                        <Col
                          style={{
                            backgroundColor: `${
                              code === item.rightAnswer ? '#1890ff' : '#FFF'
                            }`,
                          }}
                          span={12}
                        >
                          {code}、{each}
                        </Col>
                      </Row>
                    )
                  })
                : ''}
            </Card>
          )
        })}
      </Card>
      <Edit visible={visible} toggleVisible={toggleVisible} info={editInfo} />
    </>
  )
}

export default Question
