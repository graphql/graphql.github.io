import { type } from "arktype"

export const VendorMetadata = type({
  name: "string>0",
  slug: "string>0",
  description: "string>0",
  url: "string.url",
  "github?": "string>0",
})

export type VendorMetadata = typeof VendorMetadata.inferOut
