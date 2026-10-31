class TrieNode {
    children = new Map<string, TrieNode>();
    isEnd = false;
}

export class Trie {
    private root = new TrieNode();
    private _size = 0;

    get size(): number {
        return this._size;
    }
    
    insert(word: string): void {
        let node = this.root;
        for (const ch of word) {
            let next = node.children.get(ch);
            if (!next) {
                next = new TrieNode();
                node.children.set(ch, next);
            }
            node = next;
        }

        if (!node.isEnd) {
            node.isEnd = true;
            this._size++;
        }
    }

    search(word: string): boolean {
        return this.walk(word)?.isEnd ?? false;
    }

    startsWith(prefix: string): boolean {
        return this.walk(prefix) !== null;
    }

    autocomplete(prefix: string, limit = Infinity): string[] {
        const start = this.walk(prefix);
        const results: string[] = [];
        if (!start) return results;

        const dfs = (node: TrieNode, path: string): void => {
            if (results.length >= limit) return;
            if (node.isEnd) results.push(path);
            for (const [ch, child] of node.children) {
                if (results.length >= limit) return;
                dfs(child, path + ch);
            }
        };

        dfs(start, prefix);
        return results;
    };

    delete(word: string): boolean {
        const chars = [...word];

        const remove = (node: TrieNode, i: number): boolean => {
            if (i === chars.length) {
                if (!node.isEnd) return false;
                node.isEnd = false;
                return true;
            }
            const child = node.children.get(chars[i]);
            if (!child) return false;
            const removed = remove(child, i + 1);
            if (removed && !child.isEnd && child.children.size === 0) {
                node.children.delete(chars[i]);
            }
            return removed;
        }

        const removed = remove(this.root, 0);
        if (removed) this._size--;
        return removed;
    }

    private walk(s: string): TrieNode | null {
        let node = this.root;
        for (const ch of s) {
            const next = node.children.get(ch);
            if (!next) return null;
            node = next;
        }
        return node;
    }
}

const trie = new Trie();
const data = ["car", "cat", "cart", "dog"];
data.forEach((w) => trie.insert(w));

console.log(trie.search("car"));
console.log(trie.search("ca"));
console.log(trie.startsWith("ca"));
console.log(trie.autocomplete("ca"));
trie.delete("car");
console.log(trie.search("car"));       // false
console.log(trie.search("cart"));      // true (shared prefix kept)
console.log(trie.size);