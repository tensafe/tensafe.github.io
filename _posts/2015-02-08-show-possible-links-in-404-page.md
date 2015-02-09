---
layout: post
title: "Show possible links in 404 page"
description: ""
category: 
tags: [jekyll]
---
{% include JB/setup %}

The ideathinking.com was hosted by Blogger and I am reusing the domain for this, which means I broke all the links that were in Blogger.

There were not many pageviews so I might not have to be bothered but I decided to try my best. =)

The old links in Blogger should be accessible using blogspot domain. That is, <http://ideathinking.com/2009/10/arraysizeof-macro.html> is accessible in <http://idea-thinking.blogspot.com/2009/10/arraysizeof-macro.html>.

IIUC, it's not possible to handle this in Jekyll since it's a static site generator. So, I put a small javascript file, *assets/javascripts/404.js*.
{% highlight js %}
var URL = document.URL.replace(window.location.hostname, 'idea-thinking.blogspot.com');
document.getElementById('404').innerHTML = '<a href="%%">%%</a>'.replace(/%%/g, URL);
{% endhighlight %}

And in *404.md* file,

{% highlight html %}
Try <b><span id="404"></span></b>
<script type="text/javascript" src="/assets/javascripts/404.js"></script>
{% endhighlight %}

You can see this in action in <http://ideathinking.com/2009/10/arraysizeof-macro.html>.