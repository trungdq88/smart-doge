[![Build status](https://travis-ci.org/trungdq88/next-number.svg?branch=master)](https://travis-ci.org/trungdq88/next-number)
[![Dependencies](https://img.shields.io/david/trungdq88/next-number.svg)]()
[![Dev dependencies](https://img.shields.io/david/dev/trungdq88/next-number.svg)]()
[![Coverage Status](https://coveralls.io/repos/trungdq88/next-number/badge.svg?branch=master&service=github)](https://coveralls.io/github/trungdq88/next-number?branch=master)


# About
Inspired from this 9GAG post:

<img src="wow.jpg" />

This app simply calculating the next number with "clear" explanation why it should be the next number. Yeah.

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

