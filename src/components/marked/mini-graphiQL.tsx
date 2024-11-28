// @ts-nocheck
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from "react"
import { marked } from "marked"

import { graphql, formatError, parse, typeFromAST } from "graphql"

export class MiniGraphiQL extends Component {
  // Lifecycle

  constructor(props) {
    super()
    const query = props.query.replace(/^\s+/, "")

    // Initialize state
    this.state = {
      query: query,
      variables: props.variables,
      response: null,
      variableToType: getVariableToType(props.schema, query),
    }

    this._editorQueryID = 0
  }

  render() {
    const editor = (
      <QueryEditor
        key="query-editor"
        schema={this.props.schema}
        value={this.state.query}
        onEdit={this._handleEditQuery.bind(this)}
        runQuery={this._runQueryFromEditor.bind(this)}
      />
    )

    return (
      <div className="miniGraphiQL">
        {Object.keys(this.state.variableToType).length > 0 ? (
          <div className="hasVariables">
            {editor}
            <VariableEditor
              value={this.state.variables}
              variableToType={this.state.variableToType}
              onEdit={this._handleEditVariables.bind(this)}
              onRunQuery={this._runQuery.bind(this)}
            />
          </div>
        ) : (
          editor
        )}
        <ResultViewer value={this.state.response} />
      </div>
    )
  }

  componentDidMount() {
    this._runQueryFromEditor()
  }

  // Private methods

  _runQueryFromEditor() {
    this.setState({
      variableToType: getVariableToType(this.props.schema, this.state.query),
    })
    this._runQuery()
  }

  async _runQuery() {
    this._editorQueryID++
    const queryID = this._editorQueryID
    try {
      const result = await graphql({
        schema: this.props.schema,
        source: this.state.query,
        variableValues: JSON.parse(this.state.variables || "{}"),
        rootValue: this.props.rootValue,
      })

      if (result.errors) {
        result.errors = result.errors.map(formatError)
      }

      if (queryID === this._editorQueryID) {
        this.setState({ response: JSON.stringify(result, null, 2) })
      }
    } catch (error) {
      if (queryID === this._editorQueryID) {
        this.setState({ response: JSON.stringify(error, null, 2) })
      }
    }
  }

  _handleEditQuery(value) {
    this.setState({ query: value })
  }

  _handleEditVariables(value) {
    this.setState({ variables: value })
  }
}

/**
 * QueryEditor
 *
 * Maintains an instance of CodeMirror responsible for editing a GraphQL query.
 *
 * Props:
 *
 *   - schema: A GraphQLSchema instance enabling editor linting and hinting.
 *   - value: The text of the editor.
 *   - onEdit: A function called when the editor changes, given the edited text.
 *
 */
class QueryEditor extends Component {
  constructor(props) {
    super()

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
    return this.editor
  }

  componentDidMount() {
    const CodeMirror = require("codemirror")
    require("codemirror/addon/hint/show-hint")
    require("codemirror/addon/comment/comment")
    require("codemirror/addon/edit/matchbrackets")
    require("codemirror/addon/edit/closebrackets")
    require("codemirror/addon/lint/lint")
    require("codemirror/keymap/sublime")
    require("codemirror-graphql/hint")
    require("codemirror-graphql/lint")
    require("codemirror-graphql/mode")

    this.editor = CodeMirror(this.domNode, {
      value: this.props.value || "",
      viewportMargin: Infinity,
      tabSize: 2,
      mode: "graphql",
      theme: "graphiql",
      keyMap: "sublime",
      autoCloseBrackets: true,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      lint: {
        schema: this.props.schema,
        onUpdateLinting: this._didLint.bind(this),
      },
      hintOptions: {
        schema: this.props.schema,
        closeOnUnfocus: true,
        completeSingle: false,
      },
      extraKeys: {
        "Cmd-Space": () => this.editor.showHint({ completeSingle: false }),
        "Ctrl-Space": () => this.editor.showHint({ completeSingle: false }),
        "Alt-Space": () => this.editor.showHint({ completeSingle: false }),
        "Shift-Space": () => this.editor.showHint({ completeSingle: false }),

        "Cmd-Enter": () => {
          if (this.props.onRunQuery) {
            this.props.onRunQuery()
          }
        },
        "Ctrl-Enter": () => {
          if (this.props.onRunQuery) {
            this.props.onRunQuery()
          }
        },

        // Editor improvements
        "Ctrl-Left": "goSubwordLeft",
        "Ctrl-Right": "goSubwordRight",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
      },
    })

    this.editor.on("change", this._onEdit.bind(this))
    this.editor.on("keyup", this._onKeyUp.bind(this))
    this.editor.on("hasCompletion", this._onHasCompletion.bind(this))
  }

  componentWillUnmount() {
    this.editor = null
  }

  componentDidUpdate(prevProps) {
    // Ensure the changes caused by this update are not interpreted as
    // user-input changes which could otherwise result in an infinite
    // event loop.
    this.ignoreChangeEvent = true
    if (this.props.schema !== prevProps.schema) {
      this.editor.options.lint.schema = this.props.schema
      this.editor.options.hintOptions.schema = this.props.schema
      CodeMirror.signal(this.editor, "change", this.editor)
    }
    if (
      this.props.value !== prevProps.value &&
      this.props.value !== this.cachedValue
    ) {
      this.cachedValue = this.props.value
      this.editor.setValue(this.props.value)
    }
    this.ignoreChangeEvent = false
  }

  _didLint(annotations) {
    if (annotations.length === 0) {
      this.props.runQuery()
    }
  }

  _onKeyUp(cm, event) {
    const code = event.keyCode
    if (
      (code >= 65 && code <= 90) || // letters
      (!event.shiftKey && code >= 48 && code <= 57) || // numbers
      (event.shiftKey && code === 189) || // underscore
      (event.shiftKey && code === 50) || // @
      (event.shiftKey && code === 57) // (
    ) {
      this.editor.execCommand("autocomplete")
    }
  }

  _onEdit() {
    if (!this.ignoreChangeEvent) {
      this.cachedValue = this.editor.getValue()
      if (this.props.onEdit) {
        this.props.onEdit(this.cachedValue)
      }
    }
  }

  _onHasCompletion(cm, data) {
    onHasCompletion(cm, data, this.props.onHintInformationRender)
  }

  render() {
    return (
      <div className="query-editor" ref={e => (this.domNode = e)}>
        <span className="editor-name rounded-tl">Operation</span>
      </div>
    )
  }
}

/**
 * ResultViewer
 *
 * Maintains an instance of CodeMirror for viewing a GraphQL response.
 *
 * Props:
 *
 *   - value: The text of the editor.
 *
 */
class ResultViewer extends Component {
  componentDidMount() {
    const CodeMirror = require("codemirror")
    require("codemirror-graphql/results/mode")

    this.viewer = CodeMirror(this.domNode, {
      value: this.props.value || "",
      viewportMargin: Infinity,
      readOnly: true,
      theme: "graphiql",
      mode: "graphql-results",
      keyMap: "sublime",
      extraKeys: {
        // Editor improvements
        "Ctrl-Left": "goSubwordLeft",
        "Ctrl-Right": "goSubwordRight",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
      },
    })
  }

  componentWillUnmount() {
    this.viewer = null
  }

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
  }

  componentDidUpdate() {
    this.viewer.setValue(this.props.value || "")
  }

  render() {
    return (
      <div className="result-window" ref={e => (this.domNode = e)}>
        <span className="editor-name rounded-tr">Response</span>
      </div>
    )
  }
}

/**
 * VariableEditor
 *
 * An instance of CodeMirror for editing variables defined in QueryEditor.
 *
 * Props:
 *
 *   - variableToType: A mapping of variable name to GraphQLType.
 *   - value: The text of the editor.
 *   - onEdit: A function called when the editor changes, given the edited text.
 *
 */
class VariableEditor extends Component {
  constructor(props) {
    super()

    // Keep a cached version of the value, this cache will be updated when the
    // editor is updated, which can later be used to protect the editor from
    // unnecessary updates during the update lifecycle.
    this.cachedValue = props.value || ""
    this._onKeyUp = this.onKeyUp.bind(this)
    this._onEdit = this.onEdit.bind(this)
    this._onHasCompletion = this.onHasCompletion.bind(this)
  }

  componentDidMount() {
    // Lazily require to ensure requiring GraphiQL outside of a Browser context
    // does not produce an error.
    const CodeMirror = require("codemirror")
    require("codemirror/addon/hint/show-hint")
    require("codemirror/addon/edit/matchbrackets")
    require("codemirror/addon/edit/closebrackets")
    require("codemirror/addon/lint/lint")
    require("codemirror/keymap/sublime")
    require("codemirror-graphql/variables/hint")
    require("codemirror-graphql/variables/lint")
    require("codemirror-graphql/variables/mode")

    this.editor = CodeMirror(this.domNode, {
      value: this.props.value || "",
      viewportMargin: Infinity,
      tabSize: 2,
      mode: "graphql-variables",
      theme: "graphiql",
      keyMap: "sublime",
      autoCloseBrackets: true,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      lint: {
        variableToType: this.props.variableToType,
        onUpdateLinting: this._didLint.bind(this),
      },
      hintOptions: {
        variableToType: this.props.variableToType,
      },
      extraKeys: {
        "Cmd-Space": () => this.editor.showHint({ completeSingle: false }),
        "Ctrl-Space": () => this.editor.showHint({ completeSingle: false }),
        "Alt-Space": () => this.editor.showHint({ completeSingle: false }),
        "Shift-Space": () => this.editor.showHint({ completeSingle: false }),

        "Cmd-Enter"() {
          if (this.props.onRunQuery) {
            this.props.onRunQuery()
          }
        },
        "Ctrl-Enter"() {
          if (this.props.onRunQuery) {
            this.props.onRunQuery()
          }
        },

        // Editor improvements
        "Ctrl-Left": "goSubwordLeft",
        "Ctrl-Right": "goSubwordRight",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
      },
    })

    this.editor.on("change", this._onEdit)
    this.editor.on("keyup", this._onKeyUp)
    this.editor.on("hasCompletion", this._onHasCompletion)
  }

  componentDidUpdate(prevProps) {
    const CodeMirror = require("codemirror")

    // Ensure the changes caused by this update are not interpreted as
    // user-input changes which could otherwise result in an infinite
    // event loop.
    this.ignoreChangeEvent = true
    if (this.props.variableToType !== prevProps.variableToType) {
      this.editor.options.lint.variableToType = this.props.variableToType
      this.editor.options.hintOptions.variableToType = this.props.variableToType
      CodeMirror.signal(this.editor, "change", this.editor)
    }
    if (
      this.props.value !== prevProps.value &&
      this.props.value !== this.cachedValue
    ) {
      this.cachedValue = this.props.value
      this.editor.setValue(this.props.value)
    }
    this.ignoreChangeEvent = false
  }

  componentWillUnmount() {
    this.editor.off("change", this._onEdit)
    this.editor.off("keyup", this._onKeyUp)
    this.editor.off("hasCompletion", this._onHasCompletion)
    this.editor = null
  }

  render() {
    return (
      <div className="variable-editor" ref={e => (this.domNode = e)}>
        <span className="editor-name">Variables</span>
      </div>
    )
  }

  _didLint(annotations) {
    if (annotations.length === 0) {
      this.props.onRunQuery()
    }
  }

  onKeyUp(cm, event) {
    const code = event.keyCode
    if (
      (code >= 65 && code <= 90) || // letters
      (!event.shiftKey && code >= 48 && code <= 57) || // numbers
      (event.shiftKey && code === 189) || // underscore
      (event.shiftKey && code === 222) // "
    ) {
      this.editor.execCommand("autocomplete")
    }
  }

  onEdit() {
    if (!this.ignoreChangeEvent) {
      this.cachedValue = this.editor.getValue()
      if (this.props.onEdit) {
        this.props.onEdit(this.cachedValue)
      }
    }
  }

  onHasCompletion(cm, data) {
    onHasCompletion(cm, data, this.props.onHintInformationRender)
  }
}

/**
 * Render a custom UI for CodeMirror's hint which includes additional info
 * about the type and description for the selected context.
 */
function onHasCompletion(cm, data, onHintInformationRender) {
  const CodeMirror = require("codemirror")
  let wrapper
  let information

  // When a hint result is selected, we touch the UI.
  CodeMirror.on(data, "select", (ctx, el) => {
    // Only the first time (usually when the hint UI is first displayed)
    // do we create the wrapping node.
    if (!wrapper) {
      // Wrap the existing hint UI, so we have a place to put information.
      const hintsUl = el.parentNode
      const container = hintsUl.parentNode
      wrapper = document.createElement("div")
      container.appendChild(wrapper)

      // CodeMirror vertically inverts the hint UI if there is not enough
      // space below the cursor. Since this modified UI appends to the bottom
      // of CodeMirror's existing UI, it could cover the cursor. This adjusts
      // the positioning of the hint UI to accommodate.
      let top = hintsUl.style.top
      let bottom = ""
      const cursorTop = cm.cursorCoords().top
      if (parseInt(top, 10) < cursorTop) {
        top = ""
        bottom = window.innerHeight - cursorTop + 3 + "px"
      }

      // Style the wrapper, remove positioning from hints. Note that usage
      // of this option will need to specify CSS to remove some styles from
      // the existing hint UI.
      wrapper.className = "CodeMirror-hints-wrapper"
      wrapper.style.left = hintsUl.style.left
      wrapper.style.top = top
      wrapper.style.bottom = bottom
      hintsUl.style.left = ""
      hintsUl.style.top = ""

      // This "information" node will contain the additional info about the
      // highlighted typeahead option.
      information = document.createElement("div")
      information.className = "CodeMirror-hint-information"
      if (bottom) {
        wrapper.appendChild(information)
        wrapper.appendChild(hintsUl)
      } else {
        wrapper.appendChild(hintsUl)
        wrapper.appendChild(information)
      }

      // When CodeMirror attempts to remove the hint UI, we detect that it was
      // removed from our wrapper and in turn remove the wrapper from the
      // original container.
      let onRemoveFn
      const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
          // Check if the hintsUl element was removed
          if (mutation.removedNodes) {
            mutation.removedNodes.forEach(node => {
              if (node === hintsUl) {
                // Cleanup logic
                observer.disconnect() // Stop observing
                wrapper.parentNode.removeChild(wrapper)
                wrapper = null
                information = null
                onRemoveFn = null
              }
            })
          }
        }
      })

      // Start observing the wrapper for child node removals
      observer.observe(wrapper, { childList: true, subtree: false })
    }

    // Now that the UI has been set up, add info to information.
    const description = ctx.description
      ? marked(ctx.description, { smartypants: true })
      : "Self descriptive."
    const type = ctx.type
      ? '<span class="infoType">' + String(ctx.type) + "</span>"
      : ""
    information.innerHTML =
      '<div class="content">' +
      (description.slice(0, 3) === "<p>"
        ? "<p>" + type + description.slice(3)
        : type + description) +
      "</div>"

    // Additional rendering?
    if (onHintInformationRender) {
      onHintInformationRender(information)
    }
  })
}

function getVariableToType(schema, documentStr) {
  if (!documentStr || !schema) {
    return {}
  }

  try {
    const documentAST = parse(documentStr)
    const variableToType = Object.create(null)
    documentAST.definitions.forEach(definition => {
      if (definition.kind === "OperationDefinition") {
        const variableDefinitions = definition.variableDefinitions
        if (variableDefinitions) {
          variableDefinitions.forEach(({ variable, type }) => {
            const inputType = typeFromAST(schema, type)
            if (inputType) {
              variableToType[variable.name.value] = inputType
            }
          })
        }
      }
    })
    return variableToType
  } catch (e) {
    // ignore
  }

  return {}
}
