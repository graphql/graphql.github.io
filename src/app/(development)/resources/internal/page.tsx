import { readResources } from "@/resources/data"
import { ResourcesTable } from "./resources-table"

export default async function InternalResourcesPage() {
  const resources = await readResources()

  return <ResourcesTable resources={resources} />
}
