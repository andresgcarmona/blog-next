---
title: 'Implementing RSS feed in Jigsaw'
excerpt: 'Really Simple Syndication or RSS for short is a protocol that provides a method for aggregating web content. It is also a standard that defines the structure of a file (XML) for content publishing. The XML should conform to the WC3 RDF specification'
date: '2020-05-04T05:35:07.322Z'
author:
  name: Andres Carmona
  picture: '/assets/me.jpeg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

Really Simple Syndication or RSS for short is a protocol that provides a method for aggregating web content. It is also a standard that defines the structure of a file (XML) for content publishing. The XML should conform to the WC3's RDF specification [https://www.w3.org/wiki/RSS](https://www.w3.org/wiki/RSS).

It is used by other sites and tools (called feed aggregators or feed readers), to subscribe to your blog or website and get the content as soon as it is available.

## How Does RSS Work?

It is pretty simple:

* A website creates one or more RSS feeds and keep it (them) in a server.
* A user subscribes to your feed using a **feed reader**, this could be another site like [Feedly](https://feedly.com), or
a desktop app like [Thunderbird](https://www.thunderbird.net/).
* The feed reader shows the user the content of your site.

And that's it!.

## Implementing RSS in Jigsaw

This is really straight forward, as it is notice in the Jigsaw documentation.

> Other non-HTML, text-type files can also be processed with the Blade engine first, allowing you to dynamically generate non-HTML files that include variables and Blade control structures. Supported file extensions include .blade.js, .blade.json, .blade.xml, .blade.rss, .blade.txt, and .blade.text [...] The output file will maintain its filetype extension in the resulting URL; for example, a file named some-file.blade.xml will be processed by Blade, then will be accessible at the URL  my-jigsaw-site.com/some-file.xml.

So, all you need to do is add a file with a `.blade.xml` extension to your `source` directory, for example `rss.blade.xml` with the following content:

```php
{!! '<'.'?'.'xml version="1.0" encoding="UTF-8" ?>' !!}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
    <channel>
        <title>{{ $page->siteName }}</title>
        <link>{{ $page->baseUrl }}</link>
        <description><![CDATA[{{ $page->siteDescription }}]]></description>
        <atom:link href="{{ $page->getUrl() }}" rel="self" type="application/rss+xml" />
        <language>{{ $page->siteLanguage }}</language>
        <lastBuildDate>{{ $posts->first()->getDate()->format(DateTime::RSS) }}</lastBuildDate>

        @foreach($posts as $post)
            <item>
                <title><![CDATA[{!! $post->title !!}]]></title>
                <link>{{ $post->getUrl() }}</link>
                <guid isPermaLink="true">{{ $post->getUrl() }}</guid>
                <description><![CDATA[{!! $post->description !!}]]></description>
                <content:encoded><![CDATA[{!! $post->getContent() !!}]]></content:encoded>
                <dc:creator xmlns:dc="http://purl.org/dc/elements/1.1/">{{ $post->author }}</dc:creator>
                <pubDate>{{ $post->getDate()->format(DateTime::RSS) }}</pubDate>

                @if($post->cover_image)
                <media:content
                        medium="image"
                        url="{{ $page->baseUrl . $post->cover_image }}"
                        type="image/jpeg"
                        width="150"
                        height="150" />
                @endif
            </item>
        @endforeach
    </channel>
</rss>
```

Then build your site with `npm run local`, `npm run staging`, or `npm run production`. Once your site is build, a file named, in this case `rss.xml` will be placed in the root of your site. All that's left to do is to add a `<link rel="alternate" />` to the head of your master layout file like so:

```php
<link rel="alternate" type="application/rss+xml" title="{{ $page->siteName }}" href="{{ $page->baseUrl.'/rss.xml' }}" />
```

## Testing your RSS feed.

Once you have generated your RSS file, you can test it adding it to your feed reader/aggregator of choice. Let's try with [Feedly](https://feedly.com):

1. Open Feedly.
2. Select the *Follow new sources* button on the left toolbar.

    ![Follow source](/assets/blog/rss-feed-jigsaw/feedly.png "Follow source in Feedly")

3. Enter your site's URL, Feedly will automatically detect your site's feed and show you.
4. Select your source.
5. Click the follow button and voila!, your feed is ready to be consumed by your users.

    ![Your feed!](/assets/blog/rss-feed-jigsaw/feedly_feed.png "Your feed!")
