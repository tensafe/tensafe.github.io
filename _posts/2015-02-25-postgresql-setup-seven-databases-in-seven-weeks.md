---
layout: post
title: "PostgreSQL setup - Seven Databases in Seven Weeks"
permalink: "/2015/02/2015-02-25-postgresql-setup-seven-databases-in-seven-weeks.html"
description: ""
category: 
tags: [postgres]
---
{% include JB/setup %}

I am reading the book, Seven Databases in Seven Weeks. I'm not familiar with the databases yet, so it took some time to figure out how to make "createdb book" and "psql book -c "SELECT '1'::cube;" work.

Here is the cookbook for it. I installed the postgres and contrib packages using Synaptic in Ubuntu before being able to run the following commands.

{% highlight sh %}
$ sudo -u postgres psql
postgres=# CREATE USER <username>;
postgres=# ALTER USER <username> WITH CREATEDB PASSWORD '<password>';
postgres=# \q

$ createdb book
$ sudo -u postgres psql book
postgres=# CREATE EXTENSION cube;
postgres=# \q

psql book -c "SELECT '1'::cube;"
{% endhighlight %}
