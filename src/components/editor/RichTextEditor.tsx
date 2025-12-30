// src/components/editor/RichTextEditor.tsx

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Underline } from '@tiptap/extension-underline';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaCode,
  FaLink,
  FaUnlink,
  FaUndo,
  FaRedo,
  FaImage,
} from 'react-icons/fa';

type Props = {
  value: JSONContent | null; // Alterado para JSON
  onChange: (value: JSONContent) => void;
  disabled?: boolean;
};

export default function RichTextEditor({ value, onChange, disabled }: Props) {
  const editor = useEditor({
    editable: !disabled,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder: 'Escreve aqui o teu artigo...',
      }),
    ],
    // IMPORTANTE: Se o value inicial vier null/undefined, não faz setContent imediato que cause loop
    content: value || undefined,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'rich_editor__input', // Classe auxiliar se precisares
      },
    },
  });

  // Sincronizar valor externo se mudar drasticamente (ex: reset form)
  // Nota: Fazer isto com cuidado para evitar re-render loops.
  // Geralmente num form de admin o "initialValue" é suficiente.

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('URL da imagem:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL do link', previousUrl);

    // cancelled
    if (url === null) return;

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className='rich_editor'>
      <div className='rich_editor__toolbar'>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          disabled={disabled}>
          <FaBold />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          disabled={disabled}>
          <FaItalic />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          disabled={disabled}>
          <FaUnderline />
        </ToolbarButton>
        <div style={{ width: 1, background: '#ccc', margin: '0 4px' }} />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          disabled={disabled}>
          <FaHeading style={{ fontSize: '0.9em' }} />2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          disabled={disabled}>
          <FaHeading style={{ fontSize: '0.7em' }} />3
        </ToolbarButton>
        <div style={{ width: 1, background: '#ccc', margin: '0 4px' }} />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          disabled={disabled}>
          <FaListUl />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          disabled={disabled}>
          <FaListOl />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          disabled={disabled}>
          <FaQuoteRight />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          disabled={disabled}>
          <FaCode />
        </ToolbarButton>
        <div style={{ width: 1, background: '#ccc', margin: '0 4px' }} />
        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} disabled={disabled}>
          <FaLink />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link') || disabled}>
          <FaUnlink />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} disabled={disabled}>
          <FaImage />
        </ToolbarButton>
        <div style={{ flex: 1 }} /> {/* Espaçador */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={disabled}>
          <FaUndo />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={disabled}>
          <FaRedo />
        </ToolbarButton>
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
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={`rich_editor__tool ${isActive ? 'rich_editor__tool--active' : ''}`}>
      {children}
    </button>
  );
}
