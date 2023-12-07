export DIR_WORKSPACE := build/workspace

# --
# -- Testing
# --

.PHONY: \
	test \
	test.watch \
	test.coverage.open

test:
	npx vitest run \
		--config vitest.config.ts \
		--coverage \
		--reporter verbose \
		--segfault-retry 3

test.watch:
	npx vitest watch \
		--config vitest.config.ts \
		--reporter verbose \
		--segfault-retry 3

test.coverage.open:
	open build/coverage/index.html

# --
# -- Commit Linting
# --

.PHONY: \
	commit.test

commit.test:
	echo "chore: foobar" | npx --no-install commitlint --verbose

# --
# -- Code Formatting
# --

.PHONY: \
	code \
	code.fix

code:
	npx eslint \
		--cache \
		--cache-location .eslintcache \
		--format codeframe \
		--ext .ts \
			./src

code.fix:
	npx eslint \
		--cache \
		--cache-location .eslintcache \
		--fix \
		--format codeframe \
		--ext .ts \
			./src

# --
# -- React
# --

.PHONY: \
	local \
	storybook

local:
	npm run dev

storybook:
	npm run storybook
