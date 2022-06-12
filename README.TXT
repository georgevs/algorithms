https://www.youtube.com/watch?v=09_LlHjoEiY
https://github.com/williamfiset/algorithms


Types of graphs - https://youtu.be/09_LlHjoEiY?t=149
- undirected
- directed (digraph)
- weighted

Special graphs - https://youtu.be/09_LlHjoEiY?t=294
- tree: undirected graph with no cycles, N nodes, N-1 edges
- rooted tree: tree with designed root node
  -- aborescence (out-tree): edges point out from the root
  -- anti-aborescence (in-tree): edges point towards the root
- directed acyclic graphs (DAG)
  * all out-trees are DAGs
  * algorithms: shortest path, topological order
- bipartite graphs: 
  * vertices are split between two sets U and V, 
  * each edge connects U and V
  * algorithms: maximum matches
  * releated to: network flow
- complete graphs:
  * graph with unique edge between every pair of vertices
  * Kn: complete graph with N nodes 

Representing graphs - https://youtu.be/09_LlHjoEiY?t=543
- adjacency matrix: 
  * m[v1][v2] represents edge/weight from v1 to v2
  * great for dense graphs O(V^2)
  * edge lookup is O(1)
- adjacency list:
  * Map v1 -> [(v2,w) ...]
  * great for sparse graphs
  * edge lookup is O(E)
- edge list:
  * unordered list of edges [(v1,v2,w) ...]

                       * * * 
 
Common graph theory problems - https://youtu.be/09_LlHjoEiY?t=832
- typical properties to consider:
  -- directed or undirected
  -- weighted or unweighted
  -- sparse or dense
  -- which representation will be efficient 

Shortest path problem - https://youtu.be/09_LlHjoEiY?t=905
* file://./shortest-path/test.js
- algorithms: bfs (unweighted graph), Dijkstra, Bellman-Ford, Floyd-Warshall, A*, ...
                      
Connectivity - https://youtu.be/09_LlHjoEiY?t=942
- does there exist a path between v1 and v2
- algorithms:
  -- union-find
  -- dfs: file://./search/dfs-iterative.js

Negative cycles - https://youtu.be/09_LlHjoEiY?t=975
* file://./negative-cycles/test.js
- does a weighted digraph have any negative cycles
- algorithms: Bellman-Ford, Floyd-Warshall
* presents a challenge for finding shortest path
* application in currency exchange arbitrages

Strongly connected components - https://youtu.be/09_LlHjoEiY?t=1071
* file://./strongly-connected-components/test.js
- self-contained cycles within a directed graph, where
  * every vertex within a cycle can reach every other vertexin the same cycle
- algorithms: Tarjan, Kosaraju  

Traveling Salesman Problem - https://youtu.be/09_LlHjoEiY?t=1116
* file://./traveling-salesman/test.js
- shortest (minimal cost) possible route, 
  * which visits each node exactly once,
  * and returns to the start node
- algorithms: Held-Karp (dynamic programming), branch-and-bound, etc.
- computationally challenging (NP-hard)

Bridges - https://youtu.be/09_LlHjoEiY?t=1178
* file://./bridges/test.js
- A bridge (cut edge) is any edge 
  * whose removal increases the number of connected components
- useful for finding weak points and bottlenecks

Articulation points - https://youtu.be/09_LlHjoEiY?t=1213
- Articulation point (cut point) is a node
  * whose removal increases the number of connected components

Minimum Spanning Tree (MST) - https://youtu.be/09_LlHjoEiY?t=1230
- subset of edges of a connected weighted graph,
  * which connects all vertices
  * without any cycles
  * minimum possible total weight
- algorithms: Kruskal, Prim, Boruvka

Network flow - https://youtu.be/09_LlHjoEiY?t=1300
- with infinite input how much flow can be pushed through a network (DAG)
 * where edge weights represent capacity
- algorithms: Ford-Fulkerson, Edmonds-Karp, Dinic

                        * * * 

Depth First Search overview - https://youtu.be/09_LlHjoEiY?t=1399
- fundamental search algorithm to explore nodes and edges
- it runs with O(V+E)
- building block to other algorithms: count connected components, determine connectivity, find bridges...
- DFS can:
  -- find connected components
  -- find minimum spanning tree (MST)
  -- detect and find cycles
  -- check if graph is bipartite
  -- find strongly connected components
  -- topologically sort the nodes of a graph
  -- find bridges and articulation points
  -- find augmeting paths in flow network
  -- generate mazes

Basic DFS - https://youtu.be/09_LlHjoEiY?t=1455

Connected components - https://youtu.be/09_LlHjoEiY?t=1701
- "coloring" component: identify each node of the same component with the same value
- connected components are NOT (necessarily) strongly connected components

                        * * * 

Breadth First Search (BFS) - https://youtu.be/09_LlHjoEiY?t=1999
* file: file://./breadth-first-search/bfs.js 
- particularily useful for finding the SHORTEST path on UNWEIGTHED graph

BFS shortest path on a grid - https://youtu.be/09_LlHjoEiY?t=2426
* file: file://./breadth-first-search-grid/bfs.js
- many problems can be represented using a grid
- a grid is also an implicit graph where neighbors are determined by the location in the grid
  -- finding a path through a maze
  -- finding a route through obstacles (dungeon problem statement)
- convert grid to graph
  -- label all cells with continuous numbers
  -- construct adj list/matrix
- adapt the grid data representation
  -- neighbors of cell i,j are cells offset with `direction vectors` [±1, ±1]
  -- (optionally) instead of pushing (i,j) into the bfs queue, 
      have separate queues for each grid dimention 

                        * * * 

Topological sort - https://youtu.be/09_LlHjoEiY?t=3384
- topological ordering is an ordering of the nodes in a directed graph where
  for each directed edge from A to B, A appears BEFORE B in the ordering
- topological sort can find a topolgical ordering in O(V+E) 
- topological ordering are NOT unique
- not all graphs have topological ordering (for example graph with cycle)
- graphs WITH topological ordering:
  -- directed acyclic graphs
  -- Trees 
- many real world problems can be modeled as directed graphs where events (nodes) happen BEFORE others
  -- class prerequisites
  -- program dependencies
  -- event scheduling
  -- assembly instructions
- how to validate a graph is DAG
  -- Tarjan strongly connected component algorithm

Topological sort algorithm for trees - https://youtu.be/09_LlHjoEiY?t=3663

Topological sort algorithm for graph - https://youtu.be/09_LlHjoEiY?t=3706
* file://./topological-sort/sort.js
- algorithm
  -- pick an unvisited node
  -- beginning the selected node DFS explore only unvisited nodes
  -- on the recursive callback, add the current node in reverse order
  -- repeat steps until no more unvisited nodes   

                        * * * 

Shortst and Longest path on DAG - https://youtu.be/09_LlHjoEiY?t=4193
* file://./single-source-shortest-path-on-dag/shortest-paths.js
* https://github.com/williamfiset/Algorithms/blob/master/src/main/java/com/williamfiset/algorithms/graphtheory/TopologicalSortAdjacencyList.java
- Directed acyclic graph (DAG) is a graph with directed edges and no cycles
- the single source shortest path (SSSP) can be solved very efficiently (linear)
- another algorithm: find the SHORTEST path from one node to ALL other nodes in the graph 
  by using topological ordering
- similar problem: find the LONGEST path from one node to ALL other nodes.
  The problem is NP-hard for general graphs, but linear for DAGs.
  To solve multiply ALL edges by -1, solve for SHORTEST path, and multiply the result by -1.
 
                        * * * 

 Dijkstra's shortest path algorithm - https://youtu.be/09_LlHjoEiY?t=4773
 