// src/components/editor/RichTextEditor.tsx

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

import { Link } from '@tiptap/extension-link';
import { Underline } from '@tiptap/extension-underline';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';

import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

const lowlight = createLowlight(common);

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Code2,
  Code,
  Link as LinkIcon,
  Unlink,
  Table as TableIcon,
  Rows,
  Columns,
  Trash2,
  Split,
  Merge,
  PlusSquare,
  Quote,
} from 'lucide-react';

type Props = {
  value: JSONContent | null;
  onChange: (value: JSONContent) => void;
  disabled?: boolean;
};

const EMPTY_DOC: JSONContent = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

export default function RichTextEditor({ value, onChange, disabled }: Props) {
  const editor = useEditor({
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: 'Escreve aqui o teu artigo...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: value || EMPTY_DOC,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'rich_editor__input',
      },
    },
  });

  if (!editor) return null;

  function promptImageUrl() {
    const url = window.prompt('URL da imagem:');
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }

  function promptLinkUrl() {
    const previousUrl = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('URL do link', previousUrl || '');

    if (url === null) return;

    const clean = (url || '').trim();

    if (!clean) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: clean }).run();
  }

  const canUndo = editor.can().chain().focus().undo().run();
  const canRedo = editor.can().chain().focus().redo().run();

  const canAddRow = editor.can().chain().focus().addRowAfter().run();
  const canAddColumn = editor.can().chain().focus().addColumnAfter().run();
  const canDeleteTable = editor.can().chain().focus().deleteTable().run();
  const canMerge = editor.can().chain().focus().mergeCells().run();
  const canSplit = editor.can().chain().focus().splitCell().run();

  return (
    <div className='rich_editor'>
      <div className='rich_editor__toolbar'>
        <div className='rich_editor__group'>
          <ToolbarButton
            label='Bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            disabled={disabled}>
            <Bold size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            disabled={disabled}>
            <Italic size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Underline'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            disabled={disabled}>
            <UnderlineIcon size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Strikethrough'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            disabled={disabled}>
            <Strikethrough size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton
            label='List'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            disabled={disabled}>
            <List size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='List ordered'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            disabled={disabled}>
            <ListOrdered size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Quote'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            disabled={disabled}>
            <Quote size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton
            label='Align left'
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            disabled={disabled}>
            <AlignLeft size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Align center'
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            disabled={disabled}>
            <AlignCenter size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Align right'
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            disabled={disabled}>
            <AlignRight size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Align justify'
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
            disabled={disabled}>
            <AlignJustify size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton
            label='Code block'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
            disabled={disabled}>
            <Code2 size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Inline code'
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            disabled={disabled}>
            <Code size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton
            label='Link'
            onClick={promptLinkUrl}
            isActive={editor.isActive('link')}
            disabled={disabled}>
            <LinkIcon size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Unlink'
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={disabled || !editor.isActive('link')}>
            <Unlink size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton label='Image' onClick={promptImageUrl} disabled={disabled}>
            <PlusSquare size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton
            label='Insert table'
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
            disabled={disabled}>
            <TableIcon size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Add row'
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={disabled || !canAddRow}>
            <Rows size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Add column'
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={disabled || !canAddColumn}>
            <Columns size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Merge cells'
            onClick={() => editor.chain().focus().mergeCells().run()}
            disabled={disabled || !canMerge}>
            <Merge size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Split cell'
            onClick={() => editor.chain().focus().splitCell().run()}
            disabled={disabled || !canSplit}>
            <Split size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Delete table'
            onClick={() => editor.chain().focus().deleteTable().run()}
            disabled={disabled || !canDeleteTable}>
            <Trash2 size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__spacer' />

        <div className='rich_editor__group'>
          <ToolbarButton
            label='Undo'
            onClick={() => editor.chain().focus().undo().run()}
            disabled={disabled || !canUndo}>
            <Undo2 size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Redo'
            onClick={() => editor.chain().focus().redo().run()}
            disabled={disabled || !canRedo}>
            <Redo2 size={18} />
          </ToolbarButton>
        </div>
      </div>

      <div className={`rich_editor__content ${disabled ? 'rich_editor__content_disabled' : ''}`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  children,
  label,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={`rich_editor__tool ${isActive ? 'rich_editor__tool--active' : ''}`}
      aria-label={label}
      title={label}>
      {children}
    </button>
  );
}
