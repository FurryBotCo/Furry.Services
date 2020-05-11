import phin from "phin";
import * as pkg from "./package.json";

class ShortURL {
	id: string;
	url: string;
	linkNumber: number;
	createdTimestamp: number;
	created: string;
	length: number;
	link: string;
	constructor(data: {
		[k in keyof ShortURL]: any;
	}) {
		this.id = data.id;
		this.url = data.url;
		this.linkNumber = data.linkNumber;
		this.createdTimestamp = data.createdTimestamp;
		this.created = data.created;
		this.length = data.length;
		this.link = data.length;
	}
}

class APIError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = "API Error";
	}
}

export = class FurryServicesAPI {
	private userAgent: string;
	private baseURL: string;
	constructor(userAgent?: string) {
		this.userAgent = userAgent || `FurryServicesAPI/${pkg.version} (https://github.com/FurryBotCo/Furry.Services)`;
		this.baseURL = "https://r.furry.services";
	}

	async fetchCode(code: string) {
		const r = await phin({
			method: "GET",
			url: `${this.baseURL}/${code}.json`,
			headers: {
				"User-Agent": this.userAgent
			}
		});
		let b;
		try {
			b = JSON.parse(r.body.toString());
		} catch (e) {
			b = r.body.toString();
		}

		if (r.statusCode !== 200 || !b.success) throw new APIError(`${r.statusCode} ${r.statusMessage}: ${r.body}`);

		return new ShortURL(b);
	}

	async shortenURL(url: string) {
		const r = await phin({
			method: "POST",
			url: `${this.baseURL}/create?url=${url}`,
			headers: {
				"User-Agent": this.userAgent
			}
		});
		let b;
		try {
			b = JSON.parse(r.body.toString());
		} catch (e) {
			b = r.body.toString();
		}

		if (r.statusCode !== 200 || !b.success) throw new APIError(`${r.statusCode} ${r.statusMessage}: ${r.body}`);

		return new ShortURL(b);
	}

	async fetchURL(url: string) {
		const r = await phin({
			method: "POST",
			url: `${this.baseURL}/get?url=${url}`,
			headers: {
				"User-Agent": this.userAgent
			}
		});
		let b;
		try {
			b = JSON.parse(r.body.toString());
		} catch (e) {
			b = r.body.toString();
		}

		if (r.statusCode !== 200 || !b.success) throw new APIError(`${r.statusCode} ${r.statusMessage}: ${r.body}`);

		return new ShortURL(b);
	}

	async fetchNumber(url: string) {
		const r = await phin({
			method: "POST",
			url: `${this.baseURL}/get?number=${url}`,
			headers: {
				"User-Agent": this.userAgent
			}
		});
		let b;
		try {
			b = JSON.parse(r.body.toString());
		} catch (e) {
			b = r.body.toString();
		}

		if (r.statusCode !== 200 || !b.success) throw new APIError(`${r.statusCode} ${r.statusMessage}: ${r.body}`);

		return new ShortURL(b);
	}
};
