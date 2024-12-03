"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merkletreejs_1 = require("merkletreejs");
const keccak256_1 = __importDefault(require("keccak256"));
const units_1 = require("@ethersproject/units");
const ethers_1 = require("ethers");
let Tree;
let RootTree;
const addresses = [
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'
];
const amounts = [
    (0, units_1.parseEther)('10000'),
    (0, units_1.parseEther)('20000'),
    (0, units_1.parseEther)('40000'),
];
function getLeafs(addresses, amounts) {
    let abiCoder = new ethers_1.utils.AbiCoder();
    const leafs = addresses.map((address, i) => (0, keccak256_1.default)(abiCoder.encode(["address", "uint"], [address, amounts[i]._hex])));
    return leafs;
}
function getLeaf(address, amount) {
    let abiCoder = new ethers_1.utils.AbiCoder();
    const leaf = (0, keccak256_1.default)(abiCoder.encode(["address", "uint"], [address, amount._hex]));
    return leaf;
}
function createMerkleTree(_leafs) {
    Tree = new merkletreejs_1.MerkleTree(_leafs, keccak256_1.default, { sortPairs: true });
    RootTree = Tree.getHexRoot();
}
function writeRootTree() {
    let leafs = getLeafs(addresses, amounts);
    // console.log(leafs);
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
