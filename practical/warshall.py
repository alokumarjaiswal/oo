def transitive_closure(graph):
    n = len(graph)
    closure = [[0 for i in range(n)] for j in range(n)]
    for i in range(n):
        for j in range(n):
            closure[i][j] = graph[i][j]
    for k in range(n):
        for i in range(n):
            for j in range(n):
                closure[i][j] = closure[i][j] or (closure[i][k] and closure[k][j])
    return closure

# Test the function
graph = [[1, 1, 0, 1],
         [0, 1, 1, 0],
         [0, 0, 1, 1],
         [0, 0, 0, 1]]
closure = transitive_closure(graph)
for row in closure:
    print(row)


# Time complexity: O(n^3) where n is the number of vertices in the graph