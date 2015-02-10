---
layout: post
title: "Using variadic templates with function calls using tuple"
description: ""
category: 
tags: [c++]
---
{% include JB/setup %}

After doing [this](/2015/02/using-variadic-templates-with-different-parameter-types.html), I started working on this code.
{% highlight cpp %}
template <class R>
void function0_impl(sqlite3_context* ctx, int nargs, sqlite3_value** values)
{
  boost::function<R ()>* f =
      static_cast<boost::function<R ()>*>(sqlite3_user_data(ctx));
  context c(ctx, nargs, values);
  c.result((*f)());
}

template <class R, class P1>
void function1_impl(sqlite3_context* ctx, int nargs, sqlite3_value** values)
{
  boost::function<R (P1)>* f =
      static_cast<boost::function<R (P1)>*>(sqlite3_user_data(ctx));
  context c(ctx, nargs, values);
  c.result((*f)(c.context::get<P1>(0)));
}
...
template <class R, class P1, class P2, class P3, class P4, class P5>
void function5_impl(sqlite3_context* ctx, int nargs, sqlite3_value** values)
{
  boost::function<R (P1, P2, P3, P4, P5)>* f =
      static_cast<boost::function<R (P1, P2, P3, P4, P5)>*>(sqlite3_user_data(ctx));
  context c(ctx, nargs, values);
  c.result((*f)(c.context::get<P1>(0), c.context::get<P2>(1), c.context::get<P3>(2), c.context::get<P4>(3), c.context::get<P5>(4)));
}
{% endhighlight %}

It was harder because I had to find the solition to call a method per param using index.

{% highlight cpp %}
  (*f)(c.context::get<P1>(0),
     c.context::get<P2>(1),
     c.context::get<P3>(2),
     ...);
}
{% endhighlight %}

So, I made a plan to do this in two steps.

1. make a tuple for the params.
1. and call the function using the tuple.

#### Make a tuple for the params

{% highlight cpp %}
template <class... Ts>
std::tuple<Ts...> to_tuple() {
  return to_tuple_impl(0, *this, std::tuple<Ts...>());
}

template<class H, class... Ts>
static inline std::tuple<H, Ts...> to_tuple_impl(int index, const context& c, std::tuple<H, Ts...>&&)
{
  auto h = std::make_tuple(c.context::get<H>(index));
  return std::tuple_cat(h, to_tuple_impl(++index, c, std::tuple<Ts...>()));
}
static inline std::tuple<> to_tuple_impl(int index, const context& c, std::tuple<>&&)
{
  return std::tuple<>();
}
{% endhighlight %}

This is not the most efficient code that can do this but the cleanest one that I could come up with. You might be able to get some performance boost to pass the tuple as out param.


#### Call the function using the tuple

I found a solution for this by googling.

{% highlight cpp %}
template<size_t N>
struct Apply {
  template<typename F, typename T, typename... A>
  static inline auto apply(F&& f, T&& t, A&&... a)
    -> decltype(Apply<N-1>::apply(std::forward<F>(f),
                                  std::forward<T>(t),
                                  std::get<N-1>(std::forward<T>(t)),
                                  std::forward<A>(a)...))
  {
    return Apply<N-1>::apply(std::forward<F>(f),
                             std::forward<T>(t),
                             std::get<N-1>(std::forward<T>(t)),
                             std::forward<A>(a)...);
  }
};

template<>
struct Apply<0> {
  template<typename F, typename T, typename... A>
  static inline auto apply(F&& f, T&&, A&&... a)
    -> decltype(std::forward<F>(f)(std::forward<A>(a)...))
  {
    return std::forward<F>(f)(std::forward<A>(a)...);
  }
};

template<typename F, typename T>
inline auto apply(F&& f, T&& t)
  -> decltype(Apply<std::tuple_size<typename std::decay<T>::type>::value>::apply(std::forward<F>(f), std::forward<T>(t)))
{
  return Apply<std::tuple_size<typename std::decay<T>::type>::value>::apply(
      std::forward<F>(f), std::forward<T>(t));
}
{% endhighlight %}

See details in <http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3915.pdf> and <http://stackoverflow.com/a/12650100>. The second link has the version for C++14 too.

#### Solution

{% highlight cpp %}
template <class R, class... Ps>
void functionx_impl(sqlite3_context* ctx, int nargs, sqlite3_value** values)
{
  context c(ctx, nargs, values);
  auto f = static_cast<std::function<R (Ps...)>*>(sqlite3_user_data(ctx));
  c.result(apply(*f, c.to_tuple<Ps...>()));
}
{% endhighlight %}