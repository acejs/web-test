import React, { useEffect, useState } from 'react'
import Editor from 'wangeditor'
import { TestMenu } from './menu'
import Question from './question'
import { getLocalStorage, setLocalStorage, getURLQuery } from '@/libs/tools'

// 注册菜单
Editor.registerMenu('TestMenu', TestMenu)

let editor: Editor | null = null

let saveTimeId: ReturnType<typeof setTimeout>

// 保存
function doSave(id: string, content: string) {
  const cache = getLocalStorage(id)
  console.log(cache)
  if (cache) {
    const o = JSON.parse(cache)
    o.content = content
    setLocalStorage(id, JSON.stringify(o))
  } else {
    setLocalStorage(id, JSON.stringify({ content }))
  }
}

function App(): JSX.Element {
  const [content, setContent] = useState('')
  const draftId = getURLQuery()

  useEffect(() => {
    editor = new Editor('#editor')

    editor.config.onchange = (html: string) => {
      setContent(html)
      // 设置自动保存，在防抖 3000 ms
      if (saveTimeId) clearTimeout(saveTimeId)
      saveTimeId = setTimeout(() => {
        doSave(draftId, html)
      }, 3000)
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

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <div id="editor"></div>
        </div>
        <Question />
      </div>
      <h3>Tips：</h3>
      <p><b>整体结构上</b>：左侧通过一个第三方的编辑器（后续可以考虑自研）录入文字部分，右侧编辑测试题，两部分独立处理。编辑器部分内容会自动保存，而测试题在编辑后也会保存记录</p>
      <p><b>关联</b>：用户正常输入一段文章后，想要插入测试题，可以点击工具栏倒数第二个 Test 按钮，在光标位置插入占位符，在 “测试题：” 后面输入逗号(英文逗号)分割的题号</p>
      <h3>优化：</h3>
      <p>可以支持拖拽改变测试题的顺序，对录入正确答案的优化，以及支持更多类型的测试题</p>
      <p>插入测试题，可以插入一个更完整的整体，或者可以通过下拉的方式选择目前已经录入的测试题</p>
    </>
  )
}

export default App
