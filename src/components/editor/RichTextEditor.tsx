// src/components/editor/RichTextEditor.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';

import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Underline } from '@tiptap/extension-underline';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';

import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';

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

import { FontSize } from './extensions/FontSize';

type Props = {
  value: JSONContent | null;
  onChange: (value: JSONContent) => void;
  disabled?: boolean;
};

const EMPTY_DOC: JSONContent = {
  type: 'doc',
  content: [{ type: 'paragraph' }],
};

const FONT_SIZES: Array<{ label: string; value: string }> = [
  { label: 'Small', value: '0.875rem' },
  { label: 'Normal', value: '1rem' },
  { label: 'Large', value: '1.25rem' },
  { label: 'XL', value: '1.5rem' },
];

const lowlight = createLowlight(common);

function jsonEqual(a: unknown, b: unknown): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

export default function RichTextEditor({ value, onChange, disabled }: Props) {
  const [fontSizeValue, setFontSizeValue] = useState<string>('');

  const editor = useEditor({
    immediatelyRender: false,
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      TextStyle,
      FontSize,
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

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [editor, disabled]);

  useEffect(() => {
    if (!editor) return;

    const next = value || EMPTY_DOC;
    const current = editor.getJSON();

    if (!jsonEqual(current, next)) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;

    const sync = () => {
      const attrs = editor.getAttributes('textStyle') as { fontSize?: string | null };
      setFontSizeValue(attrs.fontSize || '');
    };

    sync();

    editor.on('selectionUpdate', sync);
    editor.on('transaction', sync);

    return () => {
      editor.off('selectionUpdate', sync);
      editor.off('transaction', sync);
    };
  }, [editor]);

  if (!editor) {
    return <div className='rich_editor' />;
  }

  const ed = editor;

  function promptImageUrl() {
    const url = window.prompt('URL da imagem:');
    const clean = (url || '').trim();
    if (!clean) return;

    ed.chain().focus().setImage({ src: clean }).run();
  }

  function promptLinkUrl() {
    const prev = ed.getAttributes('link') as { href?: string };
    const url = window.prompt('URL do link', prev.href || '');

    if (url === null) return;

    const clean = (url || '').trim();

    if (!clean) {
      ed.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    ed.chain().focus().extendMarkRange('link').setLink({ href: clean }).run();
  }

  const canUndo = ed.can().chain().focus().undo().run();
  const canRedo = ed.can().chain().focus().redo().run();

  const canAddRow = ed.can().chain().focus().addRowAfter().run();
  const canAddColumn = ed.can().chain().focus().addColumnAfter().run();
  const canDeleteTable = ed.can().chain().focus().deleteTable().run();
  const canMerge = ed.can().chain().focus().mergeCells().run();
  const canSplit = ed.can().chain().focus().splitCell().run();

  return (
    <div className='rich_editor'>
      <div className='rich_editor__toolbar'>
        <div className='rich_editor__group'>
          <ToolbarButton
            label='Bold'
            onClick={() => ed.chain().focus().toggleBold().run()}
            isActive={ed.isActive('bold')}
            disabled={disabled}>
            <Bold size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Italic'
            onClick={() => ed.chain().focus().toggleItalic().run()}
            isActive={ed.isActive('italic')}
            disabled={disabled}>
            <Italic size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Underline'
            onClick={() => ed.chain().focus().toggleUnderline().run()}
            isActive={ed.isActive('underline')}
            disabled={disabled}>
            <UnderlineIcon size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Strikethrough'
            onClick={() => ed.chain().focus().toggleStrike().run()}
            isActive={ed.isActive('strike')}
            disabled={disabled}>
            <Strikethrough size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <select
            className='rich_editor__select'
            value={fontSizeValue}
            onChange={(e) => {
              const next = e.target.value;

              setFontSizeValue(next);

              if (!next) {
                ed.chain().focus().setMark('textStyle', { fontSize: null }).run();
                return;
              }

              ed.chain().focus().setMark('textStyle', { fontSize: next }).run();
            }}
            disabled={disabled}
            aria-label='Font size'
            title='Font size'>
            <option value=''>Default</option>
            {FONT_SIZES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton
            label='List'
            onClick={() => ed.chain().focus().toggleBulletList().run()}
            isActive={ed.isActive('bulletList')}
            disabled={disabled}>
            <List size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='List ordered'
            onClick={() => ed.chain().focus().toggleOrderedList().run()}
            isActive={ed.isActive('orderedList')}
            disabled={disabled}>
            <ListOrdered size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Quote'
            onClick={() => ed.chain().focus().toggleBlockquote().run()}
            isActive={ed.isActive('blockquote')}
            disabled={disabled}>
            <Quote size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton
            label='Align left'
            onClick={() => ed.chain().focus().setTextAlign('left').run()}
            isActive={ed.isActive({ textAlign: 'left' })}
            disabled={disabled}>
            <AlignLeft size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Align center'
            onClick={() => ed.chain().focus().setTextAlign('center').run()}
            isActive={ed.isActive({ textAlign: 'center' })}
            disabled={disabled}>
            <AlignCenter size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Align right'
            onClick={() => ed.chain().focus().setTextAlign('right').run()}
            isActive={ed.isActive({ textAlign: 'right' })}
            disabled={disabled}>
            <AlignRight size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Align justify'
            onClick={() => ed.chain().focus().setTextAlign('justify').run()}
            isActive={ed.isActive({ textAlign: 'justify' })}
            disabled={disabled}>
            <AlignJustify size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton
            label='Code block'
            onClick={() => ed.chain().focus().toggleCodeBlock().run()}
            isActive={ed.isActive('codeBlock')}
            disabled={disabled}>
            <Code2 size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Inline code'
            onClick={() => ed.chain().focus().toggleCode().run()}
            isActive={ed.isActive('code')}
            disabled={disabled}>
            <Code size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton
            label='Link'
            onClick={promptLinkUrl}
            isActive={ed.isActive('link')}
            disabled={disabled}>
            <LinkIcon size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Unlink'
            onClick={() => ed.chain().focus().unsetLink().run()}
            disabled={Boolean(disabled) || !ed.isActive('link')}>
            <Unlink size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton label='Insert image' onClick={promptImageUrl} disabled={disabled}>
            <PlusSquare size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__group'>
          <ToolbarButton
            label='Insert table'
            onClick={() =>
              ed.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
            disabled={disabled}>
            <TableIcon size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Add row'
            onClick={() => ed.chain().focus().addRowAfter().run()}
            disabled={Boolean(disabled) || !canAddRow}>
            <Rows size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Add column'
            onClick={() => ed.chain().focus().addColumnAfter().run()}
            disabled={Boolean(disabled) || !canAddColumn}>
            <Columns size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Merge cells'
            onClick={() => ed.chain().focus().mergeCells().run()}
            disabled={Boolean(disabled) || !canMerge}>
            <Merge size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Split cell'
            onClick={() => ed.chain().focus().splitCell().run()}
            disabled={Boolean(disabled) || !canSplit}>
            <Split size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Delete table'
            onClick={() => ed.chain().focus().deleteTable().run()}
            disabled={Boolean(disabled) || !canDeleteTable}>
            <Trash2 size={18} />
          </ToolbarButton>
        </div>

        <div className='rich_editor__spacer' />

        <div className='rich_editor__group'>
          <ToolbarButton
            label='Undo'
            onClick={() => ed.chain().focus().undo().run()}
            disabled={Boolean(disabled) || !canUndo}>
            <Undo2 size={18} />
          </ToolbarButton>

          <ToolbarButton
            label='Redo'
            onClick={() => ed.chain().focus().redo().run()}
            disabled={Boolean(disabled) || !canRedo}>
            <Redo2 size={18} />
          </ToolbarButton>
        </div>
      </div>

      <div className={`rich_editor__content ${disabled ? 'rich_editor__content_disabled' : ''}`}>
        <EditorContent editor={ed} />
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
