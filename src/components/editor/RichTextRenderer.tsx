// src/components/editor/RichTextRenderer.tsx

'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';

import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Underline } from '@tiptap/extension-underline';
import { Image } from '@tiptap/extension-image';
import { TextAlign } from '@tiptap/extension-text-align';

import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

const lowlight = createLowlight(common);

type Props = {
  content: JSONContent | null;
};

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return '';
  }
}

export default function RichTextRenderer({ content }: Props) {
  const editor = useEditor({
    editable: false,
    content: content || undefined,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    editorProps: {
      attributes: {
        class: 'blog_article__rich',
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (!content) return;

    const current = safeStringify(editor.getJSON());
    const next = safeStringify(content);

    if (current !== next) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
