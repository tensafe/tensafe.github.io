---
layout: post
title: "Using variadic templates with different parameter types"
description: ""
category: 
tags: [c++]
---
{% include JB/setup %}

I wrote a [C++ wrapper](https://github.com/iwongu/sqlite3pp) for [SQLite](http://www.sqlite.org) in 2007, when there were no such things like variadic templates.
To support variable length of paramters for some methods, I had to repeat the methods like this.

{% highlight cpp %}
template <class T1>
boost::tuple<T1> get_columns(int idx1) const {
  return boost::make_tuple(get(idx1, T1()));
}

template <class T1, class T2>
boost::tuple<T1, T2> get_columns(int idx1, int idx2) const {
  return boost::make_tuple(get(idx1, T1()), get(idx2, T2()));
}

template <class T1, class T2, class T3>
boost::tuple<T1, T2, T3> get_columns(int idx1, int idx2, int idx3) const {
  return boost::make_tuple(get(idx1, T1()), get(idx2, T2()), get(idx3, T3()));
}
...
template <class T1, class T2, class T3, class T4, class T5, class T6, class T7, class T8>
boost::tuple<T1, T2, T3, T4, T5, T6, T7, T8> get_columns(int idx1, int idx2, int idx3, int idx4, int idx5, int idx6, int idx7, int idx8) const {
  return boost::make_tuple(get(idx1, T1()), get(idx2, T2()), get(idx3, T3()), get(idx4, T4()), get(idx5, T5()), get(idx6, T6()), get(idx7, T7()), get(idx8, T8()));
}
{% endhighlight %}

Since then, I started using Java at work, and recently I found that C++11 introduced the variadic templates. I had to give it a try.
A friend introduced me [this video](http://channel9.msdn.com/Events/GoingNative/GoingNative-2012/Variadic-Templates-are-Funadic) and it helped me a lot.

The following was my try and had some difficulties with coming up with ?? part. (You might already notice that *boost::* namespaces were changed to *std::* for *tuple* and *make_tuple*.)
{% highlight cpp %}
template <class... Ts>
std::tuple<Ts...> get_columns(??... idxs) const {
  return std::make_tuple(get(idxs, Ts())...);
}
{% endhighlight %}

The friend gave me a simple trick for this too, which I liked a lot. The final updated code is this.
{% highlight cpp %}
template <class T>
struct convert {
  using to_int = int;
};

template <class... Ts>
std::tuple<Ts...> get_columns(typename convert<Ts>::to_int... idxs) const {
  return std::make_tuple(get(idxs, Ts())...);
}
{% endhighlight %}

A nice thing of using this trick is that you can extend this to map the template parameter types to types whatever we want by using template specializations for *convert*. For example,
{% highlight cpp %}
template <class T>
struct convert;

template <>
struct convert<float> {
  using to = float;
};

template <>
struct convert<double> {
  using to = double;
};
{% endhighlight %}

Frankly, I cannot think of any practical situations that need this yet. =)


