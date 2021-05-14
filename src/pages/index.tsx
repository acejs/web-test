import React, { useState } from 'react'
import { Row, Col, Button, Card, Input, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { getLocalStorage } from '@/libs/tools'

const Index = () => {
  const [id, setId] = useState('')
  const history = useHistory()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value)
  }

  function writeDraft() {
    if (!id) {
      message.error('请输入文章 ID')
      return
    }
    history.push(`/draft?id=${id}`)
  }

  function readArticle() {
    if (!id) {
      message.error('请输入文章 ID')
      return
    }
    if (!getLocalStorage(id)) {
      message.error('请输入正确的文章 ID')
      return
    }
    history.push(`/article?id=${id}`)
  }

  return (
    <Card style={{ width: '500px', margin: '200px auto' }}>
      <Row>
        <Input value={id} onChange={handleChange} placeholder="文章编号"></Input>
      </Row>
      <Row justify="end" style={{ marginTop: '24px' }}>
        <Col span={8}>
          <Button onClick={() => writeDraft()}>写草稿</Button>
          <Button onClick={() => readArticle()} type="primary">
            阅读
          </Button>
        </Col>
      </Row>
      <p>由于目前都存储在前端的内存中，草稿的文章编号，需要和阅读的文章编号一致</p>
    </Card>
  )
}

export default Index
