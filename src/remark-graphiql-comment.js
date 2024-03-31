import { visit } from "unist-util-visit"

export const remarkGraphiQLComment = () => ast => {
  const nodes = []

  const MINI_GRAPHIQL_COMPONENT = "Marked"

  visit(ast, { type: "code", lang: "graphql" }, node => {
    const [firstLine] = node.value.split("\n")
    const isGraphiQLComment = /graphiql["']?: ?true/.test(firstLine)
    if (isGraphiQLComment) {
      nodes.push(node)
    }
  })

  if (nodes.length) {
    ast.children.push({
      type: "mdxjsEsm",
      data: {
        estree: {
          body: [
            {
              type: "ImportDeclaration",
              source: { type: "Literal", value: "@/components/marked" },
              specifiers: [
                {
                  type: "ImportSpecifier",
                  imported: {
                    type: "Identifier",
                    name: MINI_GRAPHIQL_COMPONENT,
                  },
                  local: { type: "Identifier", name: MINI_GRAPHIQL_COMPONENT },
                },
              ],
            },
          ],
        },
      },
    })

    for (const node of nodes) {
      const value = "\\`\\`\\`graphql\n" + node.value + "\n\\`\\`\\`"

      Object.assign(node, {
        type: "mdxJsxFlowElement",
        name: MINI_GRAPHIQL_COMPONENT,
        children: [
          {
            type: "mdxFlowExpression",
            data: {
              estree: {
                body: [
                  {
                    type: "ExpressionStatement",
                    expression: {
                      type: "TemplateLiteral",
                      expressions: [],
                      quasis: [
                        {
                          type: "TemplateElement",
                          value: { raw: value },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        ],
      })
    }
  }
}
