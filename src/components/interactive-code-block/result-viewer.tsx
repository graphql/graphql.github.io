import { Component } from "react"
import { EditorView } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { json } from "./codemirror-json"
import { codeMirrorThemeExtension } from "./codemirror-theme"

import "./syntax-highlighting.css"

interface ResultViewerProps {
  value?: string
}

/**
 * ResultViewer
 *
 * Maintains an instance of CodeMirror 6 for viewing a GraphQL response.
 *
 * Props:
 *
 *   - value: The text of the editor.
 *
 */
export class ResultViewer extends Component<ResultViewerProps> {
  private view: EditorView | null = null
  private domNode: HTMLDivElement | null = null

  componentDidMount() {
    if (!this.domNode) return

    // Create read-only editor state for JSON results
    const state = EditorState.create({
      doc: this.props.value || "",
      extensions: [
        EditorState.readOnly.of(true),
        json(),
        codeMirrorThemeExtension,
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

  shouldComponentUpdate(nextProps: ResultViewerProps) {
    return this.props.value !== nextProps.value
  }

  componentDidUpdate() {
    if (!this.view) return

    this.view.dispatch({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: this.props.value || "",
      },
    })
  }

  render() {
    return (
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="result-window h-full"
        ref={e => {
          this.domNode = e
        }}
      />
    )
  }
}
