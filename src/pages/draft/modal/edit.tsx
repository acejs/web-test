import React, { useState, useEffect } from 'react'
import { Modal, Input, Row, Col, Button } from 'antd'
import { IQuestion, initialCode } from '../question'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { getLocalStorage, setLocalStorage, getURLQuery } from '@/libs/tools'

export interface IInfo {
  type: number // 0 新增   1 编辑
  questionList: IQuestion[]
  setQuestionList: React.Dispatch<React.SetStateAction<IQuestion[]>>
  index?: number
}

interface IProps {
  visible: boolean
  toggleVisible: React.Dispatch<React.SetStateAction<boolean>>
  info: IInfo
}

const Edit: React.FC<IProps> = (props) => {
  const {
    visible,
    toggleVisible,
    info: { type, questionList, setQuestionList, index },
  } = props
  const [question, setQuestion] = useState<IQuestion>({
    title: '',
    options: [''],
    rightAnswer: '',
  })
  const draftId = getURLQuery()

  const handleOk = () => {
    let list = [...questionList]
    if (type === 0) {
      list.push(question)
    } else {
      index !== undefined && (list[index] = question)
    }
    setQuestionList(list)

    const cache = getLocalStorage(draftId)
    if (cache) {
      const o = JSON.parse(cache)
      o.questionList = list
      setLocalStorage(draftId, JSON.stringify(o))
    } else {
      setLocalStorage(draftId, JSON.stringify({ questionList: list }))
    }
    handleCancel()
  }

  useEffect(() => {
    if (visible && type === 1 && index !== undefined) {
      setQuestion(JSON.parse(JSON.stringify(questionList[index])))
    }
  }, [visible])

  const handleCancel = () => {
    setQuestion({
      title: '',
      options: [''],
      rightAnswer: '',
    })
    toggleVisible(false)
  }

  const title = type === 0 ? '新增' : '编辑'

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      title: e.target.value,
    })
  }

  const handleRightAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      rightAnswer: e.target.value,
    })
  }

  const handleOptionsValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (Array.isArray(question.options)) {
      question.options[index] = e.target.value
      setQuestion({ ...question })
    }
  }

  const handleOptionsItemChange = (index: number, action: string) => {
    if (!Array.isArray(question.options)) return false
    if (action === 'add') {
      question.options.splice(index + 1, 0, '')
    } else {
      question.options.splice(index, 1)
    }
    setQuestion({ ...question })
  }

  return (
    <Modal
      style={{ marginLeft: '56%' }}
      width="650px"
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row align="middle">
        <Col span={2}>题目</Col>
        <Col span={12}>
          <Input value={question.title} onChange={handleTitleChange}></Input>
        </Col>
        <Col span={3} offset={1}>
          正确答案
        </Col>
        <Col span={6}>
          <Input
            value={question.rightAnswer}
            onChange={handleRightAnswerChange}
          ></Input>
        </Col>
      </Row>
      {Array.isArray(question.options)
        ? question.options.map((item, index) => {
            return (
              <Row key={index} style={{ marginTop: '24px' }} align="middle">
                <Col span={2}>{String.fromCharCode(initialCode + index)}、</Col>
                <Col span={12}>
                  <Input
                    value={item}
                    onChange={(e) => handleOptionsValueChange(e, index)}
                  ></Input>
                </Col>
                <Col span={4} offset={1}>
                  {index > 0 ? (
                    <Button
                      onClick={() => handleOptionsItemChange(index, 'del')}
                      shape="circle"
                      icon={<MinusOutlined />}
                    />
                  ) : (
                    ''
                  )}
                  <Button
                    onClick={() => handleOptionsItemChange(index, 'add')}
                    shape="circle"
                    icon={<PlusOutlined />}
                  />
                </Col>
              </Row>
            )
          })
        : ''}
    </Modal>
  )
}

export default Edit
