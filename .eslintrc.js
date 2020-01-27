module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'airbnb-base',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	settings:{
		"import/resolver":{
			"node":{
				"extensions": [".js", ".jsx", ".ts", ".tsx"]
			}
		}
	},
	rules: {
		"no-console": 0,
		"no-unused-vars": 0,
		"no-plusplus": 0,
		"no-tabs": 0,
		"no-mixed-spaces-and-tabs": 0,
		"consistent-return": 0,
		"max-len" : ["error", {code: 120, ignoreComments: true}],
	},
};
