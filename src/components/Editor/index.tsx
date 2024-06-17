import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { EditorConfig } from "@ckeditor/ckeditor5-core";
import { styled } from "@mui/material/styles";
import { alpha, Box } from "@mui/material";

const EditorWrapper = styled(Box)(
  ({ theme }) => `
    .ck-editor__editable_inline {
      min-height: 400px; 
    }

    /* Overrides the border radius setting in the theme. */
    --ck-border-radius: 4px;

    /* Overrides the default font size in the theme. */
    --ck-font-size-base: 14px;

    /* Helper variables to avoid duplication in the colors. */
    --ck-custom-background: ${theme.palette.common.white};
    --ck-custom-foreground: ${alpha(theme.palette.action.hover, 0.2)};
    --ck-custom-border: var(--ck-custom-foreground);
    --ck-custom-focus-border: ${theme.colors.primary};
    --ck-custom-white: ${theme.palette.text.primary};
    
    --ck-powered-by-border-color: var(--ck-custom-focus-border);

    /* -- Overrides generic colors. ------------------------------------------------------------- */

    --ck-color-base-background: var(--ck-custom-background);
    --ck-color-base-foreground: var(--ck-custom-foreground);
    --ck-color-base-border: var(--ck-custom-border);
    --ck-color-base-hover: ${alpha(theme.colors.primary.lighter, 0.1)};
    --ck-color-base-active: ${alpha(theme.colors.primary.lighter, 0.2)};
    --ck-color-base-active-focus: var(--ck-color-base-active);
    --ck-color-focus-border: var(--ck-custom-focus-border);
    --ck-color-focus-border-coordinates: var(--ck-custom-focus-border);
    --ck-color-text: ${theme.colors.alpha.black[100]};
    --ck-color-shadow-drop: var(--ck-custom-focus-border);
    --ck-color-shadow-inner: var(--ck-custom-focus-border);
    
    --ck-color-resizer: var(--ck-custom-focus-border);
    --ck-color-widget-type-around-button-active: var(--ck-custom-focus-border);
    --ck-clipboard-drop-target-color: var(--ck-custom-focus-border);
    --ck-color-color-grid-check-icon: var(--ck-custom-focus-border);
    --ck-focus-ring: ${"2px solid " + (theme.colors.primary.main)};

    /* -- Overrides the default .ck-button class colors. ---------------------------------------- */

    --ck-color-button-default-background: var(--ck-custom-background);
    --ck-color-button-default-hover-background: var(--ck-color-base-hover);
    --ck-color-button-default-active-background: var(--ck-color-base-active);
    --ck-color-button-default-active-shadow: var(--ck-custom-focus-border);
    --ck-color-button-default-disabled-background: var(--ck-custom-background);

    --ck-color-button-on-background: var(--ck-custom-foreground);
    --ck-color-button-on-hover-background: var(--ck-color-button-default-hover-background);
    --ck-color-button-on-active-background: var(--ck-color-button-default-active-background);
    --ck-color-button-on-active-shadow: var(--ck-custom-focus-border);
    --ck-color-button-on-disabled-background: var(--ck-custom-foreground);
    --ck-color-button-on-color: var(--ck-custom-white);

    --ck-color-button-action-background: ${theme.colors.alpha.black[100]};
    --ck-color-button-action-hover-background: ${theme.colors.primary.lighter};
    --ck-color-button-action-active-background: ${theme.colors.alpha.black[10]};
    --ck-color-button-action-active-shadow: hsl(168, 75%, 34%);
    --ck-color-button-action-disabled-background: hsl(168, 76%, 42%);
    --ck-color-button-action-text: var(--ck-custom-white);

    --ck-color-button-save: hsl(120, 100%, 46%);
    --ck-color-button-cancel: hsl(15, 100%, 56%);

    /* -- Overrides the default .ck-dropdown class colors. -------------------------------------- */

    --ck-color-dropdown-panel-background: var(--ck-custom-background);
    --ck-color-dropdown-panel-border: var(--ck-custom-foreground);
    --ck-color-selector-column-resizer-hover: var(--ck-custom-foreground);

    /* -- Overrides the default .ck-splitbutton class colors. ----------------------------------- */

    --ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
    --ck-color-split-button-hover-border: var(--ck-custom-foreground);

    /* -- Overrides the default .ck-input class colors. ----------------------------------------- */

    --ck-color-input-background: var(--ck-custom-background);
    --ck-color-input-border: var(--ck-custom-border);
    --ck-color-input-text: var(--ck-custom-white);
    --ck-color-input-disabled-background: hsl(255, 4%, 21%);
    --ck-color-input-disabled-border: var(--ck-custom-border);
    --ck-color-input-disabled-text: hsl(0, 0%, 78%);

    /* -- Overrides the default .ck-labeled-field-view class colors. ---------------------------- */

    --ck-color-labeled-field-label-background: var(--ck-custom-background);

    /* -- Overrides the default .ck-list class colors. ------------------------------------------ */

    --ck-color-list-background: var(--ck-custom-background);
    --ck-color-list-button-hover-background: var(--ck-color-base-foreground);
    --ck-color-list-button-on-background: var(--ck-color-base-active);
    --ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);
    --ck-color-list-button-on-text: var(--ck-color-text);

    /* -- Overrides the default .ck-balloon-panel class colors. --------------------------------- */

    --ck-color-panel-background: var(--ck-custom-background);
    --ck-color-panel-border: var(--ck-custom-border);

    /* -- Overrides the default .ck-toolbar class colors. --------------------------------------- */

    --ck-color-toolbar-background: var(--ck-custom-background);
    --ck-color-toolbar-border: var(--ck-custom-border);

    /* -- Overrides the default .ck-tooltip class colors. --------------------------------------- */

    --ck-color-tooltip-background: var(--ck-custom-background);
    --ck-color-tooltip-text: var(--ck-color-text);

    /* -- Overrides the default colors used by the ckeditor5-image package. --------------------- */

    --ck-color-image-caption-background: hsl(0, 0%, 97%);
    --ck-color-image-caption-text: hsl(0, 0%, 20%);

    /* -- Overrides the default colors used by the ckeditor5-widget package. -------------------- */

    --ck-color-widget-blurred-border: var(--ck-custom-focus-border);
    --ck-color-widget-hover-border: var(--ck-custom-hover-border);
    --ck-color-widget-editable-focus-background: var(--ck-custom-white);

    /* -- Overrides the default colors used by the ckeditor5-link package. ---------------------- */

    --ck-color-link-default: hsl(190, 100%, 75%);
  `
);

interface EditorProps {
  content: string;
  handleBlur: (data: string) => void;
}

const editorConfig: EditorConfig = {
  toolbar: [
    'heading', '|',
    'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
    'undo', 'redo'
  ],
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
    ]
  }
}

function Editor(props: EditorProps) {
  const { content, handleBlur } = props;

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();

    handleBlur(data);
  };

  return (
    <EditorWrapper>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={editorConfig}
        onBlur={handleEditorChange}
      />
    </EditorWrapper>
  )
}

export default Editor;