# [useless μicro-services](https://ums.glitch.me/)

This is a small collection of pretty useless web micro-services. They can have a purpose if you find one for them. Apart from that, this is more of a fun project for a custom API. Access them via the navbar on top, or go to API and find out how to access these tools using requests to the API from your website.

### Client host

<https://ums.glitch.me/>

### Contains:

- [x] Timestamp service with input for custom natural language, ISO and unixtime
- [x] Header parser with info for IP, OS and Language
- [x] URL shortener
- [ ] Image search abstraction layer
- [ ] Uploaded file metadata

### TODO:

- [ ] add the remaining services
- [x] add info about using the API
- [x] get running online
- [x] add CORS
- [ ] prettify?
- [x] make a bundle for the client end dependencies (browserify)

## How to make calls to API:

### Timestamp

#### Endpoint:
<https://ums.glitch.me/api/timestamp/>
##### GET
Simply send a GET request to the endpoint with the natural/ISO/unixtime time at the end. If it's invalid, it will return the same JSON object, but with `null` as values.
##### Sample:
<https://ums.glitch.me/api/timestamp/1991 02 19>
**returns**
```javascript
{
	"natural": "19 of February, 1991",
	"unixtime": 666921600
}
```

### Header Parser

#### Endpoint:
<https://ums.glitch.me/api/whoami/>

##### GET
Simply send a GET request to the endpoint, and the response will be a JSON object as such:
```javascript
{
	"ip": "12.3.456.789",
	"lang": "en-GB",
	"os": "Windows NT 10.0; Win64; x64"
}
```

### URL Shortener
#### Endpoint:
<https://ums.glitch.me/api/encode/>
#### POST
If you want to create new shortened links using your own website, you can use this API service by sending a POST request to the above endpoint. The `Content-Type` should be set to `application/json`, and the format of the POST is as follows:
```javascript
{
	'url': 'http://example.com'
}
```
**Note:** valid URLs have a protocol of `http`, `https` and `ftp`.

The response will be of the following format:
```javascript
{
	'shortUrl': 'http://ums.glitch.me/l/4'
}
```

### comming soon...

