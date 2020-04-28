vcl 4.0;

backend default {
  .host = "proxyserver";
  .port = "80";
}

sub vcl_deliver {
  if (obj.hits > 0) {
    set resp.http.X-Varnish-Cache = "Cached";
  }
  else {
    set resp.http.X-Varnish-Cache = "Not Cached";
  }
}