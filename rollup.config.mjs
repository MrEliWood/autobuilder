import typescript from '@rollup/plugin-typescript';
import commonJs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/index.cjs.js',
				format: 'cjs',
				sourcemap: true
			},
			{
				file: 'dist/index.esm.js',
				format: 'esm',
				sourcemap: true
			}
		],
		external: [],
		plugins: [
			typescript(),
			commonJs(), // exports
			json(), // imports
			terser() // minify
		]
	},
	{
		input: './dist/dts/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'es' }],
		plugins: [
			dts() // .d.ts
		]
	}
];
