# library
[![Codefresh build status]( https://g.codefresh.io/api/badges/build?repoOwner=nudj&repoName=library&branch=develop&pipelineName=library&accountName=collingo&key=eyJhbGciOiJIUzI1NiJ9.NThhZDVhYzdhOGU4YWUwMTAwMzQ4MTcz.LswrznCGW0BHHD1jCDCg-EWQm_-4_j0qwWCvUTZcCYA&type=cf-1)]( https://g.codefresh.io/repositories/nudj/library/builds?filter=trigger:build;branch:develop;service:5964e3c80d1bc60001d1b686~library)

Nudj shared code library

## Contributing

### Dependencies

1. Docker
1. Make

### Development

1. `make build` to build the test image
1. `make test` to run the tests one time
1. `make tdd` to run the tdd watcher

### Release

1. Pull latest from `origin/develop`
2. Increment `package.json` version
3. Commit the change with the commit message `Set [x.x.x]`
4. Push change onto `origin/develop`
5. Checkout to latest master
6. Merge latest develop into master using `git merge origin/develop --no-ff`, with the commit message of `Release [x.x.x]`
7. Push change onto `origin/master`
8. Tag the version using `git tag [x.x.x]`
9. Push the tag: `git push origin --tags`
10. Copy the release notes: `git --no-pager log [PREVIOUS_VERSION_TAG]..[NEW_VERSION_TAG] --pretty=format:'- %s %H ' --reverse --no-merges | pbcopy`
11. Put the release notes on the [relevant release on GitHub](https://github.com/nudj/library/releases)

## Basic Usage

Install the package:

`npm i -S @nudj/library`

For all general-use functions: (work on client and server)

`const library = require('@nudj/library')`

For all client-only functions:

`const clientLibrary = require('@nudj/library/client')`

For all server-only functions:

`const serverLibrary = require('@nudj/library/server')`

For custom errors and constants:

```
const errors = require('@nudj/library/errors')
const constants = require('@nudj/library/constants')
```

## Examples
* [generateId](#generateId)
* [constants](#constants)
  * [idTypes](#idTypes)

## generateId

**Warning:** This code is used for the generation of IDs used in production.  **Do NOT alter** any related code.

Used to generate unique hashes.  Either generates a hash of a composite key value
from valid id types (see: `constants`), or produces a random hash.

**Arguments**

* **type**: String - *(Optional)* - [ID type](#id-types)
* **CompositeKey**: Object - *(Optional)* - An object with the relevant composite key (see examples)

**Examples**

```javascript
/* For specific type */

const { generateId } = require('@nudj/library')
const { idTypes } = require('@nudj/library/constants')

const company = {
  name: 'Important-Company Incorporated',
  industry: 'Providing Examples'
}

// Composite key for type COMPANY is `name`
const companyId = generateId(idTypes.COMPANY, company)

```

```javascript
/* For generic hash */

const { generateId } = require('@nudj/library')

const id = generateId()

```

## Constants

Constants are used to maintain a single source of truth for important values

### idTypes

These types are used by [generateId](#generate-id) to determine the correct
composite key for the provided type. Types include:
  * `COMPANY`
  * `ROLE`
  * `PERSON`
  * `CONNECTION`

**Examples**

```javascript
/* Utilising idTypes to create correct ID for specified type  */

const { generateId } = require('@nudj/library')
const { idTypes } = require('@nudj/library/constants')

function createId (type, data) {
  switch (type) {
    case idTypes.PERSON:
      return generateId(idTypes.PERSON, data)
    case idTypes.COMPANY:
      return generateId(idTypes.COMPANY, data)
    case idTypes.ROLE:
      return generateId(idTypes.ROLE, data)
    case idTypes.CONNECTION:
      return generateId(idTypes.CONNECTION, data)
    default:
      return generateId()
  }
}

```
