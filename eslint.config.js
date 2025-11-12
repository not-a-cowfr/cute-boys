import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

/** @type { import("eslint").Linter.Config } */
export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	...svelte.configs.prettier,
	prettier,
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			],
			'svelte/no-at-html-tags': 'off'
		}
	},
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2017,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteFeatures: {
					experimentalGenerics: true
				},
				svelteConfig
			}
		}
	},
	{
		rules: {
			'svelte/no-useless-mustaches': 'off'
		}
	},
	{
		ignores: [
			'**/.DS_Store',
			'**/node_modules/',
			'**/build/',
			'**/.svelte-kit/',
			'**/package/',
			'**/.env',
			'**/.env.*',
			'**/bun.lock',
			'**/NotEnoughUpdates-REPO/',
			'**/static/',
			'**/cache/'
		]
	}
);
