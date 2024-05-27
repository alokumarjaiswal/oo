def firstFitDecreasing(items, binSize):
    bins = []

    for item in sorted(items, reverse=True):
        assigned = False

        for bin in bins:
            if bin + item <= binSize:
                bin += item
                assigned = True
                break

        if not assigned:
            bins.append(item)

    return len(bins)


# Test the function
items = [2, 5, 4, 7, 1, 3, 8]
binSize = 10   
print(firstFitDecreasing(items, binSize))

# Time complexity: O(n^2) where n is the length of the items list