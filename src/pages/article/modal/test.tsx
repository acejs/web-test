import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Radio, message } from 'antd'
import { IQuestion } from '@/pages/draft/question'
import { RadioChangeEvent } from 'antd/lib/radio'
import { getLocalStorage, setLocalStorage, getURLQuery } from '@/libs/tools'

interface IProps {
  visible: boolean
  toggleVisible: React.Dispatch<React.SetStateAction<boolean>>
  info: {
    list: IQuestion[]
    serialNumber: number[]
  }
}

const initialCode = 65

const Test: React.FC<IProps> = (props) => {
  const { info: { list, serialNumber }, visible, toggleVisible } = props
  const [valueList, setValueList] = useState<number[]>([])
  const articleId = getURLQuery()

  useEffect(() => {
    if (visible) {
      const arr = new Array(list.length)
      const o = JSON.parse(getLocalStorage(articleId)!)
      if (o.answer) {
        for (let i = 0; i < serialNumber.length; i++) {
          arr[i] = o.answer[serialNumber[i]]
        }
      }
      setValueList(arr)
    }
  }, [visible])

  function handleOK () {
    for (const value of valueList) {
      if (!value) {
        message.error('请完成所有测试题！')
        return
      }
    }
    const o = JSON.parse(getLocalStorage(articleId)!)
    if (!o.hasOwnProperty('answer')) o.answer = {}
    for (let i = 0; i < serialNumber.length; i++) {
      o.answer[serialNumber[i]] = valueList[i]
    }
    setLocalStorage(articleId, JSON.stringify(o))
    handleCancel()
  }

  function handleCancel () {
    setValueList([])
    toggleVisible(false)
  }

  function handleChange (e: RadioChangeEvent, i: number) {
    valueList[i] = e.target.value
    setValueList([...valueList])
  }

  return <Modal
            width="650px"
            title="测试"
            visible={visible}
            onOk={() => handleOK()}
            onCancel={() => handleCancel()}>
            {
              list.map((v, i) => {
                const { title, options } = v
                return  <Row key={i} style={{marginTop: '24px'}}>
                          <Col span={1}> {i + 1}、 </Col>
                          <Col span={22}> <h4>{title}</h4> </Col>
                          <Radio.Group onChange={(e) => handleChange(e, i)} value={valueList[i]}>
                            {
                              Array.isArray(options)
                              ? options.map((item, index) => {
                                const code = String.fromCharCode(index + initialCode)
                                return <Col offset={1} span={23} key={code}><Radio value={code}>{item}</Radio></Col>
                              })
                              : ''
                            }
                          </Radio.Group>
                        </Row>
              })
            }
        </Modal>
}

export default Test
