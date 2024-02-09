def bubbleSort(array):
    for i in range(len(array)):
        swapped = False
        for j in range(0, len(array)-i-1):
            if array[j] > array[j+1]:
                array[j], array[j+1] = array[j+1], array[j]
                swapped = True
        if not swapped:
            break
    return array


array = [5, 1, 2, 7, 10, 3, 9, 4, 6, 8]
print(bubbleSort(array))