import { watch } from 'fs';
import { exec } from 'child_process';

const watchDirectory = (directory: string = './') => {
	console.log('\x1b[90m');
	console.log('🏗️  autobuilder is watching this directory for changes');
	console.log('\x1b[0m');

	const ac = new AbortController();

	const options = {
		recursive: true,
		signal: ac.signal
	};

	let logged = false;

	watch(directory, options, (eventType, filename) => {
		if (filename?.includes('node_modules')) return;
		if (filename?.includes('dist')) return;
		if (filename?.includes('lib')) return;

		if (logged) {
			logged = false;
			return;
		}

		console.log('\x1b[90m');
		console.log('autobuilder noticed changes to ');
		console.log('\x1b[0m' + filename);
		console.log('\x1b[90m');
		console.log('  🏗️  building...');
		console.log('\x1b[0m');

		logged = true;

		exec('npm run build', (error, stdout, stderr) => {
			error && console.error(error);
			stdout && console.log(stdout);
			stderr && console.log(stderr);
		});
	});
};

watchDirectory();

export default watchDirectory;
