# Handling File Uploads in GraphQL

GraphQL was not designed with file uploads in mind. While it’s technically possible to implement them, doing so requires 
extending the transport layer and introduces several risks, both in security and reliability. 

This guide explains why file uploads via GraphQL are problematic and presents safer alternatives.

## Why uploads are challenging

The [GraphQL specification](https://spec.graphql.org/draft/) is transport-agnostic and serialization-agnostic (though HTTP and JSON are the most prevalent combination seen in the community).
GraphQL was designed to work with relatively small requests from clients, and was not designed with handling binary data in mind.

File uploads, by contrast, typically handle binary data such as images and PDFs &mdash; something many encodings, including JSON, cannot handle directly.
One option is to encode within our encoding (e.g. use a base64-encoded string within our JSON), but this is inefficient and is not suitable for larger binary files as it does not support streamed processing easily.
Instead, `multipart/form-data` is a common choice for transferring binary data; but it is not without its own set of complexities.

Supporting uploads over GraphQL usually involves adopting community conventions, the most prevalent of which is the 
[GraphQL multipart request specification](https://github.com/jaydenseric/graphql-multipart-request-spec).
This specification has been successfully implemented in many languages and frameworks, but users
implementing it must pay very close attention to ensure that they do not introduce
security or reliability concerns.

## Risks to be aware of

### Memory exhaustion from repeated variables

GraphQL operations allow the same variable to be referenced multiple times. If a file upload variable is reused, the underlying 
stream may be read multiple times or prematurely drained. This can result in incorrect behavior or memory exhaustion.

A safe practice is to use trusted documents or a validation rule to ensure each upload variable is referenced exactly once.

### Stream leaks on failed operations

GraphQL executes in phases: validation, then execution. If validation fails or an authorization check prematurely terminates execution, uploaded 
file streams may never be consumed. If your server buffers or retains these streams, it can cause memory leaks.

To avoid this, ensure that all streams are terminated when the request finishes, whether or not they were consumed in resolvers.
An alternative to consider is writing incoming files to temporary storage immediately, and passing references (like filenames) into 
resolvers. Ensure this storage is cleaned up after request completion, regardless of success or failure.

### Cross-Site Request Forgery (CSRF)

`multipart/form-data` is classified as a “simple” request in the CORS spec and does not trigger a preflight check. Without 
explicit CSRF protection, your GraphQL server may unknowingly accept uploads from malicious origins.

### Oversized or excess payloads

Attackers may submit very large uploads or include extraneous files under unused variable names. Servers that accept and 
buffer these can be overwhelmed.

Enforce request size caps and reject any files not explicitly referenced in the map field of the multipart payload.

### Untrusted file metadata

Information such as file names, MIME types, and contents should never be trusted. To mitigate risk:

- Sanitize filenames to prevent path traversal or injection issues.
- Sniff file types independently of declared MIME types, and reject mismatches.
- Validate file contents. Be aware of format-specific exploits like zip bombs or maliciously crafted PDFs.

## Recommendation: Use signed URLs

The most secure and scalable approach is to avoid uploading files through GraphQL entirely. Instead:

1. Use a GraphQL mutation to request a signed upload URL from your storage provider (e.g., Amazon S3).
2. Upload the file directly from the client using that URL.
3. Submit a second mutation to associate the uploaded file with your application’s data (or use an automatically triggered process, such as Amazon Lambda, to do the same).

You should ensure that these file uploads are only retained for a short period such that an attacker completing only steps 1 and 2 will not exhaust your storage.
When processing the file upload (step 3), the file should be moved to more permanent storage as appropriate.

This separates responsibilities cleanly, protects your server from binary data handling, and aligns with best practices for 
modern web architecture.

## If you still choose to support uploads

If your application truly requires file uploads through GraphQL, proceed with caution. At a minimum, you should:

- Use a well-maintained implementation of the 
[GraphQL multipart request spec](https://github.com/jaydenseric/graphql-multipart-request-spec).
- Enforce a rule that upload variables are only referenced once.
- Stream uploads to disk or cloud storage—avoid buffering them in memory.
- Ensure that streams are always terminated when the request ends, whether or not they were consumed.
- Apply strict request size limits and validate all fields.
- Treat file names, types, and contents as untrusted data.
