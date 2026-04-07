.PHONY: install dev dev-server dev-client build clean lint typecheck help

# ──────────────────────────────────────────────
# Token Standards — Makefile
# ──────────────────────────────────────────────

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

# ── Install ──────────────────────────────────

install: ## Install all dependencies (server + client)
	cd server && npm install
	cd client && npm install

# ── Development ──────────────────────────────

dev: ## Run server and client concurrently
	npx -y concurrently -n server,client -c blue,green \
		"cd server && npm run dev" \
		"cd client && npm run dev"

dev-server: ## Run server only
	cd server && npm run dev

dev-client: ## Run client only
	cd client && npm run dev

# ── Build ────────────────────────────────────

build: ## Build client for production
	cd client && npm run build

build-server: ## Compile server TypeScript
	cd server && npx tsc

# ── Quality ──────────────────────────────────

test: ## Run all tests (server + client)
	cd server && npm test
	cd client && npm test

test-server: ## Run server tests only
	cd server && npm test

test-client: ## Run client tests only
	cd client && npm test

test-watch: ## Run tests in watch mode
	npx -y concurrently -n server,client -c blue,green \
		"cd server && npm run test:watch" \
		"cd client && npm run test:watch"

typecheck: ## Type-check server and client
	cd server && npx tsc --noEmit
	cd client && npx vue-tsc --noEmit

# ── Clean ────────────────────────────────────

clean: ## Remove build artifacts and node_modules
	rm -rf node_modules server/node_modules client/node_modules
	rm -rf server/dist client/dist
