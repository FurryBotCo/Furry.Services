# Furry.Services API
This is an api wrapper built for the [furry.services](https://furry.services) redirection api. 

The official documentation for this can be found [here](https://r.furry.services/explination.txt).

## JavaScript Example:
```js
const FurryServicesAPI = require("furry.services");
// User agent (first param) is not required.
const FSAPI = new FurryServicesAPI("SomeUserAgent/1.0.0");
FSAPI.shortenURL("https://furry.bot").then(short => console.log(short));
```

## TypeScript Example:
```ts
import FurryServicesAPI from "furry.services";
// User agent (first param) is not required.
const FSAPI = new FurryServicesAPI("SomeUserAgent/1.0.0");
FSAPI.shortenURL("https://furry.bot").then(short => console.log(short));
```

The return of the functions is this structure (using the class as an example):
```ts
class ShortURL {
	id: string;
	url: string;
	linkNumber: number;
	createdTimestamp: number;
	created: string;
	length: number;
    link: string;
}
```
`id` is the code of the short link, `url` is where it goes, `linkNumber` is our internal database number for this link, `createdTimestamp` is the epoch at which it was created, `created` is the same as last, but an ISO string, `length` is the length of the url, and `link` is the full redirect link (includes https://r.furry.services).
