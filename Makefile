install:
	npm ci

gendiff:
	node bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json

test:
	npm run test

lint:
	npm run lint

help:
	node bin/gendiff.js --help