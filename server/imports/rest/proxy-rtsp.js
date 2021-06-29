import cp from 'child_process';
import { _ } from 'meteor/underscore';

export const proxyRtsp = (req, res) => {
	const url = 'rtsp://freja.hiof.no:1935/rtplive/definst/hessdalen03.stream';
	let active = true;
	let jpg = Buffer.from('');
	const ffmpeg = cp.spawn('ffmpeg', ['-loglevel', 'quiet', '-rtsp_transport', 'http', '-i', url, '-filter:v', 'fps=3', '-f', 'singlejpeg', 'pipe:1']);

	res.writeHead(200, {
		'Cache-Control': 'no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0',
		'Pragma': 'no-cache',
		'Connection': 'close',
		'Content-Type': 'multipart/x-mixed-replace;boundary=boundarydonotcross',
	});

	ffmpeg.stderr.on('data', data => {
		console.warn(data.toString());
	});

	ffmpeg.stdout.on('data', data => {
		if (!active) return;


		if (data.length > 1) {
			jpg = Buffer.concat([jpg, data]);

			const offset = data[data.length - 2].toString(16), offset2 = data[data.length - 1].toString(16);

			if (offset === 'ff' && offset2 === 'd9') {
				// console.log('Flush', jpg.length, 'bytes');
				res.write(`--boundarydonotcross\nContent-Type: image/jpeg\nContent-length: ${jpg.length}\n\n`);
				res.write(jpg);
				res.write('\n');
				jpg = Buffer.from('');
			}
		}

	});

	ffmpeg.on('close', () => {
		if (!active) return;
		console.log('ok');
		res.end();
	});

	res.on('close', () => {
		active = false;
		ffmpeg.kill();
	});
};