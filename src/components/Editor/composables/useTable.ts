import { Editor } from "@tiptap/vue-3";

import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

export function useTable(editor: Editor | undefined) {

  const CustomTableCell = TableCell.extend({
    addAttributes() {
      return {
        ...this.parent?.(),

        backgroundColor: {
          default: null,
          parseHTML: (element) => element.getAttribute('data-background-color'),
          renderHTML: (attributes) => {
            return {
              'data-background-color': attributes.backgroundColor,
              style: `background-color: ${attributes.backgroundColor}`,
            };
          },
        },
      };
    },
  });

  const getTableConfig = () => ([
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    CustomTableCell,
  ])

  return {
    getTableConfig
  }

}
