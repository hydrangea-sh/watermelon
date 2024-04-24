import fs from "node:fs";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { GifEncoder } from "@skyra/gifenc";
import type { User } from "discord.js";
import { GifCodec, type GifFrame } from "gifwrap";

export async function createPatGif(user: User): Promise<Buffer> {
	const frames = await breakGifIntoFrames("./src/assets/pat.gif");
	console.log(`The GIF has ${frames.length} frames.`);

	const outputCanvas = createCanvas(112, 112);
	const outputCtx = outputCanvas.getContext("2d");

	const encoder = new GifEncoder(112, 112);
	const stream = encoder.createReadStream();

	encoder.setRepeat(0).setDelay(50).setQuality(10).setTransparent(0).start();

	// Load the background image
	const backgroundImage = await loadImage(user.displayAvatarURL());

	for (const frame of frames) {
		// Create a new canvas for each frame
		const frameCanvas = createCanvas(frame.bitmap.width, frame.bitmap.height);
		const frameCtx = frameCanvas.getContext("2d");

		// Create ImageData from the frame bitmap data
		const imageData = frameCtx.createImageData(
			frame.bitmap.width,
			frame.bitmap.height,
		);
		imageData.data.set(frame.bitmap.data);

		// Put the ImageData onto the frame canvas
		frameCtx.putImageData(imageData, 0, 0);

		// Clear the output canvas before drawing the next frame
		outputCtx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);

		// Draw the background image onto the output canvas
		outputCtx.drawImage(
			backgroundImage,
			0,
			0,
			outputCanvas.width,
			outputCanvas.height,
		);

		// Draw the frame canvas onto the output canvas
		outputCtx.drawImage(
			frameCanvas,
			0,
			0,
			outputCanvas.width,
			outputCanvas.height,
		);

		const outputImageData = outputCtx.getImageData(
			0,
			0,
			outputCanvas.width,
			outputCanvas.height,
		);
		encoder.addFrame(outputImageData.data);
	}

	encoder.finish();

	// Collect the GIF data chunks from the readable stream
	const chunks: Buffer[] = [];
	for await (const chunk of stream) {
		chunks.push(chunk);
	}

	return Buffer.concat(chunks);
}

async function breakGifIntoFrames(gifPath: string) {
	const gifData = fs.readFileSync(gifPath);
	const codec = new GifCodec();
	const gifFrames: GifFrame[] = [];
	const sourceGif = await codec.decodeGif(gifData);
	for (const frame of sourceGif.frames) {
		gifFrames.push(frame);
	}
	return gifFrames;
}
