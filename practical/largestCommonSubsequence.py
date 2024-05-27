# Recursive solution to the Longest Common Subsequence problem
def lcs(X, Y, m, n):
    if m == 0 or n == 0:
        return 0
    elif X[m-1] == Y[n-1]:
        return 1 + lcs(X, Y, m-1, n-1)
    else:
        return max(lcs(X, Y, m, n-1), lcs(X, Y, m-1, n))
    
# Test the function
X = "AGGTAB"
Y = "GXTXAYB"
print(lcs(X, Y, len(X), len(Y)))

# Time complexity: O(2^n) where n is the length of the longest string

# Dynamic programming solution to the Longest Common Subsequence problem

def lcs(X, Y):
    m = len(X)
    n = len(Y)
    L = [[0] * (n+1) for i in range(m+1)]
    
    for i in range(m+1):
        for j in range(n+1):
            if i == 0 or j == 0:
                L[i][j] = 0
            elif X[i-1] == Y[j-1]:
                L[i][j] = 1 + L[i-1][j-1]
            else:
                L[i][j] = max(L[i-1][j], L[i][j-1])
                
    return L[m][n]

# Test the function
X = "AGGTAB"
Y = "GXTXAYB"
print(lcs(X, Y))

# Time complexity: O(mn) where m is the length of the first string and n is the length of the second string