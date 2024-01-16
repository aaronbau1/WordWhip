import { validWords } from "../data";

interface TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = this.createTrieNode();
  }

  private createTrieNode(): TrieNode {
    return { children: {}, isEndOfWord: false };
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = this.createTrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }
}

//initialize Trie with valid words
const trie = new Trie();
validWords.forEach((word) => trie.insert(word));

export default trie;

