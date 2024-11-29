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
function getLeafs(addresses, amounts) {
    let abiCoder = new ethers_1.utils.AbiCoder();
    const leafs = addresses.map((address, i) => (0, keccak256_1.default)(abiCoder.encode(["address", "uint"], [address, amounts[i]._hex])));
    return leafs;
}
function createMerkleTree(_leafs) {
    Tree = new merkletreejs_1.MerkleTree(_leafs, keccak256_1.default, { sortPairs: true });
    RootTree = Tree.getHexRoot();
}
function writeRootTree() {
    const addresses = [
        "0xB4f54ecfa062dF6216EBb2D6C76e852Fc46Edf99",
        "0xf60A421B87d07Bc8dFCB4603169797668227f0dB",
        "0x9b83f193B781cec168f6B1540C6A488dA2Bfb364"
    ];
    const amounts = [
        (0, units_1.parseEther)('10000'),
        (0, units_1.parseEther)('20000'),
        (0, units_1.parseEther)('40000'),
    ];
    let leafs = getLeafs(addresses, amounts);
    createMerkleTree(leafs);
    RootTree = Tree.getHexRoot();
    console.log(RootTree);
}
writeRootTree();
