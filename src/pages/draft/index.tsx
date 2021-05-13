import React, { useEffect, useState } from 'react'
import Editor from 'wangeditor'
import { Button, Row } from 'antd'
import { TestMenu } from './menu'
import Question from './question'
import { getLocalStorage, setLocalStorage, getURLQuery } from '@/libs/tools'

// 注册菜单
Editor.registerMenu('TestMenu', TestMenu)

let editor: Editor | null = null

function App(): JSX.Element {
  const [content, setContent] = useState('')
  const draftId = getURLQuery()

  useEffect(() => {
    editor = new Editor('#editor')

    editor.config.onchange = (html: string) => {
      setContent(html)
    }
    // 设置高度
    editor.config.height = 600

    editor.create()

    const cache = getLocalStorage(draftId)
    if (cache) {
      const { content } = JSON.parse(cache)
      content && editor.txt.html(content)
    }

    return () => {
      editor && editor.destroy()
    }
  }, [])

  // 保存
  function doSave() {
    const cache = getLocalStorage(draftId)
    if (cache) {
      const o = JSON.parse(cache)
      o.content = content
      setLocalStorage(draftId, JSON.stringify(o))
    } else {
      setLocalStorage(draftId, JSON.stringify({ content }))
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <div id="editor"></div>
        <Row>
          <Button onClick={doSave}>保存</Button>
        </Row>
      </div>
      <Question />
    </div>
  )
}

export default App
