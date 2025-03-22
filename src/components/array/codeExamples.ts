// codeExamples.ts
export const codeExamples = {
  insert: {
    javascript: `function insertElement(arr, value, index) {
    arr.splice(index, 0, value);
    return arr;
  }`,
    cpp: `vector<int> insertElement(vector<int> arr, int value, int index) {
    arr.insert(arr.begin() + index, value);
    return arr;
  }`,
    java: `ArrayList<Integer> insertElement(ArrayList<Integer> arr, int value, int index) {
    arr.add(index, value);
    return arr;
  }`,
    python: `def insertElement(arr, value, index):
    arr.insert(index, value)
    return arr`,
  },
  delete: {
    javascript: `function deleteElement(arr, index) {
    arr.splice(index, 1);
    return arr;
  }`, // Removed invalid HashMap line
    cpp: `vector<int> deleteElement(vector<int> arr, int index) {
    arr.erase(arr.begin() + index);
    return arr;
  }`,
    java: `ArrayList<Integer> deleteElement(ArrayList<Integer> arr, int index) {
    arr.remove(index);
    return arr;
  }`,
    python: `def deleteElement(arr, index):
    arr.pop(index)
    return arr`,
  },
  update: {
    javascript: `function updateElement(arr, index, value) {
    arr[index] = value;
    return arr;
  }`,
    cpp: `vector<int> updateElement(vector<int> arr, int index, int value) {
    arr[index] = value;
    return arr;
  }`,
    java: `ArrayList<Integer> updateElement(ArrayList<Integer> arr, int index, int value) {
    arr.set(index, value);
    return arr;
  }`,
    python: `def updateElement(arr, index, value):
    arr[index] = value
    return arr`,
  },
  traverse: {
    javascript: `function traverseArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
  }`,
    cpp: `void traverseArray(vector<int> arr) {
    for (int i = 0; i < arr.size(); i++) {
      cout << arr[i] << " ";
    }
  }`,
    java: `void traverseArray(ArrayList<Integer> arr) {
    for (int i = 0; i < arr.size(); i++) {
      System.out.print(arr.get(i) + " ");
    }
  }`,
    python: `def traverseArray(arr):
    for i in arr:
      print(i, end=" ")`,
  },
  merge: {
    javascript: `function mergeArrays(arr1, arr2) {
    return [...arr1, ...arr2];
  }`,
    cpp: `vector<int> mergeArrays(vector<int> arr1, vector<int> arr2) {
    arr1.insert(arr1.end(), arr2.begin(), arr2.end());
    return arr1;
  }`,
    java: `ArrayList<Integer> mergeArrays(ArrayList<Integer> arr1, ArrayList<Integer> arr2) {
    arr1.addAll(arr2);
    return arr1;
  }`,
    python: `def mergeArrays(arr1, arr2):
    return arr1 + arr2`,
  },
  split: {
    javascript: `function splitArray(arr, index) {
    return [arr.slice(0, index), arr.slice(index)];
  }`,
    cpp: `pair<vector<int>, vector<int>> splitArray(vector<int> arr, int index) {
    vector<int> arr1(arr.begin(), arr.begin() + index);
    vector<int> arr2(arr.begin() + index, arr.end());
    return {arr1, arr2};
  }`,
    java: `Pair<ArrayList<Integer>, ArrayList<Integer>> splitArray(ArrayList<Integer> arr, int index) {
    ArrayList<Integer> arr1 = new ArrayList<>(arr.subList(0, index));
    ArrayList<Integer> arr2 = new ArrayList<>(arr.subList(index, arr.size()));
    return new Pair<>(arr1, arr2);
  }`,
    python: `def splitArray(arr, index):
    return [arr[:index], arr[index:]]`,
  },
  reverse: {
    javascript: `function reverseArray(arr) {
    return arr.reverse();
  }`,
    cpp: `vector<int> reverseArray(vector<int> arr) {
    reverse(arr.begin(), arr.end());
    return arr;
  }`,
    java: `ArrayList<Integer> reverseArray(ArrayList<Integer> arr) {
    Collections.reverse(arr);
    return arr;
  }`,
    python: `def reverseArray(arr):
    return arr[::-1]`,
  },
  bubbleSort: {
    javascript: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }`,
    cpp: `vector<int> bubbleSort(vector<int> arr) {
    for (int i = 0; i < arr.size(); i++) {
      for (int j = 0; j < arr.size() - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          swap(arr[j], arr[j + 1]);
        }
      }
    }
    return arr;
  }`,
    java: `ArrayList<Integer> bubbleSort(ArrayList<Integer> arr) {
    for (int i = 0; i < arr.size(); i++) {
      for (int j = 0; j < arr.size() - i - 1; j++) {
        if (arr.get(j) > arr.get(j + 1)) {
          int temp = arr.get(j);
          arr.set(j, arr.get(j + 1));
          arr.set(j + 1, temp);
        }
      }
    }
    return arr;
  }`,
    python: `def bubbleSort(arr):
    for i in range(len(arr)):
      for j in range(len(arr) - i - 1):
        if arr[j] > arr[j + 1]:
          arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
  },
  selectionSort: {
    javascript: `function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
  }`,
    cpp: `vector<int> selectionSort(vector<int> arr) {
    for (int i = 0; i < arr.size() - 1; i++) {
      int minIdx = i;
      for (int j = i + 1; j < arr.size(); j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      swap(arr[i], arr[minIdx]);
    }
    return arr;
  }`,
    java: `ArrayList<Integer> selectionSort(ArrayList<Integer> arr) {
    for (int i = 0; i < arr.size() - 1; i++) {
      int minIdx = i;
      for (int j = i + 1; j < arr.size(); j++) {
        if (arr.get(j) < arr.get(minIdx)) minIdx = j;
      }
      int temp = arr.get(i);
      arr.set(i, arr.get(minIdx));
      arr.set(minIdx, temp);
    }
    return arr;
  }`,
    python: `def selectionSort(arr):
    for i in range(len(arr) - 1):
      minIdx = i
      for j in range(i + 1, len(arr)):
        if arr[j] < arr[minIdx]:
          minIdx = j
      arr[i], arr[minIdx] = arr[minIdx], arr[i]
    return arr`,
  },
  insertionSort: {
    javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    return arr;
  }`,
    cpp: `vector<int> insertionSort(vector<int> arr) {
    for (int i = 1; i < arr.size(); i++) {
      int key = arr[i];
      int j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    return arr;
  }`,
    java: `ArrayList<Integer> insertionSort(ArrayList<Integer> arr) {
    for (int i = 1; i < arr.size(); i++) {
      int key = arr.get(i);
      int j = i - 1;
      while (j >= 0 && arr.get(j) > key) {
        arr.set(j + 1, arr.get(j));
        j--;
      }
      arr.set(j + 1, key);
    }
    return arr;
  }`,
    python: `def insertionSort(arr):
    for i in range(1, len(arr)):
      key = arr[i]
      j = i - 1
      while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j -= 1
      arr[j + 1] = key
    return arr`,
  },
  mergeSort: {
    javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
  }
  
  function merge(left, right) {
    let result = [], l = 0, r = 0;
    while (l < left.length && r < right.length) {
      if (left[l] <= right[r]) result.push(left[l++]);
      else result.push(right[r++]);
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
  }`,
    cpp: `vector<int> mergeSort(vector<int> arr) {
    if (arr.size() <= 1) return arr;
    int mid = arr.size() / 2;
    vector<int> left(arr.begin(), arr.begin() + mid);
    vector<int> right(arr.begin() + mid, arr.end());
    return merge(mergeSort(left), mergeSort(right));
  }
  
  vector<int> merge(vector<int> left, vector<int> right) {
    vector<int> result;
    int l = 0, r = 0;
    while (l < left.size() && r < right.size()) {
      if (left[l] <= right[r]) result.push_back(left[l++]);
      else result.push_back(right[r++]);
    }
    result.insert(result.end(), left.begin() + l, left.end());
    result.insert(result.end(), right.begin() + r, right.end());
    return result;
  }`,
    java: `ArrayList<Integer> mergeSort(ArrayList<Integer> arr) {
    if (arr.size() <= 1) return arr;
    int mid = arr.size() / 2;
    ArrayList<Integer> left = new ArrayList<>(arr.subList(0, mid));
    ArrayList<Integer> right = new ArrayList<>(arr.subList(mid, arr.size()));
    return merge(mergeSort(left), mergeSort(right));
  }
  
  ArrayList<Integer> merge(ArrayList<Integer> left, ArrayList<Integer> right) {
    ArrayList<Integer> result = new ArrayList<>();
    int l = 0, r = 0;
    while (l < left.size() && r < right.size()) {
      if (left.get(l) <= right.get(r)) result.add(left.get(l++));
      else result.add(right.get(r++));
    }
    result.addAll(left.subList(l, left.size()));
    result.addAll(right.subList(r, right.size()));
    return result;
  }`,
    python: `def mergeSort(arr):
    if len(arr) <= 1:
      return arr
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    return merge(mergeSort(left), mergeSort(right))
  
  def merge(left, right):
    result = []
    l = r = 0
    while l < len(left) and r < len(right):
      if left[l] <= right[r]:
        result.append(left[l])
        l += 1
      else:
        result.append(right[r])
        r += 1
    return result + left[l:] + right[r:]`,
  },
  linearSearch: {
    javascript: `function linearSearch(arr, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) return i;
    }
    return -1;
  }`,
    cpp: `int linearSearch(vector<int> arr, int value) {
    for (int i = 0; i < arr.size(); i++) {
      if (arr[i] == value) return i;
    }
    return -1;
  }`,
    java: `int linearSearch(ArrayList<Integer> arr, int value) {
    for (int i = 0; i < arr.size(); i++) {
      if (arr.get(i) == value) return i;
    }
    return -1;
  }`,
    python: `def linearSearch(arr, value):
    for i in range(len(arr)):
      if arr[i] == value:
        return i
    return -1`,
  },
  binarySearch: {
    javascript: `function binarySearch(arr, value) {
    arr.sort((a, b) => a - b);
    let left = 0, right = arr.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] === value) return mid;
      if (arr[mid] < value) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }`,
    cpp: `int binarySearch(vector<int> arr, int value) {
    sort(arr.begin(), arr.end());
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
      int mid = (left + right) / 2;
      if (arr[mid] == value) return mid;
      if (arr[mid] < value) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }`,
    java: `int binarySearch(ArrayList<Integer> arr, int value) {
    Collections.sort(arr);
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
      int mid = (left + right) / 2;
      if (arr.get(mid) == value) return mid;
      if (arr.get(mid) < value) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }`,
    python: `def binarySearch(arr, value):
    arr.sort()
    left, right = 0, len(arr) - 1
    while left <= right:
      mid = (left + right) // 2
      if arr[mid] == value:
        return mid
      if arr[mid] < value:
        left = mid + 1
      else:
        right = mid - 1
    return -1`,
  },
};