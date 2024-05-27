def partition(array, low, high):
    i = low - 1
    pivot = array[high]

    for j in range(low, high):
        if array[j] < pivot:
            i += 1
            array[i], array[j] = array[j], array[i]

    array[i+1], array[high] = array[high], array[i+1]
    return i + 1

def quickSort(array, low, high):
    if low < high:
        pi = partition(array, low, high) # pi is the partitioning index

        quickSort(array, low, pi-1)
        quickSort(array, pi+1, high)

# Test the function
array = [5, 1, 2, 7, 10, 3, 9, 4, 6, 8]
quickSort(array, 0, len(array) - 1)
print(array)

# Time complexity: worst case O(n^2), best case O(nlogn), average case O(nlogn) where n is the length of the array