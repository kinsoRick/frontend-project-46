install:
	npm ci

test:
	npm run test

test-coverage:
	npm run coverage

publish:
	npm publish --dry-run

lint:
	npm run lint

help:
	node bin/gendiff.js --help