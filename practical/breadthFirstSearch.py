from collections import deque

def breadthFirstSearch(graph, start, end):
    queue = deque()
    queue.append(start)
    visited = set()
    visited.add(start)
    while queue:
        node = queue.popleft()
        print(node)
        if node == end:
            return
        for neighbour in graph[node]:
            if neighbour not in visited:
                queue.append(neighbour)
                visited.add(neighbour)

# Test the function
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}
breadthFirstSearch(graph, 'A', 'F')

# Time complexity: O(V + E) where V is the number of vertices and E is the number of edges in the graph