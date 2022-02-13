# personjs

A validator for Swedish personal numbers.

```javascript
import isPersonalNumber from '/personjs.js';

isPersonalNumber("19780202-2389");
> true

isPersonalNumber("Robert'); DROP TABLE Students;--");
> false
```

from the command line:

```bash
node personjs.js 19780202-2389
> 19780202-2389 is valid.
```
