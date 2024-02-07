def linearSearchRecursive(array, target, size):
    if size <= 0:
        return -1
    if array[size - 1] == target:
        return size - 1
    return linearSearchRecursive(array, target, size - 1)


array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
key = 5
result = linearSearchRecursive(array, key, len(array))
if result != -1:
    print("Element found at index", result)
else:
    print("Element not found")