import { GraphQLSchema, parse, typeFromAST } from "graphql"

export function getVariableToType(schema: GraphQLSchema, documentStr: string) {
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
