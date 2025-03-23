// treeCodeExamples.ts
interface CodeExamples {
  cpp: string;
  js: string;
  java: string;
  py: string;
}

 export const treeCodeExamples: Record<string, Record<string, CodeExamples>> = {
  BST: {
    insert: {
      cpp: `void insertBST(Node* &root, int value) {
  if (!root) {
    root = new Node(value);
    return;
  }
  if (value < root->value)
    insertBST(root->left, value);
  else
    insertBST(root->right, value);
}`,
      js: `function insertBST(root, value) {
  if (!root) return { value, left: null, right: null };
  if (value < root.value)
    root.left = insertBST(root.left, value);
  else
    root.right = insertBST(root.right, value);
  return root;
}`,
      java: `class Node {
  int value;
  Node left, right;
  Node(int value) { this.value = value; }
}
void insertBST(Node root, int value) {
  if (root == null) return new Node(value);
  if (value < root.value)
    root.left = insertBST(root.left, value);
  else
    root.right = insertBST(root.right, value);
  return root;
}`,
      py: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insertBST(root, value):
    if not root:
        return Node(value)
    if value < root.value:
        root.left = insertBST(root.left, value)
    else:
        root.right = insertBST(root.right, value)
    return root`,
    },
    delete: {
      cpp: `Node* deleteBST(Node* root, int value) {
  if (!root) return nullptr;
  if (value < root->value)
    root->left = deleteBST(root->left, value);
  else if (value > root->value)
    root->right = deleteBST(root->right, value);
  else {
    if (!root->left) return root->right;
    if (!root->right) return root->left;
    Node* minNode = findMin(root->right);
    root->value = minNode->value;
    root->right = deleteBST(root->right, minNode->value);
  }
  return root;
}`,
      js: `function deleteBST(root, value) {
  if (!root) return null;
  if (value < root.value)
    root.left = deleteBST(root.left, value);
  else if (value > root.value)
    root.right = deleteBST(root.right, value);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let minNode = findMin(root.right);
    root.value = minNode.value;
    root.right = deleteBST(root.right, minNode.value);
  }
  return root;
}`,
      java: `Node deleteBST(Node root, int value) {
  if (root == null) return null;
  if (value < root.value)
    root.left = deleteBST(root.left, value);
  else if (value > root.value)
    root.right = deleteBST(root.right, value);
  else {
    if (root.left == null) return root.right;
    if (root.right == null) return root.left;
    Node minNode = findMin(root.right);
    root.value = minNode.value;
    root.right = deleteBST(root.right, minNode.value);
  }
  return root;
}`,
      py: `def deleteBST(root, value):
    if not root:
        return None
    if value < root.value:
        root.left = deleteBST(root.left, value)
    elif value > root.value:
        root.right = deleteBST(root.right, value)
    else:
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        minNode = findMin(root.right)
        root.value = minNode.value
        root.right = deleteBST(root.right, minNode.value)
    return root`,
    },
    search: {
      cpp: `bool searchBST(Node* root, int value) {
  if (!root) return false;
  if (root->value == value) return true;
  if (value < root->value)
    return searchBST(root->left, value);
  return searchBST(root->right, value);
}`,
      js: `function searchBST(root, value) {
  if (!root) return false;
  if (root.value === value) return true;
  if (value < root.value)
    return searchBST(root.left, value);
  return searchBST(root.right, value);
}`,
      java: `boolean searchBST(Node root, int value) {
  if (root == null) return false;
  if (root.value == value) return true;
  if (value < root.value)
    return searchBST(root.left, value);
  return searchBST(root.right, value);
}`,
      py: `def searchBST(root, value):
    if not root:
        return False
    if root.value == value:
        return True
    if value < root.value:
        return searchBST(root.left, value)
    return searchBST(root.right, value)`,
    },
    update: {
      cpp: `void updateBST(Node* &root, int target, int newValue) {
  root = deleteBST(root, target);
  insertBST(root, newValue);
}`,
      js: `function updateBST(root, target, newValue) {
  root = deleteBST(root, target);
  return insertBST(root, newValue);
}`,
      java: `Node updateBST(Node root, int target, int newValue) {
  root = deleteBST(root, target);
  return insertBST(root, newValue);
}`,
      py: `def updateBST(root, target, newValue):
    root = deleteBST(root, target)
    return insertBST(root, newValue)`,
    },
    sort: {
      cpp: `void inorder(Node* root, vector<int>& result) {
  if (!root) return;
  inorder(root->left, result);
  result.push_back(root->value);
  inorder(root->right, result);
}
vector<int> sortBST(Node* root) {
  vector<int> result;
  inorder(root, result);
  return result;
}`,
      js: `function inorder(root, result) {
  if (!root) return;
  inorder(root.left, result);
  result.push(root.value);
  inorder(root.right, result);
}
function sortBST(root) {
  const result = [];
  inorder(root, result);
  return result;
}`,
      java: `void inorder(Node root, List<Integer> result) {
  if (root == null) return;
  inorder(root.left, result);
  result.add(root.value);
  inorder(root.right, result);
}
List<Integer> sortBST(Node root) {
  List<Integer> result = new ArrayList<>();
  inorder(root, result);
  return result;
}`,
      py: `def inorder(root, result):
    if not root:
        return
    inorder(root.left, result)
    result.append(root.value)
    inorder(root.right, result)

def sortBST(root):
    result = []
    inorder(root, result)
    return result`,
    },
  },
  AVL: {
    insert: {
      cpp: `Node* insertAVL(Node* root, int value) {
  if (!root) return new Node(value);
  if (value < root->value)
    root->left = insertAVL(root->left, value);
  else
    root->right = insertAVL(root->right, value);
  root->height = max(height(root->left), height(root->right)) + 1;
  int balance = getBalance(root);
  if (balance > 1 && value < root->left->value) return rotateRight(root);
  if (balance < -1 && value > root->right->value) return rotateLeft(root);
  if (balance > 1 && value > root->left->value) {
    root->left = rotateLeft(root->left);
    return rotateRight(root);
  }
  if (balance < -1 && value < root->right->value) {
    root->right = rotateRight(root->right);
    return rotateLeft(root);
  }
  return root;
}`,
      js: `function insertAVL(root, value) {
  if (!root) return { value, left: null, right: null, height: 1 };
  if (value < root.value)
    root.left = insertAVL(root.left, value);
  else
    root.right = insertAVL(root.right, value);
  root.height = Math.max(height(root.left), height(root.right)) + 1;
  const balance = getBalance(root);
  if (balance > 1 && value < root.left.value) return rotateRight(root);
  if (balance < -1 && value > root.right.value) return rotateLeft(root);
  if (balance > 1 && value > root.left.value) {
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }
  if (balance < -1 && value < root.right.value) {
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }
  return root;
}`,
      java: `Node insertAVL(Node root, int value) {
  if (root == null) return new Node(value);
  if (value < root.value)
    root.left = insertAVL(root.left, value);
  else
    root.right = insertAVL(root.right, value);
  root.height = Math.max(height(root.left), height(root.right)) + 1;
  int balance = getBalance(root);
  if (balance > 1 && value < root.left.value) return rotateRight(root);
  if (balance < -1 && value > root.right.value) return rotateLeft(root);
  if (balance > 1 && value > root.left.value) {
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }
  if (balance < -1 && value < root.right.value) {
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }
  return root;
}`,
      py: `def insertAVL(root, value):
    if not root:
        return Node(value)
    if value < root.value:
        root.left = insertAVL(root.left, value)
    else:
        root.right = insertAVL(root.right, value)
    root.height = max(height(root.left), height(root.right)) + 1
    balance = getBalance(root)
    if balance > 1 and value < root.left.value:
        return rotateRight(root)
    if balance < -1 and value > root.right.value:
        return rotateLeft(root)
    if balance > 1 and value > root.left.value:
        root.left = rotateLeft(root.left)
        return rotateRight(root)
    if balance < -1 and value < root.right.value:
        root.right = rotateRight(root.right)
        return rotateLeft(root)
    return root`,
    },
    delete: {
      cpp: `Node* deleteAVL(Node* root, int value) {
  if (!root) return nullptr;
  if (value < root->value)
    root->left = deleteAVL(root->left, value);
  else if (value > root->value)
    root->right = deleteAVL(root->right, value);
  else {
    if (!root->left) return root->right;
    if (!root->right) return root->left;
    Node* minNode = findMin(root->right);
    root->value = minNode->value;
    root->right = deleteAVL(root->right, minNode->value);
  }
  root->height = max(height(root->left), height(root->right)) + 1;
  int balance = getBalance(root);
  if (balance > 1 && getBalance(root->left) >= 0) return rotateRight(root);
  if (balance > 1 && getBalance(root->left) < 0) {
    root->left = rotateLeft(root->left);
    return rotateRight(root);
  }
  if (balance < -1 && getBalance(root->right) <= 0) return rotateLeft(root);
  if (balance < -1 && getBalance(root->right) > 0) {
    root->right = rotateRight(root->right);
    return rotateLeft(root);
  }
  return root;
}`,
      js: `function deleteAVL(root, value) {
  if (!root) return null;
  if (value < root.value)
    root.left = deleteAVL(root.left, value);
  else if (value > root.value)
    root.right = deleteAVL(root.right, value);
  else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let minNode = findMin(root.right);
    root.value = minNode.value;
    root.right = deleteAVL(root.right, minNode.value);
  }
  root.height = Math.max(height(root.left), height(root.right)) + 1;
  const balance = getBalance(root);
  if (balance > 1 && getBalance(root.left) >= 0) return rotateRight(root);
  if (balance > 1 && getBalance(root.left) < 0) {
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }
  if (balance < -1 && getBalance(root.right) <= 0) return rotateLeft(root);
  if (balance < -1 && getBalance(root.right) > 0) {
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }
  return root;
}`,
      java: `Node deleteAVL(Node root, int value) {
  if (root == null) return null;
  if (value < root.value)
    root.left = deleteAVL(root.left, value);
  else if (value > root.value)
    root.right = deleteAVL(root.right, value);
  else {
    if (root.left == null) return root.right;
    if (root.right == null) return root.left;
    Node minNode = findMin(root.right);
    root.value = minNode.value;
    root.right = deleteAVL(root.right, minNode.value);
  }
  root.height = Math.max(height(root.left), height(root.right)) + 1;
  int balance = getBalance(root);
  if (balance > 1 && getBalance(root.left) >= 0) return rotateRight(root);
  if (balance > 1 && getBalance(root.left) < 0) {
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }
  if (balance < -1 && getBalance(root.right) <= 0) return rotateLeft(root);
  if (balance < -1 && getBalance(root.right) > 0) {
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }
  return root;
}`,
      py: `def deleteAVL(root, value):
    if not root:
        return None
    if value < root.value:
        root.left = deleteAVL(root.left, value)
    elif value > root.value:
        root.right = deleteAVL(root.right, value)
    else:
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        minNode = findMin(root.right)
        root.value = minNode.value
        root.right = deleteAVL(root.right, minNode.value)
    root.height = max(height(root.left), height(root.right)) + 1
    balance = getBalance(root)
    if balance > 1 and getBalance(root.left) >= 0:
        return rotateRight(root)
    if balance > 1 and getBalance(root.left) < 0:
        root.left = rotateLeft(root.left)
        return rotateRight(root)
    if balance < -1 and getBalance(root.right) <= 0:
        return rotateLeft(root)
    if balance < -1 and getBalance(root.right) > 0:
        root.right = rotateRight(root.right)
        return rotateLeft(root)
    return root`,
    },
    search: {
      cpp: `bool searchAVL(Node* root, int value) {
  if (!root) return false;
  if (root->value == value) return true;
  if (value < root->value)
    return searchAVL(root->left, value);
  return searchAVL(root->right, value);
}`,
      js: `function searchAVL(root, value) {
  if (!root) return false;
  if (root.value === value) return true;
  if (value < root.value)
    return searchAVL(root.left, value);
  return searchAVL(root.right, value);
}`,
      java: `boolean searchAVL(Node root, int value) {
  if (root == null) return false;
  if (root.value == value) return true;
  if (value < root.value)
    return searchAVL(root.left, value);
  return searchAVL(root.right, value);
}`,
      py: `def searchAVL(root, value):
    if not root:
        return False
    if root.value == value:
        return True
    if value < root.value:
        return searchAVL(root.left, value)
    return searchAVL(root.right, value)`,
    },
    update: {
      cpp: `void updateAVL(Node* &root, int target, int newValue) {
  root = deleteAVL(root, target);
  insertAVL(root, newValue);
}`,
      js: `function updateAVL(root, target, newValue) {
  root = deleteAVL(root, target);
  return insertAVL(root, newValue);
}`,
      java: `Node updateAVL(Node root, int target, int newValue) {
  root = deleteAVL(root, target);
  return insertAVL(root, newValue);
}`,
      py: `def updateAVL(root, target, newValue):
    root = deleteAVL(root, target)
    return insertAVL(root, newValue)`,
    },
    sort: {
      cpp: `void inorder(Node* root, vector<int>& result) {
  if (!root) return;
  inorder(root->left, result);
  result.push_back(root->value);
  inorder(root->right, result);
}
vector<int> sortAVL(Node* root) {
  vector<int> result;
  inorder(root, result);
  return result;
}`,
      js: `function inorder(root, result) {
  if (!root) return;
  inorder(root.left, result);
  result.push(root.value);
  inorder(root.right, result);
}
function sortAVL(root) {
  const result = [];
  inorder(root, result);
  return result;
}`,
      java: `void inorder(Node root, List<Integer> result) {
  if (root == null) return;
  inorder(root.left, result);
  result.add(root.value);
  inorder(root.right, result);
}
List<Integer> sortAVL(Node root) {
  List<Integer> result = new ArrayList<>();
  inorder(root, result);
  return result;
}`,
      py: `def inorder(root, result):
    if not root:
        return
    inorder(root.left, result)
    result.append(root.value)
    inorder(root.right, result)

def sortAVL(root):
    result = []
    inorder(root, result)
    return result`,
    },
  },
  Heap: {
    insert: {
      cpp: `void insertHeap(vector<int>& heap, int value) {
  heap.push_back(value);
  int idx = heap.size() - 1;
  while (idx > 0) {
    int parent = (idx - 1) / 2;
    if (heap[idx] > heap[parent]) {
      swap(heap[idx], heap[parent]);
      idx = parent;
    } else break;
  }
}`,
      js: `function insertHeap(heap, value) {
  heap.push(value);
  let idx = heap.length - 1;
  while (idx > 0) {
    let parent = Math.floor((idx - 1) / 2);
    if (heap[idx] > heap[parent]) {
      [heap[idx], heap[parent]] = [heap[parent], heap[idx]];
      idx = parent;
    } else break;
  }
}`,
      java: `void insertHeap(List<Integer> heap, int value) {
  heap.add(value);
  int idx = heap.size() - 1;
  while (idx > 0) {
    int parent = (idx - 1) / 2;
    if (heap.get(idx) > heap.get(parent)) {
      Collections.swap(heap, idx, parent);
      idx = parent;
    } else break;
  }
}`,
      py: `def insertHeap(heap, value):
    heap.append(value)
    idx = len(heap) - 1
    while idx > 0:
        parent = (idx - 1) // 2
        if heap[idx] > heap[parent]:
            heap[idx], heap[parent] = heap[parent], heap[idx]
            idx = parent
        else:
            break`,
    },
    delete: {
      cpp: `void deleteHeap(vector<int>& heap) {
  if (heap.empty()) return;
  heap[0] = heap.back();
  heap.pop_back();
  int idx = 0;
  while (true) {
    int left = 2 * idx + 1;
    int right = 2 * idx + 2;
    int largest = idx;
    if (left < heap.size() && heap[left] > heap[largest]) largest = left;
    if (right < heap.size() && heap[right] > heap[largest]) largest = right;
    if (largest == idx) break;
    swap(heap[idx], heap[largest]);
    idx = largest;
  }
}`,
      js: `function deleteHeap(heap) {
  if (!heap.length) return;
  heap[0] = heap.pop();
  let idx = 0;
  while (true) {
    let left = 2 * idx + 1;
    let right = 2 * idx + 2;
    let largest = idx;
    if (left < heap.length && heap[left] > heap[largest]) largest = left;
    if (right < heap.length && heap[right] > heap[largest]) largest = right;
    if (largest === idx) break;
    [heap[idx], heap[largest]] = [heap[largest], heap[idx]];
    idx = largest;
  }
}`,
      java: `void deleteHeap(List<Integer> heap) {
  if (heap.isEmpty()) return;
  heap.set(0, heap.remove(heap.size() - 1));
  int idx = 0;
  while (true) {
    int left = 2 * idx + 1;
    int right = 2 * idx + 2;
    int largest = idx;
    if (left < heap.size() && heap.get(left) > heap.get(largest)) largest = left;
    if (right < heap.size() && heap.get(right) > heap.get(largest)) largest = right;
    if (largest == idx) break;
    Collections.swap(heap, idx, largest);
    idx = largest;
  }
}`,
      py: `def deleteHeap(heap):
    if not heap:
        return
    heap[0] = heap.pop()
    idx = 0
    while True:
        left = 2 * idx + 1
        right = 2 * idx + 2
        largest = idx
        if left < len(heap) and heap[left] > heap[largest]:
            largest = left
        if right < len(heap) and heap[right] > heap[largest]:
            largest = right
        if largest == idx:
            break
        heap[idx], heap[largest] = heap[largest], heap[idx]
        idx = largest`,
    },
    search: {
      cpp: `bool searchHeap(vector<int>& heap, int value) {
  for (int val : heap)
    if (val == value) return true;
  return false;
}`,
      js: `function searchHeap(heap, value) {
  return heap.some(val => val === value);
}`,
      java: `boolean searchHeap(List<Integer> heap, int value) {
  return heap.contains(value);
}`,
      py: `def searchHeap(heap, value):
    return value in heap`,
    },
    update: {
      cpp: `void updateHeap(vector<int>& heap, int target, int newValue) {
  for (int i = 0; i < heap.size(); i++) {
    if (heap[i] == target) {
      heap[i] = newValue;
      // Re-heapify logic needed
      break;
    }
  }
}`,
      js: `function updateHeap(heap, target, newValue) {
  for (let i = 0; i < heap.length; i++) {
    if (heap[i] === target) {
      heap[i] = newValue;
      // Re-heapify logic needed
      break;
    }
  }
}`,
      java: `void updateHeap(List<Integer> heap, int target, int newValue) {
  for (int i = 0; i < heap.size(); i++) {
    if (heap.get(i) == target) {
      heap.set(i, newValue);
      // Re-heapify logic needed
      break;
    }
  }
}`,
      py: `def updateHeap(heap, target, newValue):
    for i in range(len(heap)):
        if heap[i] == target:
            heap[i] = newValue
            # Re-heapify logic needed
            break`,
    },
    sort: {
      cpp: `vector<int> sortHeap(vector<int> heap) {
  vector<int> result;
  while (!heap.empty()) {
    result.push_back(heap[0]);
    deleteHeap(heap);
  }
  return result;
}`,
      js: `function sortHeap(heap) {
  const result = [];
  while (heap.length) {
    result.push(heap[0]);
    deleteHeap(heap);
  }
  return result;
}`,
      java: `List<Integer> sortHeap(List<Integer> heap) {
  List<Integer> result = new ArrayList<>();
  while (!heap.isEmpty()) {
    result.add(heap.get(0));
    deleteHeap(heap);
  }
  return result;
}`,
      py: `def sortHeap(heap):
    result = []
    while heap:
        result.append(heap[0])
        deleteHeap(heap)
    return result`,
    },
  },
  Trie: {
    insert: {
      cpp: `void insertTrie(Node* root, string word) {
  Node* current = root;
  for (char c : word) {
    if (!current->children[c - 'a'])
      current->children[c - 'a'] = new Node();
    current = current->children[c - 'a'];
  }
  current->isEnd = true;
}`,
      js: `function insertTrie(root, word) {
  let current = root;
  for (let char of word) {
    if (!current.children[char])
      current.children[char] = { children: {} };
    current = current.children[char];
  }
  current.isEnd = true;
}`,
      java: `void insertTrie(Node root, String word) {
  Node current = root;
  for (char c : word.toCharArray()) {
    if (current.children[c - 'a'] == null)
      current.children[c - 'a'] = new Node();
    current = current.children[c - 'a'];
  }
  current.isEnd = true;
}`,
      py: `def insertTrie(root, word):
    current = root
    for char in word:
        if char not in current.children:
            current.children[char] = {}
        current = current.children[char]
    current['isEnd'] = True`,
    },
    search: {
      cpp: `bool searchTrie(Node* root, string word) {
  Node* current = root;
  for (char c : word) {
    if (!current->children[c - 'a']) return false;
    current = current->children[c - 'a'];
  }
  return current && current->isEnd;
}`,
      js: `function searchTrie(root, word) {
  let current = root;
  for (let char of word) {
    if (!current.children[char]) return false;
    current = current.children[char];
  }
  return current && current.isEnd;
}`,
      java: `boolean searchTrie(Node root, String word) {
  Node current = root;
  for (char c : word.toCharArray()) {
    if (current.children[c - 'a'] == null) return false;
    current = current.children[c - 'a'];
  }
  return current != null && current.isEnd;
}`,
      py: `def searchTrie(root, word):
    current = root
    for char in word:
        if char not in current.children:
            return False
        current = current.children[char]
    return 'isEnd' in current and current['isEnd']`,
    },
  },
};

export default treeCodeExamples;