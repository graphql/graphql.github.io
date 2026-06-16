import { Component } from "react"
import { EditorView, highlightActiveLine } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { json } from "./codemirror-json"
import { history } from "@codemirror/commands"
import { codeMirrorThemeExtension } from "./codemirror-theme"

interface VariableEditorProps {
  value: string
  variableToType?: any
  onEdit?: (value: string) => void
  onRunQuery?: () => void
  onHintInformationRender?: (el: HTMLElement) => void
}

/**
 * VariableEditor
 *
 * An instance of CodeMirror 6 for editing variables defined in QueryEditor.
 *
 * Props:
 *
 *   - variableToType: A mapping of variable name to GraphQLType.
 *   - value: The text of the editor.
 *   - onEdit: A function called when the editor changes, given the edited text.
 *
 */
export class VariableEditor extends Component<VariableEditorProps> {
  private view: EditorView | null = null
  private domNode: HTMLDivElement | null = null
  private cachedValue: string
  private ignoreChangeEvent = false

  constructor(props: VariableEditorProps) {
    super(props)

    // Keep a cached version of the value, this cache will be updated when the
    // editor is updated, which can later be used to protect the editor from
    // unnecessary updates during the update lifecycle.
    this.cachedValue = props.value || ""
  }

  componentDidMount() {
    if (!this.domNode) return

    const state = EditorState.create({
      doc: this.props.value || "",
      extensions: [
        history(),
        json(),
        highlightActiveLine(),
        codeMirrorThemeExtension,
        EditorView.updateListener.of(update => {
          if (update.docChanged && !this.ignoreChangeEvent) {
            this.cachedValue = update.state.doc.toString()
            if (this.props.onEdit) {
              this.props.onEdit(this.cachedValue)
            }
          }
        }),
      ],
    })

    // Create editor view
    this.view = new EditorView({
      state,
      parent: this.domNode,
    })
  }

  componentDidUpdate(prevProps: VariableEditorProps) {
    if (!this.view) return

    // Ensure the changes caused by this update are not interpreted as
    // user-input changes which could otherwise result in an infinite
    // event loop.
    this.ignoreChangeEvent = true

    if (
      this.props.value !== prevProps.value &&
      this.props.value !== this.cachedValue
    ) {
      this.cachedValue = this.props.value
      this.view.dispatch({
        changes: {
          from: 0,
          to: this.view.state.doc.length,
          insert: this.props.value || "",
        },
      })
    }

    this.ignoreChangeEvent = false
  }

  componentWillUnmount() {
    if (this.view) {
      this.view.destroy()
      this.view = null
    }
  }

  render() {
    return (
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="variable-editor h-full"
        ref={e => {
          this.domNode = e
        }}
      />
    )
  }
}
