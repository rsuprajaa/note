import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React, { Dispatch, SetStateAction } from 'react'

interface EditorProps {
  body: string
  setBody: Dispatch<SetStateAction<string>>
}

const Editor = (props: EditorProps) => {
  const { body, setBody } = props
  return (
    <div className="mx-auto mt-4 leading-normal text-primary-default editor">
      <CKEditor
        config={{
          toolbar: [
            'heading',
            '|',
            'alignment',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'blockQuote',
            '|',
            'undo',
            'redo',
          ],
        }}
        editor={ClassicEditor}
        data={body}
        onReady={(editor: any) => {}}
        onChange={(event: any, editor: { getData: () => any }) => {
          const data = editor.getData()
          setBody(data)
        }}
        onBlur={(event: any, editor: any) => {}}
        onFocus={(event: any, editor: any) => {}}
      />
    </div>
  )
}

export default Editor
