import math from 'mathjs';
/** Solve a linear system of equations given by a n&times;n matrix
    with a result vector n&times;1. */
function gauss(A) {
    var n = A.length;

    for (var i=0; i<n; i++) {
        // Search for maximum in this column
        var maxEl = math.abs(A[i][i]);
        var maxRow = i;
        for(var k=i+1; k<n; k++) {
            if (math.larger(math.abs(A[k][i]), maxEl)) {
                maxEl = math.abs(A[k][i]);
                maxRow = k;
            }
        }

        // Swap maximum row with current row (column by column)
        for (var k=i; k<n+1; k++) {
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }

        // Make all rows below this one 0 in current column
        for (k=i+1; k<n; k++) {
            var c = math.divide(
              math.fraction(-A[k][i]),
              math.fraction(A[i][i])
            );
            for(var j=i; j<n+1; j++) {
                if (i==j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] = math.add(
                      A[k][j],
                      math.multiply(
                        math.fraction(c), 
                        math.fraction(A[i][j])
                      )
                    );
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    var x= new Array(n);
    for (var i=n-1; i>-1; i--) {
        x[i] = math.divide(math.fraction(A[i][n]), math.fraction(A[i][i]));
        for (var k=i-1; k>-1; k--) {
            A[k][n] = math.subtract(
              math.fraction(A[k][n]), 
              math.fraction(
                math.multiply(
                  math.fraction(A[k][i]),
                  math.fraction(x[i])
                )
              )
            );
        }
    }
    return x;
}

export default gauss;
