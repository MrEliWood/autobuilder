import { watch } from 'fs';
import { exec } from 'child_process';

const watchDirectory = (directory: string = './') => {
	console.log(' 01 ');
	console.log(' 🏗️  autobuilder is watching this directory for changes');
	console.log(' ');
	console.log(' ');

	const ac = new AbortController();

	const options = {
		persistent: true,
		recursive: true,
		signal: ac.signal
	};

	watch(directory, options, async (eventType, filename) => {
		if (filename?.includes('node_modules')) return;
		if (filename?.includes('dist')) return;
		if (filename?.includes('lib')) return;

		console.log(' ');
		console.log(' 🏗️  autobuilder detected changes to ' + filename);
		console.log(' 🏗️  building...');
		console.log(' ');
		console.log(' ');

		ac.abort();
		await new Promise(() => exec('npm run build'));
		watchDirectory(directory);
	});
};

watchDirectory();

export default watchDirectory;
