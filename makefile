full: deps minify test

deps:
	@npm install

test:
	@node query.test.js

minify:
	@./node_modules/uglify-js/bin/uglifyjs query.js -o query.min.js -c -m --comments
