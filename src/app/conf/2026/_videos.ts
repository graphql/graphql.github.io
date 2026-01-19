/**
 * This was populated with data captured via:
 *
 * https://developers.google.com/youtube/v3/docs/playlistItems/list
 *
 * with:
 *
 * - part: snippet
 * - maxResults: 50
 * - playlistId: <TODO>
 *
 * And then also adding `pageToken` for the second request to get the second
 * page.
 *
 * Note that the playlistId is the ID of the "Uploads" playlist for the
 * "GraphQLFoundationTalks" channel.
 *
 * Since the videos are unlisted it needed to be authenticated with the
 * https://www.googleapis.com/auth/youtube.readonly scope. This is also
 * why we couldn't use the generate-videos-mappings.py script.
 *
 * Then we simply mapped over the results:
 *
 * ```js
 * for (const item of data.items) {
 *   const id = item.snippet.resourceId.videoId;
 *   const title = item.snippet.title
 *   videos.push({ id, title })
 * }
 * ```
 */
export const videos: {
  id: string
  title: string
}[] = []
