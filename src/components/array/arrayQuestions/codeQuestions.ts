export const questionCode = {
    "2sum": {
      javascript: `
        function twoSum(nums, target) {
          const map = new Map();
          for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (map.has(complement)) {
              return [map.get(complement), i];
            }
            map.set(nums[i], i);
          }
          return [];
        }
      `,
      cpp: `
        vector<int> twoSum(vector<int>& nums, int target) {
          unordered_map<int, int> map;
          for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
              return {map[complement], i};
            }
            map[nums[i]] = i;
          }
          return {};
        }
      `,
      python: `
        def twoSum(nums, target):
          seen = {}
          for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
              return [seen[complement], i]
            seen[num] = i
          return []
      `,
      java: `
        public int[] twoSum(int[] nums, int target) {
          HashMap<Integer, Integer> map = new HashMap<>();
          for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
              return new int[] {map.get(complement), i};
            }
            map.put(nums[i], i);
          }
          return new int[]{};
        }
      `,
      description: "Do number dhoondho jo target tak jod dein.",
    },
    "3sum": {
      javascript: `
        function threeSum(nums) {
          nums.sort((a, b) => a - b);
          const result = [];
          for (let i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;
            let left = i + 1;
            let right = nums.length - 1;
            while (left < right) {
              const sum = nums[i] + nums[left] + nums[right];
              if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
              } else if (sum < 0) left++;
              else right--;
            }
          }
          return result;
        }
      `,
      cpp: `
        vector<vector<int>> threeSum(vector<int>& nums) {
          sort(nums.begin(), nums.end());
          vector<vector<int>> result;
          for (int i = 0; i < nums.size() - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = nums.size() - 1;
            while (left < right) {
              int sum = nums[i] + nums[left] + nums[right];
              if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
              } else if (sum < 0) left++;
              else right--;
            }
          }
          return result;
        }
      `,
      python: `
        def threeSum(nums):
          nums.sort()
          result = []
          for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
              continue
            left, right = i + 1, len(nums) - 1
            while left < right:
              sum = nums[i] + nums[left] + nums[right]
              if sum == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                  left += 1
                while left < right and nums[right] == nums[right - 1]:
                  right -= 1
                left += 1
                right -= 1
              elif sum < 0:
                left += 1
              else:
                right -= 1
          return result
      `,
      java: `
        public List<List<Integer>> threeSum(int[] nums) {
          Arrays.sort(nums);
          List<List<Integer>> result = new ArrayList<>();
          for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1;
            int right = nums.length - 1;
            while (left < right) {
              int sum = nums[i] + nums[left] + nums[right];
              if (sum == 0) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
              } else if (sum < 0) left++;
              else right--;
            }
          }
          return result;
        }
      `,
      description: "Teen number dhoondho jo zero banayein.",
    },
    "maxsubarraysum": {
      javascript: `
        function maxSubArray(nums) {
          let maxSum = nums[0];
          let currSum = nums[0];
          for (let i = 1; i < nums.length; i++) {
            currSum = Math.max(nums[i], currSum + nums[i]);
            maxSum = Math.max(maxSum, currSum);
          }
          return maxSum;
        }
      `,
      cpp: `
        int maxSubArray(vector<int>& nums) {
          int maxSum = nums[0];
          int currSum = nums[0];
          for (int i = 1; i < nums.size(); i++) {
            currSum = max(nums[i], currSum + nums[i]);
            maxSum = max(maxSum, currSum);
          }
          return maxSum;
        }
      `,
      python: `
        def maxSubArray(nums):
          max_sum = curr_sum = nums[0]
          for num in nums[1:]:
            curr_sum = max(num, curr_sum + num)
            max_sum = max(max_sum, curr_sum)
          return max_sum
      `,
      java: `
        public int maxSubArray(int[] nums) {
          int maxSum = nums[0];
          int currSum = nums[0];
          for (int i = 1; i < nums.length; i++) {
            currSum = Math.max(nums[i], currSum + nums[i]);
            maxSum = Math.max(maxSum, currSum);
          }
          return maxSum;
        }
      `,
      description: "Sabse bada subarray sum nikalo.",
    },
    "movezeroes": {
      javascript: `
        function moveZeroes(nums) {
          let nonZeroIdx = 0;
          for (let i = 0; i < nums.length; i++) {
            if (nums[i] !== 0) {
              [nums[nonZeroIdx], nums[i]] = [nums[i], nums[nonZeroIdx]];
              nonZeroIdx++;
            }
          }
          return nums;
        }
      `,
      cpp: `
        void moveZeroes(vector<int>& nums) {
          int nonZeroIdx = 0;
          for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != 0) {
              swap(nums[nonZeroIdx], nums[i]);
              nonZeroIdx++;
            }
          }
        }
      `,
      python: `
        def moveZeroes(nums):
          non_zero_idx = 0
          for i in range(len(nums)):
            if nums[i] != 0:
              nums[non_zero_idx], nums[i] = nums[i], nums[non_zero_idx]
              non_zero_idx += 1
          return nums
      `,
      java: `
        public void moveZeroes(int[] nums) {
          int nonZeroIdx = 0;
          for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
              int temp = nums[nonZeroIdx];
              nums[nonZeroIdx] = nums[i];
              nums[i] = temp;
              nonZeroIdx++;
            }
          }
        }
      `,
      description: "Saare zeroes ko end mein bhejo, order wahi rakho.",
    },
    "rotatearray": {
      javascript: `
        function rotate(nums, k) {
          k = k % nums.length;
          reverse(nums, 0, nums.length - 1);
          reverse(nums, 0, k - 1);
          reverse(nums, k, nums.length - 1);
          return nums;
        }
        function reverse(nums, start, end) {
          while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
          }
        }
      `,
      cpp: `
        void rotate(vector<int>& nums, int k) {
          k = k % nums.size();
          reverse(nums, 0, nums.size() - 1);
          reverse(nums, 0, k - 1);
          reverse(nums, k, nums.size() - 1);
        }
        void reverse(vector<int>& nums, int start, int end) {
          while (start < end) {
            swap(nums[start], nums[end]);
            start++;
            end--;
          }
        }
      `,
      python: `
        def rotate(nums, k):
          k = k % len(nums)
          nums[:] = nums[::-1]
          nums[:k] = nums[:k][::-1]
          nums[k:] = nums[k:][::-1]
          return nums
      `,
      java: `
        public void rotate(int[] nums, int k) {
          k = k % nums.length;
          reverse(nums, 0, nums.length - 1);
          reverse(nums, 0, k - 1);
          reverse(nums, k, nums.length - 1);
        }
        private void reverse(int[] nums, int start, int end) {
          while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
          }
        }
      `,
      description: "Array ko k steps se right rotate karo.",
    },
  };