import React, { useEffect, useState } from 'react'
import Editor from 'wangeditor'
import { Button, Row } from 'antd'
import { TestMenu } from './menu'
import Question from './question'
import { getLocalStorage, setLocalStorage } from '@/libs/tools'
import { POSTID } from './question'

// 注册菜单
Editor.registerMenu('TestMenu', TestMenu)

console.log('draft')
let editor: Editor | null = null

function App(): JSX.Element {
  const [content, setContent] = useState('')

  useEffect(() => {
    editor = new Editor('#editor')

    editor.config.onchange = (html: string) => {
      setContent(html)
    }
    // 设置高度
    editor.config.height = 800

    editor.create()

    const cache = getLocalStorage(POSTID)
    if (cache) {
      const { content } = JSON.parse(cache)
      console.log(content)
      content && editor.txt.html(content)
    }

    return () => {
      editor && editor.destroy()
    }
  }, [])

  // 保存
  function doSave() {
    console.log(content)
    const cache = getLocalStorage(POSTID)
    if (cache) {
      const o = JSON.parse(cache)
      o.content = content
      setLocalStorage(POSTID, JSON.stringify(o))
    } else {
      setLocalStorage(POSTID, JSON.stringify({ content }))
    }
    // alert(editor.txt.html())
    // 获取 text
    // console.log(editor.txt.text())
  }

  return (
    <div style={{display: 'flex'}}>
      <div style={{width: '50%'}} >
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
