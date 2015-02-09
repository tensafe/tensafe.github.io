var URL = document.URL.replace(window.location.hostname, 'idea-thinking.blogspot.com');
document.getElementById('404').innerHTML = '<a href="%%">%%</a>'.replace(/%%/g, URL);
