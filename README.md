[![Build status](https://travis-ci.org/trungdq88/smart-doge.svg?branch=master)](https://travis-ci.org/trungdq88/smart-doge)
[![Dependencies](https://img.shields.io/david/trungdq88/smart-doge.svg)]()
[![Dev dependencies](https://img.shields.io/david/dev/trungdq88/smart-doge.svg)]()
[![Coverage Status](https://coveralls.io/repos/trungdq88/smart-doge/badge.svg?branch=master&service=github)](https://coveralls.io/github/trungdq88/smart-doge?branch=master)


# About
Inspired from this 9GAG post:

<img src="wow.jpg" />

This app simply calculating the next number with "clear" explanation why it should be the next number. Yeah.

# How does it work?

Simple, we can always find a `f(x)` function that match every number in the given sequence by solving a linear equations:
(with `n` is the number of the number in the sequence)

    f(x) = x^n + x^(n-1) + x^(n-2) + ... + x + 1

When we found `f(x)`, we can easily calculate the next number in the sequence. Wow, much solution!

This app uses Gaussian elimination algorithm found here http://martin-thoma.com/solving-linear-equations-with-gaussian-elimination/
with a small modification to make it work with fraction numbers using `mathjs` library.

# Initial dev setup
Make sure you have NodeJS v4.1.1 or above. 

```bash  
npm install 
npm start 
``` 

`http://localhost:8763` should now be live with Hot Module Replacement.

# Production build

```bash
npm install 
npm run production 
```

Production code placed at `build`

# Test

```bash
npm test
```

Coverage report placed in `./coverage/` directory

# Other commands
- `npm run staging` build for `staging` environment. 
- `npm lint`: linting.

