---
layout: post
title: "How to show the latest N posts on homepage in Jekyll"
description: ""
category: 
tags: [jekyll]
---
{% include JB/setup %}

If you are like me, you might want to show the latest N posts on homepage in your blog. This is the simplest solution that I have found so far.

Just put the code snippet below in your index.md file. Just don't forget to delete the spaces between { and % in the code.

{% highlight html %}
---
layout: page
title : Home
header : Home
group: navigation
---
{ % include JB/setup %}

<ul class="posts">  
	{ % for post in site.posts limit:5 %}
        <h1 class="entry-title">
		{ % if post.title %}
			<a href="{{ post.url }}">{{ post.title }}</a>
		{ % endif %}
	</h1>
	<div class="entry-content">{{ post.content }}</div>
	{ % endfor %}  
</ul>
{% endhighlight %}
