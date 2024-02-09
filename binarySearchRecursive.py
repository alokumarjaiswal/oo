def binarySearchRecursive(array, l, r, key):
    if r >= l:
        mid = l + (r - l) // 2
        if array[mid] == key:
            return mid
        elif array[mid] > key:
            return binarySearchRecursive(array, l, mid - 1, key)
        else:
            return binarySearchRecursive(array, mid + 1, r, key)
    else:
        return -1
    

array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
key = 6
result = binarySearchRecursive(array,0, len(array) - 1, key)
if result != -1:
    print("Element found at index", result)
else:
    print("Element not found")