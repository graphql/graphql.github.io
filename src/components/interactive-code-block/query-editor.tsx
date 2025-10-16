import { Component } from "react"
import { EditorView, keymap } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { history, historyKeymap, defaultKeymap } from "@codemirror/commands"
import { bracketMatching } from "@codemirror/language"
import {
  autocompletion,
  closeBrackets,
  completionKeymap,
} from "@codemirror/autocomplete"
import { graphql, updateSchema } from "cm6-graphql"
import { GraphQLSchema } from "graphql"
import { codeMirrorThemeExtension } from "./codemirror-theme"
import "./syntax-highlighting.css"

interface QueryEditorProps {
  schema?: GraphQLSchema
  value?: string
  onEdit?: (value: string) => void
  runQuery?: () => void
  onHintInformationRender?: (el: HTMLElement) => void
}

/**
 * QueryEditor
 *
 * Maintains an instance of CodeMirror 6 responsible for editing a GraphQL query.
 *
 * Props:
 *
 *   - schema: A GraphQLSchema instance enabling editor linting and hinting.
 *   - value: The text of the editor.
 *   - onEdit: A function called when the editor changes, given the edited text.
 *
 */
export class QueryEditor extends Component<QueryEditorProps> {
  private view: EditorView | null = null
  private domNode: HTMLDivElement | null = null
  private cachedValue: string
  private ignoreChangeEvent = false

  constructor(props: QueryEditorProps) {
    super(props)

    // Keep a cached version of the value, this cache will be updated when the
    // editor is updated, which can later be used to protect the editor from
    // unnecessary updates during the update lifecycle.
    this.cachedValue = props.value || ""
  }

  /**
   * Public API for retrieving the CodeMirror instance from this
   * React component.
   */
  getCodeMirror() {
    return this.view
  }

  componentDidMount() {
    if (!this.domNode) return

    const runQueryBinding = keymap.of([
      {
        key: "Cmd-Enter",
        run: () => (this.props.runQuery?.(), true),
      },
      {
        key: "Ctrl-Enter",
        run: () => (this.props.runQuery?.(), true),
      },
    ])

    const state = EditorState.create({
      doc: this.props.value || "",
      extensions: [
        history(),
        closeBrackets(),
        bracketMatching(),
        keymap.of([...historyKeymap, ...completionKeymap, ...defaultKeymap]),
        runQueryBinding,
        codeMirrorThemeExtension,
        graphql(this.props.schema, {}),
        autocompletion({
          icons: false,
        }),
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

  componentWillUnmount() {
    if (this.view) {
      this.view.destroy()
      this.view = null
    }
  }

  componentDidUpdate(prevProps: QueryEditorProps) {
    if (!this.view) return

    // Ensure the changes caused by this update are not interpreted as
    // user-input changes which could otherwise result in an infinite
    // event loop.
    this.ignoreChangeEvent = true

    if (this.props.schema !== prevProps.schema && this.props.schema) {
      updateSchema(this.view, this.props.schema)
    }

    if (
      this.props.value !== prevProps.value &&
      this.props.value !== this.cachedValue
    ) {
      this.cachedValue = this.props.value || ""
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

  render() {
    return (
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="query-editor flex h-full flex-col [&>:last-child]:basis-full"
        ref={e => {
          this.domNode = e
        }}
      />
    )
  }
}
