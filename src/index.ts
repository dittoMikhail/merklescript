import { MerkleTree } from "merkletreejs";
import  keccak256  from "keccak256";
import { parseEther } from '@ethersproject/units';
import { BigNumber, utils } from "ethers";

let Tree: MerkleTree;
let RootTree: string;

const addresses = [
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'
]
const amounts = [
    parseEther('10000'),
    parseEther('20000'),
    parseEther('40000'),
]

function getLeafs(addresses: string[], amounts: BigNumber[]) {
    let abiCoder = new utils.AbiCoder();
    const leafs = addresses.map((address, i) => keccak256( abiCoder.encode([ "address", "uint" ], [address, amounts[i]._hex]))); 
    return leafs;
}

function getLeaf(address: string, amount: BigNumber) {
    let abiCoder = new utils.AbiCoder();
    const leaf = keccak256(abiCoder.encode([ "address", "uint" ], [address, amount._hex])); 
    return leaf;
}

function createMerkleTree(_leafs: Buffer[]) {
    Tree = new MerkleTree(_leafs, keccak256, {sortPairs: true});
    RootTree = Tree.getHexRoot();
}

function writeRootTree() {
    let leafs = getLeafs(addresses, amounts);
    createMerkleTree(leafs);
    RootTree = Tree.getHexRoot();
    console.log(RootTree);
}

function showProofArray() {
    const proofsOne = Tree.getHexProof(getLeaf(addresses[0], amounts[0]));
    console.log("Proofs 1", proofsOne);
    const proofsTwo = Tree.getHexProof(getLeaf(addresses[1], amounts[1]));
    console.log("Proofs 2", proofsTwo);
    const proofsThree = Tree.getHexProof(getLeaf(addresses[2], amounts[2]));
    console.log("Proofs 3", proofsThree);
}

writeRootTree();
showProofArray();