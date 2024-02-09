def binarySearchIterative(array, key):
    l = 0 # left pointer
    r = len(array) - 1 # right pointer
    while l <= r:
        mid = l + (r - l) // 2
        if array[mid] == key:
            return mid
        elif array[mid] < key:
            l = mid + 1
        else:
            r = mid - 1
    return -1


array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
key = 6
result = binarySearchIterative(array, key)
if result != -1:
    print("Element found at index", result)
else:
    print("Element not found")