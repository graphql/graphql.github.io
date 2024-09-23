import os
import googleapiclient.discovery
import googleapiclient.errors
from dotenv import load_dotenv


load_dotenv(dotenv_path='.env.development')

api_service_name = "youtube"
api_version = "v3"
api_key = os.getenv("YOUTUBE_ACCESS_TOKEN")

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=api_key)

def get_videos(channel_id, max_results_per_page=50):
    videos = []
    page_token = None  # Start with no pageToken
    total_fetched = 0  # Keep track of the total number of fetched videos
    
    while total_fetched < 200:  # Keep looping until 200 videos have been fetched
        request = youtube.search().list(
            part="snippet",
            channelId=channel_id,
            maxResults=max_results_per_page,
            order="date",
            type="video",
            pageToken=page_token  # Include the current pageToken
        )
        
        response = request.execute()
        
        for item in response.get("items", []):
            if total_fetched >= 200:
                break  # Break out of the loop if 200 videos have been fetched
            
            video_id = item["id"]["videoId"]
            title = item["snippet"]["title"]
            videos.append({'id': video_id, 'title': title})
            total_fetched += 1  # Increment the total_fetched count
        
        page_token = response.get("nextPageToken")  # Get the next pageToken
        
        if not page_token:
            break  # Exit the loop if there are no more pages
    
    return videos

def get_channel_id(channel_name):
    request = youtube.search().list(
        part="snippet",
        q=channel_name,
        type="channel",
        maxResults=1
    )
    response = request.execute()
    items = response.get("items", [])
    if items:
        return items[0]["snippet"]["channelId"]
    else:
        return None

channel_name = "GraphQLFoundation"  
channel_id = get_channel_id(channel_name)

if channel_id:
    videos = get_videos(channel_id)

    
    with open('videos.ts', 'w') as f:
        f.write('export const videos = [\n')
        for video in videos:
            f.write(f"  {{ id: '{video['id']}', title: `{video['title']}` }},\n")
        f.write('];\n')
    print("JS file has been written with video information!")
else:
    print(f"No channel found with name {channel_name}")