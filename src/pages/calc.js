import math from 'mathjs';

function calcResult(params) {
  let result = 0;
  const nextIndex = params.length + 1;
  for (let i = 0; i < params.length; i++) {
    result = math.add(
     math.fraction(result),
     math.fraction(
       math.multiply(
         math.fraction(params[i]),
         math.fraction(
           math.pow(nextIndex, params.length - i - 1)
         )
       )
     )
    );
  }

  return result;
}

/**
 * Sort list schema to the best order to get results
 *
 * 0 0 0 1 0
 * 0 0 2 0 0
 * 0 3 0 0 0
 * 4 0 0 0 0
 * 0 0 2 1 0
 * 0 3 2 0 0
 * 4 3 0 0 0
 * 0 3 2 1 0
 * 4 3 2 0 0
 * 4 3 2 1 0
 */
function sortSchemas(schemas) {
  return schemas.sort((a, b) => {
    const sa = Number(a.join('').replace(/0+$/g, ''));
    const sb = Number(b.join('').replace(/0+$/g, ''));
    const result = (sa - sb);
    return result !== 0 ? result / Math.abs(result) : 0;
  });
}

/**
 * I don't always comment on algorithm code
 * But there is the output when n = 5:
 *  4 0 0 0 0
 *  4 3 0 0 0
 *  4 3 2 0 0
 *  4 3 2 1 0
 *  0 3 0 0 0
 *  0 3 2 0 0
 *  0 3 2 1 0
 *  0 0 2 0 0
 *  0 0 2 1 0
 *  0 0 0 1 0
 */
function createMatrixSchema(n) {
  const aa = [];
  let t = 0;
  for (let k = n; k > 0; k--) {
    for (t = 0; t < k - 1; t++) {
      const a = [];
      for (let i = 0; i < n - k; i++) {
        a.push(0);
      }
      for (let i = 0; i < k; i++) {
        if (i <= t) {
          a.push(k - i - 1);
        } else {
          a.push(0);
        }
      }
      aa.push(a);
    }
  }
  return sortSchemas(aa);
}

/**
 * Create a gauss matrix from Matrix schema
 */
function generateMatrix(numbers, schema) {
  const matrix = [];
  for (let i = 0; i < numbers.length; i++) {
    const row = [];
    for (let j = 0; j < numbers.length; j++) {
      // console.log((numbers.length - j - 1) + ' == ' + schema[j] + ' (' + ((numbers.length - j - 1) === schema[j]) + ')');
      row.push(Math.pow(i + 1, schema[j]));
    }
    row.push(numbers[i]);
    matrix.push(row);
  }
  return matrix;
}

// function logSchemas(schemas) {
  // let s = '\n';
  // for (let i = 0; i < schemas.length; i++) {
    // for (let j = 0; j < schemas[i].length; j++) {
      // s += schemas[i][j] + ' ';
    // }
    // s += '\n';
  // }
  // console.log(s);
// }

export default (numbers, gauss) => {
  // All available schemas for `numbers`
  const schemas = createMatrixSchema(numbers.length);

  // This schema will always return valid result
  // const safeSchema = schemas[schemas.length - 1];

  for (let i = 0; i < schemas.length; i++) {
    try {
      const schema = schemas[i];

      // Generate a matrix based on schema
      const matrix = generateMatrix(numbers, schema);

      // Solve matrix to get params
      const params = gauss(matrix);

      // Use params to calculate result of the next number
      const result = calcResult(params);

      // If the code reached here, it probably found a good
      // solution for the sequence, even else it will reach
      // here when the last schema in `schemas` is used to
      // calculate the matrix. In both case, return result.
      return {
        params: params,
        result: result,
      };
    } catch (e) {
      // Sad. The schema can't be used to solve the sequence.
    }
  }
};
