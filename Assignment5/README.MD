This program generates the nonce value for the block header. Since the calculated nonce depends on timestamp as well so the program takes some time to get executed.

# To run the file 

```
node blockmining.js
```

# Input
1. Index
2. Parent Hash
3. Target
4. Path of the file containing transaction body
 
# Output
1. Current value of nonce and corresponding hash after every 1000000 executions of the code.
2. Found Hash
3. Info about the block header which contains the nonce and timestamp
4. Time taken

I ran the program multiple times and got the following results :

```
Found Hash : 00000007c0fd95bda2b1fffba45ee62b664a1d62289a05c258ac986ee5e07017
blockHeader {
  index: 5,
  parent_hash: '2b21ef8ab698e7daf03ccf0110acb4d844fabb5b9513221285f96593d4d4a573',
  body_hash: '30a43ab62a52bebcf3c1375250037555cb93ac44158d03e113154b9a46450edd',
  target: '0000000f00000000000000000000000000000000000000000000000000000000',
  timestamp: 1590239823393130010n,
  nonce: 26778331n
} 
Time Taken : 206n
```

```
Found Hash : 0000000885f967b40d0d03a8d8c357ff39d503e4f5b34db85bebce7929d66c76
blockHeader {
  index: 5,
  parent_hash: '2b21ef8ab698e7daf03ccf0110acb4d844fabb5b9513221285f96593d4d4a573',
  body_hash: '30a43ab62a52bebcf3c1375250037555cb93ac44158d03e113154b9a46450edd',
  target: '0000000f00000000000000000000000000000000000000000000000000000000',
  timestamp: 1590239503566713746n,
  nonce: 10215496n
} 
Time taken : 77n
```
