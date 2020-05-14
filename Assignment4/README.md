## To run the program :

```
node generateTransaction.js
```

Then you will be prompted to enter the path of the file, for that use the demo file i created using assignment 3 stored in test.dat.

After pressing Enter, the program will execute and convert the byte array into desired format.

```
Transaction ID: <in hex format>
Number of inputs: <an integer>
    Input 1:
        Transaction ID: <in hex format>
        Index: <an integer>
        Length of the signature: <an integer>
        Signature: <in hex format>
    Input 2:
        Transaction ID: <in hex format>
        Index: <an integer>
        Length of the signature: <an integer>
        Signature: <in hex format>
    ...
Number of outputs: <an integer>
    Output 1:
        Number of coins: <an integer>
        Length of public key: <an integer>
        Public key: <in PEM format>
    Output 2:
        Number of coins: <an integer>
        Length of public key: <an integer>
        Public key: <in PEM format>
    ...
```