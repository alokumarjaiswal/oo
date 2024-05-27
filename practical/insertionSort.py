def insertionSort(array):
    for i in range(1, len(array)): # s
        key = array[i]  # key is the element to be inserted
        j = i - 1  # j is the index of the element before the key
        while j >= 0 and array[j] > key:
            array[j + 1] = array[j]  # move the element to the right
            j -= 1  # move the index to the left
        array[j + 1] = key  # insert the key
    return array


# Test the function
array = [5, 1, 2, 7, 10, 3, 9, 4, 6, 8]
print(insertionSort(array))

# Time complexity: worst case O(n^2), best case O(n), average case O(n^2)