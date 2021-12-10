AURORA_TX_HASH=

.PHONY: build

build:
	yarn tsc

get-near-tx-hash:
	node build/./index.js --aurora-tx-hash="$(AURORA_TX_HASH)"
bridge-get-near-tx-hash-for-aurora-tx-hash:
	curl https://mainnet.aurora.dev -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params": ["$(AURORA_TX_HASH)"],"id":3}'
