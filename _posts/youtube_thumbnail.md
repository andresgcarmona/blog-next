---
title: "#1 - Get Youtube thumbnails."
date: '2020-05-06T05:35:07.322Z'
excerpt: Get Youtube thumbnails.
author:
  name: Andres Carmona
  picture: '/assets/me.jpeg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

![Youtube](/assets/blog/tils/youtube_thumbnails.png "Youtube thumbnails")

Each YouTube video has four generated images. They are predictably formatted as follows:

```html
https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
https://img.youtube.com/vi/<insert-youtube-video-id-here>/1.jpg
https://img.youtube.com/vi/<insert-youtube-video-id-here>/2.jpg
https://img.youtube.com/vi/<insert-youtube-video-id-here>/3.jpg
```

The first one in the list is a full size image and others are thumbnail images. The default thumbnail image (i.e., one of 1.jpg, 2.jpg, 3.jpg) is:

`https://img.youtube.com/vi/<insert-youtube-video-id-here>/default.jpg`

For the high quality version of the thumbnail use a URL similar to this:

`https://img.youtube.com/vi/<insert-youtube-video-id-here>/hqdefault.jpg`

There is also a medium quality version of the thumbnail, using a URL similar to the HQ:

`https://img.youtube.com/vi/<insert-youtube-video-id-here>/mqdefault.jpg`

For the standard definition version of the thumbnail, use a URL similar to this:

`https://img.youtube.com/vi/<insert-youtube-video-id-here>/sddefault.jpg`

For the maximum resolution version of the thumbnail use a URL similar to this:

`https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg`

All of the above URLs are available over HTTP too. Additionally, the slightly shorter hostname i3.ytimg.com works in place of img.youtube.com in the example URLs above.

Alternatively, you can use the YouTube Data API (v3) to get thumbnail images.

Found at [https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api](https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api)	
