import { visit } from "unist-util-visit"

const MINI_GRAPHIQL_COMPONENT = "InteractiveCodeBlock"
const MINI_GRAPHIQL_PATH = "@/components/interactive-code-block"

export const remarkGraphiQLComment = () => ast => {
  const nodes = []

  visit(ast, { type: "code", lang: "graphql" }, node => {
    if ((node.meta || "").split(" ").includes("graphiql")) {
      nodes.push(node)
      return
    }

    const [firstLine] = node.value.split("\n")
    if (/graphiql["']?: ?true/.test(firstLine)) {
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
              source: { type: "Literal", value: MINI_GRAPHIQL_PATH },
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
