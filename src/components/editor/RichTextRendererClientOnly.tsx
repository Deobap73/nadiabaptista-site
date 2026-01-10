// src/components/editor/RichTextRendererClientOnly.tsx

import dynamic from 'next/dynamic';
import type { JSONContent } from '@tiptap/core';

type Props = {
  content: JSONContent | null;
};

const RichTextRenderer = dynamic(() => import('./RichTextRenderer'), { ssr: false });

export default function RichTextRendererClientOnly({ content }: Props) {
  return <RichTextRenderer content={content} />;
}
