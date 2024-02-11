def selectionSort(array):
    for i in range(len(array)):
        minIndex = i
        for j in range(i+1, len(array)):
            if array[j] < array[minIndex]:
                minIndex = j
        array[i], array[minIndex] = array[minIndex], array[i]
    return array


array = [5, 1, 2, 7, 10, 3, 9, 4, 6, 8]
print(selectionSort(array))