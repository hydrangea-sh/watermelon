import { describe, expect, test } from "bun:test";
import { platforms } from "../../src/services/platforms";
import { replacer } from "../../src/services/embedService";

describe("replacer", () => {
	for (const platform of platforms) {
		test(`replaces ${platform.name} URLs correctly`, () => {
			const testUrl = `https://www.${platform.name
				.toLowerCase()
				.replace(" ", "")}.com/path/to/content`;
			const input = `Here is a link: ${testUrl}`;
			const expectedReplacement = platform.replacement(testUrl);
			const output = replacer(input);

			expect(output).toBe(`Here is a link: ${expectedReplacement}`);
		});
	}

	test("replaces multiple URLs from different platforms correctly", () => {
		const input = platforms
			.reduce((acc, platform, index) => {
				const testUrl = `https://www.${platform.name
					.toLowerCase()
					.replace(" ", "")}.com/path/${index}`;
				return `${acc} Visit ${platform.name}: ${testUrl}\n`;
			}, "")
			.trim();

		const expected = platforms
			.reduce((acc, platform, index) => {
				const originalUrl = `https://www.${platform.name
					.toLowerCase()
					.replace(" ", "")}.com/path/${index}`;
				const replacedUrl = platform.replacement(originalUrl);
				return `${acc} Visit ${platform.name}: ${replacedUrl}\n`;
			}, "")
			.trim();

		const output = replacer(input);
		expect(output).toBe(expected);
	});
});
