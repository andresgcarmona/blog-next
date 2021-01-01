---
title: Adding estimated reading time to posts in Jigsaw
date: '2020-04-21T05:35:07.322Z'
excerpt: Adding estimated reading time to blog posts in Jigsaw.
author:
  name: Andres Carmona
  picture: '/assets/me.jpeg'
ogImage:
    url: '/assets/blog/hello-world/cover.jpg'
---

Something I really like when reading an article is to have and idea of how long is it going to take to read it all, from top to bottom, that is the **Estimated Reading Time** (ERT), and that could help you decide if you read the article right away, or save it for later in a tool like [Pocket](https://getpocket.com/). Companies like Amazon have been using this metric to [trick their users to read more](https://www.alphr.com/life-culture/1002935/the-psychological-tricks-amazons-kindle-plays-on-you). Sites like [Medium](https://medium.com/) and [DEV.to](https://dev.to/) implement it as well with a similar purpose. Adding this metric to your blog's posts could help your users to engage more with your site.

There is [scientific evidence](https://www.sciencedirect.com/science/article/abs/pii/S1057740810001312) that shows that this is true, and as [explained](https://www.newyorker.com/tech/elements/a-list-of-reasons-why-our-brains-love-lists) in The New Yorker:

> In 2011, the psychologists Claude Messner and Michaela Wänke investigated what, if anything, could alleviate the so-called “paradox of choice” the phenomenon that the more information and options we have, the worse we feel. They concluded that … the faster we decide on something, whether it’s what we’re going to eat or what we’re going to read, the happier we become […] The more we know about something — including precisely how much time it will consume — the greater the chance we will commit to it.

## Words Per Minute (WPM)

According to [Wikipedia](https://www.wikiwand.com/en/Words_per_minute), Words per minute is

> A measure of words processed in a minute, often used as a measurement of the speed of typing, reading or Morse code sending and receiving.

There have been [studies](https://www.researchgate.net/publication/332380784_How_many_words_do_we_read_per_minute_A_review_and_meta-analysis_of_reading_rate) that demonstrates that the average silent reading rate for adults in English is 238 wpm for non-fiction and `260 wpm for fiction.

## How to calculate Estimated Reading Time

It is a really simple algorithm:

1. Find your total word count. Let’s say it’s 938 words.
2. Divide your total word count by an estimated Words per minute quantity, Eg. 200. In this case, 4.69.
3. The first part of your decimal number is your minutes. In this case 4.
4. Take the second part — the decimal points — and multiply that by 0.60. Those are your seconds.

The result? 938 words = a 4 minute, 41 second read.

## Time to code

So, enough of the theory and let's get our hands dirty.

With our algorithm in place we are going to create a function that will help us calculate the **estimated reading time** for each of our posts. Let's base our function on this gist [https://coderwall.com/p/y1yhwg/estimate-reading-time](https://coderwall.com/p/y1yhwg/estimate-reading-time)

```php
/**
 * Returns an estimated reading time in a string
 * idea from @link http://briancray.com/posts/estimated-reading-time-web-design/
 * @param  string $content the content to be read
 * @param int $wpm
 * @return string          estimated read time eg. 1 minute, 30 seconds
 **/
private function getEstimateReadingTime($content, $wpm = 200) {
    $wordCount = str_word_count(strip_tags($content));

    $minutes = (int) floor($wordCount / $wpm);
    $seconds = (int) floor($wordCount % $wpm / ($wpm / 60));

    $str_minutes = ($minutes === 1) ? 'minute' : 'minutes';
    $str_seconds = ($seconds === 1) ? 'second' : 'seconds';

    if ($minutes === 0) {
        return "{$seconds} {$str_seconds}";
    }
    else {
        return "{$minutes} {$str_minutes}, {$seconds} {$str_seconds}";
    }
}
```

This function is part of the **listener** that we are going to create next:

```php
namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;

class GenerateEstimateReadingTime
{
    public function handle(Jigsaw $jigsaw)
    {
        $jigsaw->getCollection('posts')->map(function ($post)
        {
            $post->estimated_reading_time = $this->getEstimateReadingTime($post);
        });
    }
}
```

Here we get the `posts` collection, iterate through all the items in that collection, and add a new property called `estimated_reading_time` which will contain the proper value. Once our listener has been created we need to hook it to an event. In Jigsaw, every time we build our site, several **events** are fired, those events are:

* beforeBuild
* afterCollection
* afterBuild

The one we are interested on is the **afterCollection** event. This event is fired **after** all collections have been processed but **before** any output files are written to disk. so let's go ahead and register our listener. We do this in the `bootstrap.php` file as mentioned before.

```php
$events->afterCollections(App\Listeners\GenerateEstimateReadingTime::class);
```

## Update the views.

With all this in place, the only thing missing is the adding this newly created value to our views. Let's add it to the `index.blade.php` file.

```php
<span class="inline-block bg-grey-300 hover:bg-grey-400 leading-loose tracking-wide text-grey-700 uppercase text-xs font-semibold rounded mt-2 md:ml-2 px-3 pt-px">{{ $post->estimated_reading_time }}</span>
```

## Conclusion

Estimated reading time is a measure that will help your users stay engaged with your site, by giving them and idea of how long it will take them to read your posts you ensure that they could stay reading more and more of your content. We saw too how to extend Jigsaw's functionality by adding this feature to your site.
