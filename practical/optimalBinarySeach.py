def optCost(freq, i, j):
    if j < i:
        return 0
    if j == i:
        return freq[i]
    fsum = sum(freq[i:j+1])
    minCost = float('inf')
    for r in range(i, j+1):
        cost = optCost(freq, i, r-1) + optCost(freq, r+1, j)
        if cost < minCost:
            minCost = cost
    return minCost + fsum

def optimalSearchTree(keys, freq):
    return optCost(freq, 0, len(keys)-1)

# Test the functions
keys = [10, 12, 20]
freq = [34, 8, 50]
print(optimalSearchTree(keys, freq))

# Time complexity: O(n^3) where n is the length of the keys list