# Minimum Spanning Tree

## Prim's algorithm
```
```

## Kruskal algorithm
```
r V E -> f S{V} Q{E} T{}

f S Q T -> T ? Q=={}
        |  f S' Q' T' : {Q',e}=g Q S, S'=S-e, T'=T+e

g Q S -> {Q',e} ? e<-!S : Q'=Q-e, e=min(Q)
      |  g Q' S

min Q -> e : w(e)==min{ w(e) : e<-Q }
```