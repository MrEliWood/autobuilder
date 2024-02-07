import { watch } from 'fs';
import { exec } from 'child_process';

const watchDirectory = (directory: string = './') => {
	console.log('');
	console.log('🏗️  autobuilder is watching this directory for changes');
	console.log('');

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

		console.log('');
		console.log('autobuilder detected changes to ' + filename);
		console.log('');
		console.log('  🏗️  building...');
		console.log('');

		logged = true;

		exec('npm run build', (error, stdout) => console.log(stdout));
	});
};

watchDirectory();

export default watchDirectory;
