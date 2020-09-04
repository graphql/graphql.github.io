import React from 'react'
import { string } from 'prop-types'
import Highlight, { defaultProps } from 'prism-react-renderer'

const SyntaxHighlight = ( { exampleCode, language } ) => (
  <Highlight {...defaultProps} code={exampleCode} theme={undefined} language={language}>
    {( { className, style, tokens, getLineProps, getTokenProps } ) => (
      <pre className={`prism ${className}`} style={style}>
        {tokens.map( ( line, i ) => (
          <div {...getLineProps( { line, key: i } )}>
            {line.map( ( token, key ) => (
              <span {...getTokenProps( { token, key } )} />
            ) )}
          </div>
        ) )}
      </pre>
    )}
  </Highlight>
)

SyntaxHighlight.propTypes = {
  exampleCode: string.isRequired,
  language: string,
}

SyntaxHighlight.defaultProps = {
  language: 'graphql',
}

export default SyntaxHighlight
