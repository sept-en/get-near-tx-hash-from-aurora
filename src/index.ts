import * as ethers from 'ethers';
import yargs from 'yargs';
import bs58 from 'bs58';

const AURORA_WEB3_ENDPOINT = 'https://mainnet.aurora.dev';


async function get_near_tx_hash_from_aurora_tx_hash() {
    const argv = yargs(process.argv.slice(2))
        .example('$0 --aurora-tx-hash 0xabcd..dcba', 'Get NEAR TX hash for the provided Aurora TX hash')
        .option('aurora-tx-hash', {
            string: true
        })
        .help('h')
        .alias('h', 'help')
        .argv;

    if (argv.auroraTxHash) {
        const url = AURORA_WEB3_ENDPOINT;
        const ethersProvider = new ethers.providers.StaticJsonRpcProvider(url);
        const receipt = await ethersProvider.send('eth_getTransactionReceipt', [argv.auroraTxHash]);
        const nearTxHash = bs58.encode(Buffer.from(receipt.nearTransactionHash.slice(2), 'hex'));
        const nearReceiptHash = bs58.encode(Buffer.from(receipt.nearReceiptHash.slice(2), 'hex'));

        console.log(`Aurora TX: ${argv.auroraTxHash}`);
        console.log(`NEAR TX Hash: ${nearTxHash}`);
        console.log(`NEAR Receipt Hash: ${nearReceiptHash}`);
        console.log(`NEAR TX link: https://explorer.near.org/transactions/${nearTxHash}`);
    } else {
        console.log("Error, Aurora TX hash is not provided");
    }
}

get_near_tx_hash_from_aurora_tx_hash()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
})

