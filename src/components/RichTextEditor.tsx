import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none p-4',
      },
    },
  });

  return (
    <EditorContent editor={editor} />
  );
}