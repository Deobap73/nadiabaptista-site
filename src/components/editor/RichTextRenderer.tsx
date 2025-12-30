// src/components/editor/RichTextRenderer.tsx

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Underline } from '@tiptap/extension-underline';
import { Image } from '@tiptap/extension-image';
import { useEffect } from 'react';

type Props = {
  content: JSONContent | null;
};

export default function RichTextRenderer({ content }: Props) {
  const editor = useEditor({
    editable: false, // Read-only
    content: content || undefined,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
      Image,
    ],
    editorProps: {
      attributes: {
        class: 'blog_article__rich', // Aplica os estilos do _blog.scss
      },
    },
  });

  // Atualiza o conteúdo se a prop mudar (útil para previews em tempo real)
  useEffect(() => {
    if (editor && content) {
      // Verifica se mudou para evitar piscar, embora o TipTap gira isso bem
      if (JSON.stringify(editor.getJSON()) !== JSON.stringify(content)) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
