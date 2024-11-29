import { MerkleTree } from "merkletreejs";
import  keccak256  from "keccak256";
import { parseEther } from '@ethersproject/units';
import { BigNumber, utils } from "ethers";

let Tree: MerkleTree;
let RootTree: string;

function getLeafs(addresses: string[], amounts: BigNumber[]) {
    let abiCoder = new utils.AbiCoder();
    const leafs = addresses.map((address, i) => keccak256( abiCoder.encode([ "address", "uint" ], [address, amounts[i]._hex]))); 
    return leafs;
}

function createMerkleTree(_leafs: Buffer[]) {
    Tree = new MerkleTree(_leafs, keccak256, {sortPairs: true});
    RootTree = Tree.getHexRoot();
}

function writeRootTree() {
    const addresses = [
        "0xB4f54ecfa062dF6216EBb2D6C76e852Fc46Edf99",
        "0xf60A421B87d07Bc8dFCB4603169797668227f0dB",
        "0x9b83f193B781cec168f6B1540C6A488dA2Bfb364"
    ];
    const amounts = [
        parseEther('10000'),
        parseEther('20000'),
        parseEther('40000'),
    ]

    let leafs = getLeafs(addresses, amounts);
    createMerkleTree(leafs);
    RootTree = Tree.getHexRoot();
    console.log(RootTree);
}

writeRootTree()