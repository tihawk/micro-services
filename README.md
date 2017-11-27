# [useless μicro-services](https://ums.glitch.me/)

This is a small collection of pretty useless web micro-services. They can have a purpose if you find one for them. Apart from that, this is more of a fun project for a custom API. Access them via the navbar on top, or go to API and find out how to access these tools using requests to the API from your website.

### Client host

<https://ums.glitch.me/>

### Contains:

- [x] Timestamp service with input for custom natural language, ISO and unixtime
- [x] Header parser with info for IP, OS and Language
- [x] URL shortener
- [x] Image search abstraction layer
- [x] Uploaded file metadata

### TODO:

- [x] add the remaining services
- [x] add info about using the API
- [x] get running online
- [x] add CORS
- [ ] add client side for recent image searches
- [ ] prettify?
- [x] make a bundle for the client end dependencies (browserify)

## How to make calls to API:

### Timestamp

#### Endpoint:
<https://ums.glitch.me/api/timestamp/>

##### GET
Simply send a GET request to the endpoint with the natural/ISO/unixtime time at the end. If it's invalid, it will return the same JSON object, but with `null` as values.

##### Sample:
<https://ums.glitch.me/api/timestamp/1991%2002%2019>
returns:
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

### Image Search Abstraction Layer

#### Search Endpoint:
<https://ums.glitch.me/api/imagesearch/>

#### GET
To GET images, send a request to the above endpoint, with a query of the format `<search term>?offset=<starting index>`, where the offset is optional. For example `https://ums.glitch.me/api/imagesearch/lolcat?offset=10`. The response will take the format of an array of 10 objects like the one below:
```javascript
[{
	"url": "http://steveangello.com/boss.jpg",
	"type": "image/jpeg",
	"width": 1024,
	"height": 768,
	"size": 102451,
	"thumbnail": {
		"url": "http://steveangello.com/thumbnail.jpg",
		"width": 512,
		"height": 512
	}
}]
```

#### Recent Searches Endpoint:
<https://ums.glitch.me/api/recentsearches/>

#### GET
Upon sending a GET request to the above endpoint, a list of the last ten searches is sent back in a JSON format consisting of an array of 10 objects like this one:
```javascript
[{
"_id": 174,
"updatedAt": "2017-11-27T14:24:10.786Z",
"createdAt": "2017-11-27T14:24:10.786Z",
"searchTerm": "pokemon",
"__v": 0
}]
```

