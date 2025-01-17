import type { VercelRequest, VercelResponse } from "@vercel/node";
import Fuse from "fuse.js";
import { createRequire } from "node:module";

import type { ExtendedPostInfo } from "types/index";

const require = createRequire(import.meta.url);
const searchIndex = require("./searchIndex.json");
const postIndex = Fuse.parseIndex(searchIndex.postIndex);
const collectionIndex = Fuse.parseIndex(searchIndex.collectionIndex);

const posts = searchIndex.posts;
const collections = searchIndex.collections;

const postFuse = new Fuse<ExtendedPostInfo>(
	posts,
	{
		threshold: 0.3,
		ignoreLocation: true,
		includeScore: true,
		ignoreFieldNorm: true,
	},
	postIndex,
);

const collectionFuse = new Fuse(
	collections,
	{
		threshold: 0.3,
		ignoreLocation: true,
		includeScore: true,
		ignoreFieldNorm: true,
	},
	collectionIndex,
);

export default async (req: VercelRequest, res: VercelResponse) => {
	// TODO: `pickdeep` only required fields
	const searchStr = req?.query?.query as string;
	if (!searchStr) {
		res.send({
			posts: [],
			totalPosts: 0,
			collections: [],
			totalCollections: 0,
		});
		return;
	}
	if (searchStr === "*") {
		res.send({
			posts,
			totalPosts: posts.length,
			collections,
			totalCollections: collections.length,
		});
		return;
	}
	const searchedPosts = postFuse.search(searchStr).map((item) => item.item);
	const searchedCollections = collectionFuse
		.search(searchStr)
		.map((item) => item.item);
	res.send({
		posts: searchedPosts,
		totalPosts: searchedPosts.length,
		collections: searchedCollections,
		totalCollections: searchedCollections.length,
	});
};
