import Editor from "wangeditor";

const { BtnMenu } = Editor;

let count = 0;

export class TestMenu extends BtnMenu {
  editor;
  constructor(editor: Editor) {
    const $elem = Editor.$(
      `<div class="w-e-menu" data-title="Insert Question">
        Test
      </div>`
    );
    super($elem, editor);
    this.editor = editor;
  }
  // 菜单点击事件
  clickHandler() {
    // <button> 段落${++count}测试题 </button><br />
    this.editor.cmd.do(
      "insertHTML",
      `<block class="__q" style="color: red;">此处是段落 ${++count} 测试题，测试题：（请写出右侧的题目序号，逗号分割）</block><br />`
    );
  }

  tryChangeActive() {
    //
  }
}
