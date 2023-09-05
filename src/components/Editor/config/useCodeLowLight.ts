import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

import { lowlight } from 'lowlight/lib/common.js';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

export const lowLightConfig = CodeBlockLowlight.configure({
  lowlight
});
