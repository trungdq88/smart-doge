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
 * Create a gauss matrix from Matrix schema
 */
function generateMatrix(numbers) {
  const matrix = [];
  for (let i = 0; i < numbers.length; i++) {
    const row = [];
    for (let j = 0; j < numbers.length; j++) {
      row.push(Math.pow(i + 1, numbers.length - j - 1));
    }
    row.push(numbers[i]);
    matrix.push(row);
  }
  return matrix;
}

export default (numbers, gauss) => {
  // Generate matrix
  const matrix = generateMatrix(numbers);

  // Solve matrix to get params
  const params = gauss(matrix);

  // Use params to calculate result of the next number
  const result = calcResult(params);

  return {
    params: params,
    result: result,
  };
};
