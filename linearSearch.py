def linearSearch(array, key):
    for i in range(len(array)):
        if array[i] == key:
            return i
    return -1

array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
key = 5
result = linearSearch(array, key)
if result != -1:
    print("Element found at index", result)
else:
    print("Element not found")