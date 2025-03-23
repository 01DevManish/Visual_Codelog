// codeExamples.ts
export const codeExamples = {
  insert: {
    javascript: `function insertElement(arr, value, index) {
    // Create a new array with size increased by 1 to accommodate the new value
    let newArr = new Array(arr.length + 1);
    // Copy elements from original array to new array up to the insertion index
    for (let i = 0; i < index; i++) {
      newArr[i] = arr[i];
    }
    // Insert the new value at the specified index
    newArr[index] = value;
    // Copy remaining elements from original array, shifting them right by 1
    for (let i = index; i < arr.length; i++) {
      newArr[i + 1] = arr[i];
    }
    // Return the new array with the inserted value
    return newArr;
  }`,
    cpp: `vector<int> insertElement(vector<int> arr, int value, int index) {
    // Create a new vector with size increased by 1 for the new element
    vector<int> newArr(arr.size() + 1);
    // Copy elements from original vector to new vector up to the insertion point
    for (int i = 0; i < index; i++) {
      newArr[i] = arr[i];
    }
    // Place the new value at the specified index
    newArr[index] = value;
    // Copy the rest of the elements, shifting them one position to the right
    for (int i = index; i < arr.size(); i++) {
      newArr[i + 1] = arr[i];
    }
    // Return the updated vector
    return newArr;
  }`,
    java: `int[] insertElement(int[] arr, int value, int index) {
    // Create a new array with length increased by 1 to hold the new value
    int[] newArr = new int[arr.length + 1];
    // Copy elements from the original array up to the insertion index
    for (int i = 0; i < index; i++) {
      newArr[i] = arr[i];
    }
    // Insert the new value at the given index
    newArr[index] = value;
    // Copy remaining elements, shifting them one position right
    for (int i = index; i < arr.length; i++) {
      newArr[i + 1] = arr[i];
    }
    // Return the new array
    return newArr;
  }`,
    python: `def insertElement(arr, value, index):
    # Create a new list with size increased by 1 for the new element
    newArr = [0] * (len(arr) + 1)
    # Copy elements from original list to new list up to the insertion point
    for i in range(index):
      newArr[i] = arr[i]
    # Insert the new value at the specified index
    newArr[index] = value
    # Copy the remaining elements, shifting them one position to the right
    for i in range(index, len(arr)):
      newArr[i + 1] = arr[i]
    # Return the new list with the inserted value
    return newArr`,
  },
  delete: {
    javascript: `function deleteElement(arr, index) {
    // Create a new array with size decreased by 1 to remove the element
    let newArr = new Array(arr.length - 1);
    // Copy elements from original array up to the deletion index
    for (let i = 0; i < index; i++) {
      newArr[i] = arr[i];
    }
    // Skip the element at the index and copy the rest, shifting left by 1
    for (let i = index + 1; i < arr.length; i++) {
      newArr[i - 1] = arr[i];
    }
    // Return the new array without the deleted element
    return newArr;
  }`,
    cpp: `vector<int> deleteElement(vector<int> arr, int index) {
    // Create a new vector with size decreased by 1 to exclude the element
    vector<int> newArr(arr.size() - 1);
    // Copy elements from original vector up to the deletion point
    for (int i = 0; i < index; i++) {
      newArr[i] = arr[i];
    }
    // Skip the element at index and copy the remaining elements, shifting left
    for (int i = index + 1; i < arr.size(); i++) {
      newArr[i - 1] = arr[i];
    }
    // Return the updated vector
    return newArr;
  }`,
    java: `int[] deleteElement(int[] arr, int index) {
    // Create a new array with length decreased by 1 to remove the element
    int[] newArr = new int[arr.length - 1];
    // Copy elements from the original array up to the deletion index
    for (int i = 0; i < index; i++) {
      newArr[i] = arr[i];
    }
    // Skip the element at index and copy the rest, shifting left by 1
    for (int i = index + 1; i < arr.length; i++) {
      newArr[i - 1] = arr[i];
    }
    // Return the new array
    return newArr;
  }`,
    python: `def deleteElement(arr, index):
    # Create a new list with size decreased by 1 to exclude the element
    newArr = [0] * (len(arr) - 1)
    # Copy elements from original list up to the deletion point
    for i in range(index):
      newArr[i] = arr[i]
    # Skip the element at index and copy the rest, shifting left
    for i in range(index + 1, len(arr)):
      newArr[i - 1] = arr[i]
    # Return the new list without the deleted element
    return newArr`,
  },
  update: {
    javascript: `function updateElement(arr, index, value) {
    // Create a copy of the original array to avoid modifying it directly
    let newArr = [...arr];
    // Update the value at the specified index in the new array
    newArr[index] = value;
    // Return the updated array
    return newArr;
  }`,
    cpp: `vector<int> updateElement(vector<int> arr, int index, int value) {
    // Create a copy of the original vector
    vector<int> newArr = arr;
    // Replace the element at the specified index with the new value
    newArr[index] = value;
    // Return the updated vector
    return newArr;
  }`,
    java: `int[] updateElement(int[] arr, int index, int value) {
    // Create a copy of the original array
    int[] newArr = arr.clone();
    // Update the value at the specified index
    newArr[index] = value;
    // Return the new array
    return newArr;
  }`,
    python: `def updateElement(arr, index, value):
    # Create a copy of the original list
    newArr = arr.copy()
    # Update the element at the specified index with the new value
    newArr[index] = value
    # Return the updated list
    return newArr`,
  },
  traverse: {
    javascript: `function traverseArray(arr) {
    // Iterate through each element in the array
    for (let i = 0; i < arr.length; i++) {
      // Print each element to the console
      console.log(arr[i]);
    }
  }`,
    cpp: `void traverseArray(vector<int> arr) {
    // Loop through the vector from start to end
    for (int i = 0; i < arr.size(); i++) {
      // Output each element followed by a space
      cout << arr[i] << " ";
    }
  }`,
    java: `void traverseArray(int[] arr) {
    // Iterate over the array from index 0 to the end
    for (int i = 0; i < arr.length; i++) {
      // Print each element with a space
      System.out.print(arr[i] + " ");
    }
  }`,
    python: `def traverseArray(arr):
    # Loop through each index in the list
    for i in range(len(arr)):
      # Print each element followed by a space
      print(arr[i], end=" ")`,
  },
  merge: {
    javascript: `function mergeArrays(arr1, arr2) {
    // Create a new array with size equal to the sum of both arrays
    let newArr = new Array(arr1.length + arr2.length);
    // Copy all elements from the first array into the new array
    for (let i = 0; i < arr1.length; i++) {
      newArr[i] = arr1[i];
    }
    // Copy all elements from the second array, placing them after the first array
    for (let i = 0; i < arr2.length; i++) {
      newArr[arr1.length + i] = arr2[i];
    }
    // Return the merged array
    return newArr;
  }`,
    cpp: `vector<int> mergeArrays(vector<int> arr1, vector<int> arr2) {
    // Create a new vector with size equal to the sum of both vectors
    vector<int> newArr(arr1.size() + arr2.size());
    // Copy elements from the first vector into the new vector
    for (int i = 0; i < arr1.size(); i++) {
      newArr[i] = arr1[i];
    }
    // Copy elements from the second vector, appending them after the first
    for (int i = 0; i < arr2.size(); i++) {
      newArr[arr1.size() + i] = arr2[i];
    }
    // Return the merged vector
    return newArr;
  }`,
    java: `int[] mergeArrays(int[] arr1, int[] arr2) {
    // Create a new array with size equal to the sum of both arrays
    int[] newArr = new int[arr1.length + arr2.length];
    // Copy elements from the first array into the new array
    for (int i = 0; i < arr1.length; i++) {
      newArr[i] = arr1[i];
    }
    // Copy elements from the second array, placing them after the first
    for (int i = 0; i < arr2.length; i++) {
      newArr[arr1.length + i] = arr2[i];
    }
    // Return the merged array
    return newArr;
  }`,
    python: `def mergeArrays(arr1, arr2):
    # Create a new list with size equal to the sum of both lists
    newArr = [0] * (len(arr1) + len(arr2))
    # Copy elements from the first list into the new list
    for i in range(len(arr1)):
      newArr[i] = arr1[i]
    # Copy elements from the second list, appending them after the first
    for i in range(len(arr2)):
      newArr[len(arr1) + i] = arr2[i]
    # Return the merged list
    return newArr`,
  },
  split: {
    javascript: `function splitArray(arr, index) {
    // Create two new arrays: one for the left part, one for the right part
    let arr1 = new Array(index);
    let arr2 = new Array(arr.length - index);
    // Copy elements into the first array up to the split index
    for (let i = 0; i < index; i++) {
      arr1[i] = arr[i];
    }
    // Copy elements into the second array from the split index onward
    for (let i = index; i < arr.length; i++) {
      arr2[i - index] = arr[i];
    }
    // Return both arrays as an array of two elements
    return [arr1, arr2];
  }`,
    cpp: `pair<vector<int>, vector<int>> splitArray(vector<int> arr, int index) {
    // Create two vectors: one for the left part, one for the right part
    vector<int> arr1(index);
    vector<int> arr2(arr.size() - index);
    // Copy elements into the first vector up to the split point
    for (int i = 0; i < index; i++) {
      arr1[i] = arr[i];
    }
    // Copy elements into the second vector from the split point onward
    for (int i = index; i < arr.size(); i++) {
      arr2[i - index] = arr[i];
    }
    // Return a pair containing both vectors
    return {arr1, arr2};
  }`,
    java: `int[][] splitArray(int[] arr, int index) {
    // Create two arrays: one for the left part, one for the right part
    int[] arr1 = new int[index];
    int[] arr2 = new int[arr.length - index];
    // Copy elements into the first array up to the split index
    for (int i = 0; i < index; i++) {
      arr1[i] = arr[i];
    }
    // Copy elements into the second array from the split index onward
    for (int i = index; i < arr.length; i++) {
      arr2[i - index] = arr[i];
    }
    // Return an array containing both arrays
    return new int[][]{arr1, arr2};
  }`,
    python: `def splitArray(arr, index):
    # Create two lists: one for the left part, one for the right part
    arr1 = [0] * index
    arr2 = [0] * (len(arr) - index)
    # Copy elements into the first list up to the split point
    for i in range(index):
      arr1[i] = arr[i]
    # Copy elements into the second list from the split point onward
    for i in range(index, len(arr)):
      arr2[i - index] = arr[i]
    # Return a list containing both lists
    return [arr1, arr2]`,
  },
  reverse: {
    javascript: `function reverseArray(arr) {
    // Create a new array to store the reversed elements
    let newArr = new Array(arr.length);
    // Fill the new array by copying elements in reverse order
    for (let i = 0; i < arr.length; i++) {
      newArr[i] = arr[arr.length - 1 - i];
    }
    // Return the reversed array
    return newArr;
  }`,
    cpp: `vector<int> reverseArray(vector<int> arr) {
    // Create a new vector to hold the reversed elements
    vector<int> newArr(arr.size());
    // Copy elements into the new vector in reverse order
    for (int i = 0; i < arr.size(); i++) {
      newArr[i] = arr[arr.size() - 1 - i];
    }
    // Return the reversed vector
    return newArr;
  }`,
    java: `int[] reverseArray(int[] arr) {
    // Create a new array for the reversed elements
    int[] newArr = new int[arr.length];
    // Copy elements into the new array in reverse order
    for (int i = 0; i < arr.length; i++) {
      newArr[i] = arr[arr.length - 1 - i];
    }
    // Return the reversed array
    return newArr;
  }`,
    python: `def reverseArray(arr):
    # Create a new list to store the reversed elements
    newArr = [0] * len(arr)
    # Fill the new list by copying elements in reverse order
    for i in range(len(arr)):
      newArr[i] = arr[len(arr) - 1 - i]
    # Return the reversed list
    return newArr`,
  },
  bubbleSort: {
    javascript: `function bubbleSort(arr) {
    // Create a copy of the array to avoid modifying the original
    let newArr = [...arr];
    // Outer loop for the number of passes
    for (let i = 0; i < newArr.length; i++) {
      // Inner loop to compare adjacent elements
      for (let j = 0; j < newArr.length - i - 1; j++) {
        // If current element is greater than the next, swap them
        if (newArr[j] > newArr[j + 1]) {
          let temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;
        }
      }
    }
    // Return the sorted array
    return newArr;
  }`,
    cpp: `vector<int> bubbleSort(vector<int> arr) {
    // Create a copy of the vector
    vector<int> newArr = arr;
    // Outer loop for the number of passes
    for (int i = 0; i < newArr.size(); i++) {
      // Inner loop to compare adjacent elements
      for (int j = 0; j < newArr.size() - i - 1; j++) {
        // Swap if the current element is greater than the next
        if (newArr[j] > newArr[j + 1]) {
          int temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;
        }
      }
    }
    // Return the sorted vector
    return newArr;
  }`,
    java: `int[] bubbleSort(int[] arr) {
    // Create a copy of the array
    int[] newArr = arr.clone();
    // Outer loop for the number of passes
    for (int i = 0; i < newArr.length; i++) {
      // Inner loop to compare adjacent elements
      for (int j = 0; j < newArr.length - i - 1; j++) {
        // Swap if the current element is greater than the next
        if (newArr[j] > newArr[j + 1]) {
          int temp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = temp;
        }
      }
    }
    // Return the sorted array
    return newArr;
  }`,
    python: `def bubbleSort(arr):
    # Create a copy of the list
    newArr = arr.copy()
    # Outer loop for the number of passes
    for i in range(len(newArr)):
      # Inner loop to compare adjacent elements
      for j in range(len(newArr) - i - 1):
        # Swap if the current element is greater than the next
        if newArr[j] > newArr[j + 1]:
          newArr[j], newArr[j + 1] = newArr[j + 1], newArr[j]
    # Return the sorted list
    return newArr`,
  },
  selectionSort: {
    javascript: `function selectionSort(arr) {
    // Create a copy of the array
    let newArr = [...arr];
    // Outer loop to iterate through each position
    for (let i = 0; i < newArr.length - 1; i++) {
      // Assume the current index is the minimum
      let minIdx = i;
      // Inner loop to find the minimum element in the unsorted part
      for (let j = i + 1; j < newArr.length; j++) {
        if (newArr[j] < newArr[minIdx]) minIdx = j;
      }
      // Swap the found minimum with the current position if needed
      if (minIdx !== i) {
        let temp = newArr[i];
        newArr[i] = newArr[minIdx];
        newArr[minIdx] = temp;
      }
    }
    // Return the sorted array
    return newArr;
  }`,
    cpp: `vector<int> selectionSort(vector<int> arr) {
    // Create a copy of the vector
    vector<int> newArr = arr;
    // Outer loop for each position
    for (int i = 0; i < newArr.size() - 1; i++) {
      // Start with the current index as the minimum
      int minIdx = i;
      // Find the minimum element in the remaining unsorted portion
      for (int j = i + 1; j < newArr.size(); j++) {
        if (newArr[j] < newArr[minIdx]) minIdx = j;
      }
      // Swap if a smaller element was found
      if (minIdx != i) {
        int temp = newArr[i];
        newArr[i] = newArr[minIdx];
        newArr[minIdx] = temp;
      }
    }
    // Return the sorted vector
    return newArr;
  }`,
    java: `int[] selectionSort(int[] arr) {
    // Create a copy of the array
    int[] newArr = arr.clone();
    // Outer loop for each position
    for (int i = 0; i < newArr.length - 1; i++) {
      // Assume the current index is the minimum
      int minIdx = i;
      // Find the minimum element in the unsorted portion
      for (int j = i + 1; j < newArr.length; j++) {
        if (newArr[j] < newArr[minIdx]) minIdx = j;
      }
      // Swap if a smaller element was found
      if (minIdx != i) {
        int temp = newArr[i];
        newArr[i] = newArr[minIdx];
        newArr[minIdx] = temp;
      }
    }
    // Return the sorted array
    return newArr;
  }`,
    python: `def selectionSort(arr):
    # Create a copy of the list
    newArr = arr.copy()
    # Outer loop for each position
    for i in range(len(newArr) - 1):
      # Start with the current index as the minimum
      minIdx = i
      # Find the minimum element in the remaining unsorted part
      for j in range(i + 1, len(newArr)):
        if newArr[j] < newArr[minIdx]:
          minIdx = j
      # Swap if a smaller element was found
      if minIdx != i:
        newArr[i], newArr[minIdx] = newArr[minIdx], newArr[i]
    # Return the sorted list
    return newArr`,
  },
  insertionSort: {
    javascript: `function insertionSort(arr) {
    // Create a copy of the array
    let newArr = [...arr];
    // Start from the second element
    for (let i = 1; i < newArr.length; i++) {
      // Store the current element to be inserted
      let key = newArr[i];
      // Index of the previous element
      let j = i - 1;
      // Shift elements greater than key to the right
      while (j >= 0 && newArr[j] > key) {
        newArr[j + 1] = newArr[j];
        j--;
      }
      // Place the key in its correct position
      newArr[j + 1] = key;
    }
    // Return the sorted array
    return newArr;
  }`,
    cpp: `vector<int> insertionSort(vector<int> arr) {
    // Create a copy of the vector
    vector<int> newArr = arr;
    // Begin with the second element
    for (int i = 1; i < newArr.size(); i++) {
      // Store the current element to insert
      int key = newArr[i];
      // Index of the previous element
      int j = i - 1;
      // Move elements greater than key one position ahead
      while (j >= 0 && newArr[j] > key) {
        newArr[j + 1] = newArr[j];
        j--;
      }
      // Insert the key in its proper place
      newArr[j + 1] = key;
    }
    // Return the sorted vector
    return newArr;
  }`,
    java: `int[] insertionSort(int[] arr) {
    // Create a copy of the array
    int[] newArr = arr.clone();
    // Start from the second element
    for (int i = 1; i < newArr.length; i++) {
      // Store the current element to be inserted
      int key = newArr[i];
      // Index of the previous element
      int j = i - 1;
      // Shift elements greater than key to the right
      while (j >= 0 && newArr[j] > key) {
        newArr[j + 1] = newArr[j];
        j--;
      }
      // Place the key in its correct position
      newArr[j + 1] = key;
    }
    // Return the sorted array
    return newArr;
  }`,
    python: `def insertionSort(arr):
    # Create a copy of the list
    newArr = arr.copy()
    # Start from the second element
    for i in range(1, len(newArr)):
      # Store the current element to insert
      key = newArr[i]
      # Index of the previous element
      j = i - 1
      # Move elements greater than key one position ahead
      while j >= 0 and newArr[j] > key:
        newArr[j + 1] = newArr[j]
        j -= 1
      # Insert the key in its proper place
      newArr[j + 1] = key
    # Return the sorted list
    return newArr`,
  },
  mergeSort: {
    javascript: `function mergeSort(arr) {
    // Base case: if array has 1 or fewer elements, return it
    if (arr.length <= 1) return arr;
    // Calculate the middle point to divide the array
    let mid = Math.floor(arr.length / 2);
    // Create left array for the first half
    let left = new Array(mid);
    // Create right array for the second half
    let right = new Array(arr.length - mid);
    // Fill the left array with elements up to mid
    for (let i = 0; i < mid; i++) left[i] = arr[i];
    // Fill the right array with elements from mid to end
    for (let i = mid; i < arr.length; i++) right[i - mid] = arr[i];
    // Recursively sort and merge the two halves
    return merge(mergeSort(left), mergeSort(right));
  }
  
  function merge(left, right) {
    // Create a result array to hold merged elements
    let result = new Array(left.length + right.length);
    // Indices for left, right, and result arrays
    let l = 0, r = 0, k = 0;
    // Compare elements from left and right, merging in sorted order
    while (l < left.length && r < right.length) {
      if (left[l] <= right[r]) result[k++] = left[l++];
      else result[k++] = right[r++];
    }
    // Copy any remaining elements from left array
    while (l < left.length) result[k++] = left[l++];
    // Copy any remaining elements from right array
    while (r < right.length) result[k++] = right[r++];
    // Return the merged array
    return result;
  }`,
    cpp: `vector<int> mergeSort(vector<int> arr) {
    // Base case: return if vector has 1 or fewer elements
    if (arr.size() <= 1) return arr;
    // Find the middle point to split the vector
    int mid = arr.size() / 2;
    // Create left vector for the first half
    vector<int> left(mid);
    // Create right vector for the second half
    vector<int> right(arr.size() - mid);
    // Copy elements into left vector up to mid
    for (int i = 0; i < mid; i++) left[i] = arr[i];
    // Copy elements into right vector from mid to end
    for (int i = mid; i < arr.size(); i++) right[i - mid] = arr[i];
    // Recursively sort and merge the two halves
    return merge(mergeSort(left), mergeSort(right));
  }
  
  vector<int> merge(vector<int> left, vector<int> right) {
    // Create a result vector for merged elements
    vector<int> result(left.size() + right.size());
    // Indices for left, right, and result vectors
    int l = 0, r = 0, k = 0;
    // Merge elements from left and right in sorted order
    while (l < left.size() && r < right.size()) {
      if (left[l] <= right[r]) result[k++] = left[l++];
      else result[k++] = right[r++];
    }
    // Add remaining elements from left vector
    while (l < left.size()) result[k++] = left[l++];
    // Add remaining elements from right vector
    while (r < right.size()) result[k++] = right[r++];
    // Return the merged vector
    return result;
  }`,
    java: `int[] mergeSort(int[] arr) {
    // Base case: return if array has 1 or fewer elements
    if (arr.length <= 1) return arr;
    // Calculate the middle point to divide the array
    int mid = arr.length / 2;
    // Create left array for the first half
    int[] left = new int[mid];
    // Create right array for the second half
    int[] right = new int[arr.length - mid];
    // Fill left array with elements up to mid
    for (int i = 0; i < mid; i++) left[i] = arr[i];
    // Fill right array with elements from mid to end
    for (int i = mid; i < arr.length; i++) right[i - mid] = arr[i];
    // Recursively sort and merge the two halves
    return merge(mergeSort(left), mergeSort(right));
  }
  
  int[] merge(int[] left, int[] right) {
    // Create a result array to hold merged elements
    int[] result = new int[left.length + right.length];
    // Indices for left, right, and result arrays
    int l = 0, r = 0, k = 0;
    // Merge elements from left and right in sorted order
    while (l < left.length && r < right.length) {
      if (left[l] <= right[r]) result[k++] = left[l++];
      else result[k++] = right[r++];
    }
    // Copy remaining elements from left array
    while (l < left.length) result[k++] = left[l++];
    // Copy remaining elements from right array
    while (r < right.length) result[k++] = right[r++];
    // Return the merged array
    return result;
  }`,
    python: `def mergeSort(arr):
    # Base case: return if list has 1 or fewer elements
    if len(arr) <= 1:
      return arr
    # Find the middle point to split the list
    mid = len(arr) // 2
    # Create left list for the first half
    left = [0] * mid
    # Create right list for the second half
    right = [0] * (len(arr) - mid)
    # Copy elements into left list up to mid
    for i in range(mid):
      left[i] = arr[i]
    # Copy elements into right list from mid to end
    for i in range(mid, len(arr)):
      right[i - mid] = arr[i]
    # Recursively sort and merge the two halves
    return merge(mergeSort(left), mergeSort(right))
  
  def merge(left, right):
    # Create a result list to hold merged elements
    result = [0] * (len(left) + len(right))
    # Indices for left, right, and result lists
    l = r = k = 0
    # Merge elements from left and right in sorted order
    while l < len(left) and r < len(right):
      if left[l] <= right[r]:
        result[k] = left[l]
        l += 1
      else:
        result[k] = right[r]
        r += 1
      k += 1
    # Add remaining elements from left list
    while l < len(left):
      result[k] = left[l]
      l += 1
      k += 1
    # Add remaining elements from right list
    while r < len(right):
      result[k] = right[r]
      r += 1
      k += 1
    # Return the merged list
    return result`,
  },
  linearSearch: {
    javascript: `function linearSearch(arr, value) {
    // Loop through each element in the array
    for (let i = 0; i < arr.length; i++) {
      // If the current element matches the value, return its index
      if (arr[i] === value) return i;
    }
    // If value is not found, return -1
    return -1;
  }`,
    cpp: `int linearSearch(vector<int> arr, int value) {
    // Iterate through each element in the vector
    for (int i = 0; i < arr.size(); i++) {
      // Return the index if the current element equals the value
      if (arr[i] == value) return i;
    }
    // Return -1 if the value is not found
    return -1;
  }`,
    java: `int linearSearch(int[] arr, int value) {
    // Loop through the array from start to end
    for (int i = 0; i < arr.length; i++) {
      // Return the index if the current element matches the value
      if (arr[i] == value) return i;
    }
    // Return -1 if the value is not found
    return -1;
  }`,
    python: `def linearSearch(arr, value):
    # Iterate through each index in the list
    for i in range(len(arr)):
      # Return the index if the current element equals the value
      if arr[i] == value:
        return i
    # Return -1 if the value is not found
    return -1`,
  },
  binarySearch: {
    javascript: `function binarySearch(arr, value) {
    // Initialize left and right pointers for the search range
    let left = 0, right = arr.length - 1;
    // Continue searching while the range is valid
    while (left <= right) {
      // Calculate the middle index
      let mid = Math.floor((left + right) / 2);
      // If the middle element is the value, return its index
      if (arr[mid] === value) return mid;
      // If the value is greater, search the right half
      if (arr[mid] < value) left = mid + 1;
      // If the value is smaller, search the left half
      else right = mid - 1;
    }
    // Return -1 if the value is not found
    return -1;
  }`,
    cpp: `int binarySearch(vector<int> arr, int value) {
    // Set initial left and right boundaries
    int left = 0, right = arr.size() - 1;
    // Search while the range is valid
    while (left <= right) {
      // Compute the middle index
      int mid = (left + right) / 2;
      // Return the index if the middle element matches the value
      if (arr[mid] == value) return mid;
      // Narrow to the right half if value is greater
      if (arr[mid] < value) left = mid + 1;
      // Narrow to the left half if value is smaller
      else right = mid - 1;
    }
    // Return -1 if the value is not found
    return -1;
  }`,
    java: `int binarySearch(int[] arr, int value) {
    // Define the initial search range with left and right pointers
    int left = 0, right = arr.length - 1;
    // Continue while the search range is valid
    while (left <= right) {
      // Calculate the middle index
      int mid = (left + right) / 2;
      // Return the index if the middle element is the value
      if (arr[mid] == value) return mid;
      // Search the right half if the value is greater
      if (arr[mid] < value) left = mid + 1;
      // Search the left half if the value is smaller
      else right = mid - 1;
    }
    // Return -1 if the value is not found
    return -1;
  }`,
    python: `def binarySearch(arr, value):
    # Set initial left and right pointers
    left, right = 0, len(arr) - 1
    # Search while the range is valid
    while left <= right:
      # Compute the middle index
      mid = (left + right) // 2
      # Return the index if the middle element matches the value
      if arr[mid] == value:
        return mid
      # Narrow to the right half if value is greater
      if arr[mid] < value:
        left = mid + 1
      # Narrow to the left half if value is smaller
      else:
        right = mid - 1
    # Return -1 if the value is not found
    return -1`,
  },
};
