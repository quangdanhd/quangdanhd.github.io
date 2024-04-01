##@ General order_laravel
.DEFAULT_GOAL := help
.PHONY: help
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "Usage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
##@ Development
2: ## browser-sync
	npx browser-sync start --config bs-config.js
3: ## browser-sync with ip: make 3 a=
	npx browser-sync start --config bs-config.js --address $(a)
g: ## gulp
	gulp
##@ Format
c: ## prettier check
	prettier --check .
w: ## prettier write
	prettier --write .