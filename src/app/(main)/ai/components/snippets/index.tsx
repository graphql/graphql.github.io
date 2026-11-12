"use client"

import { Code } from "nextra/components"

import { Pre } from "@/components/pre"

import NumbersIntrospection from "./numbers-introspection.mdx"
import NumbersResponse from "./numbers-response.mdx"
import NumbersSchema from "./numbers-schema.mdx"
import StepIntrospection from "./step-introspection.mdx"
import StepPrompt from "./step-prompt.mdx"
import StepQuery from "./step-query.mdx"
import StepResponse from "./step-response.mdx"
import UseCaseAgents from "./use-case-agents.mdx"
import UseCaseMcp from "./use-case-mcp.mdx"
import UseCaseRag from "./use-case-rag.mdx"
import WhyComposable from "./why-composable.mdx"
import WhySelfDescribing from "./why-self-describing.mdx"
import WhyStronglyTyped from "./why-strongly-typed.mdx"

const components = { pre: Pre, code: Code }

export function NumbersSchemaSnippet() {
  return <NumbersSchema components={components} />
}

export function NumbersIntrospectionSnippet() {
  return <NumbersIntrospection components={components} />
}

export function NumbersResponseSnippet() {
  return <NumbersResponse components={components} />
}

export function StepPromptSnippet() {
  return <StepPrompt components={components} />
}

export function StepIntrospectionSnippet() {
  return <StepIntrospection components={components} />
}

export function StepQuerySnippet() {
  return <StepQuery components={components} />
}

export function StepResponseSnippet() {
  return <StepResponse components={components} />
}

export function UseCaseMcpSnippet() {
  return <UseCaseMcp components={components} />
}

export function UseCaseRagSnippet() {
  return <UseCaseRag components={components} />
}

export function UseCaseAgentsSnippet() {
  return <UseCaseAgents components={components} />
}

export function WhySelfDescribingSnippet() {
  return <WhySelfDescribing components={components} />
}

export function WhyStronglyTypedSnippet() {
  return <WhyStronglyTyped components={components} />
}

export function WhyComposableSnippet() {
  return <WhyComposable components={components} />
}
