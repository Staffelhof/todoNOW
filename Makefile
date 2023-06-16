react-build:
	npm run build
react-start:
	npm start
server-start:
	node server/index.js
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
install:
	npm ci