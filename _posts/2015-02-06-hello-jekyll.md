---
layout: post
title: "Hello Jekyll"
description: ""
category: 
tags: [jekyll]
---
{% include JB/setup %}

여기저기 둘러보다 [깔끔한 블로그](http://pyrasis.com/)를 하나 발견했는데 powered by에 [Jeykll](https://github.com/jekyll/jekyll)이 있길래 한번 만들어 봤습니다.
theme 수정하는 것도 간단하고 무엇보다 파일들이 전부 버전 관리가 되니 무척 좋은 것 같아요.
<http://ideathinking.com> 도메인을 이걸로 바꿔야하나 고민되네요.

여기서부터 아래는 markdown syntax 연습입니다.

{% highlight cpp %}
template <class... Ts>
std::tuple<Ts...> get_columns(typename convert<Ts>::to_int... idxs) const {
  return std::make_tuple(get(idxs, Ts())...);
}
{% endhighlight %}

> Blockquotes

### Header 3

#### Header 4

* Red
* Green
* Blue

1. First
1. Second
1. Third
