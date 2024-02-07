import { watch } from 'fs';
import { exec } from 'child_process';

const watchDirectory = (directory: string = './') => {
	console.log('🏗️  autobuilder is watching this directory for changes');

	const ac = new AbortController();

	const options = {
		persistent: true,
		recursive: true,
		signal: ac.signal
	};

	watch(directory, options, (eventType, filename) => {
		if (filename?.includes('node_modules')) return;
		if (filename?.includes('dist')) return;
		if (filename?.includes('lib')) return;

		console.log('🏗️  autobuilder detected changes to ' + filename);
		console.log('🏗️  building...');

		ac.abort();
		exec('npm run build');
		watchDirectory(directory);
	});
};

watchDirectory();

export default watchDirectory;
