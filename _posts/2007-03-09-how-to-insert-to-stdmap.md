---
layout: post
title: "How to insert to std::map"
permalink: "/2007/03/stdmap-insert.html"
description: ""
category: 
tags: [c++]
---
{% include JB/setup %}

> This post is moved from <http://idea-thinking.blogspot.com/2007/03/stdmap-insert.html>, which was written in 2007.

### tl;dr

If you want to.

* overwrite if key exists, insert if not.
{% highlight cpp %}
nvp[key] = value;
{% endhighlight %}

* overwrite if key exists, noop if not.
{% highlight cpp %}
map_type::iterator iter = nvp.find(key);
if (iter != nvp.end()) (*iter).second = value;
{% endhighlight %}

* noop if key exists, insert if not.
{% highlight cpp %}
nvp.insert(make_pair(key, value));
{% endhighlight %}

* noop if key exists, insert if not, but want to know the case.
{% highlight cpp %}
bool is_newly_inserted = nvp.insert(make_pair(key, value)).second;
{% endhighlight %}


### Long story

Sometime ago, my coworker was reverting his refactoring code. The original and refactored codes were like this.

{% highlight cpp %}
nvp[name] = value; // original code
nvp.insert(make_pair(name, value)); // refactored
{% endhighlight %}

The problem was that the two lines are doing very different things. In C++03,

>23.3.1.2/1 map element access [lib.map.access]
> <br>
> T& operator[](const key_type& x);
> <br>
> Returns: (*((insert(make_pair(x, T()))).first)).second.

> 23.1.2/7 Associative containers
> <br>
> a_uniq.insert(t): pair<iterator, bool>
> <br>
> inserts t if and only if there is no element in the container with key equivalent to the key of t. The bool component of the returned pair indicates whether the insertion takes place and the iterator component of the pair points to the element with key equivalent to the key of t.

That is, the original code was overwriting the key with new value, but the new code was not. =(
