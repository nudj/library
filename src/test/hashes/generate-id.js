/* eslint-env mocha */
const chai = require('chai')
const expect = chai.expect

const { generateId } = require('../../lib/hash')

describe('generateId', () => {
  describe('for type `company`', () => {
    it('should generate a hash id', () => {
      const companies = [
        {
          name: 'Javascripters Anonymous'
        },
        {
          name: 'The Big Company Inc.'
        }
      ]
      const hash = generateId('company', companies[0])
      expect(hash).to.exist()
      expect(hash).to.be.a('string')
    })

    it('should always generate the hash based on input', () => {
      const companies = [
        {
          name: 'Javascripters Anonymous'
        },
        {
          name: 'The Big Company Inc.'
        }
      ]
      const hash = generateId('company', companies[0])
      const secondHash = generateId('company', companies[0])
      expect(hash).to.exist()
      expect(hash).to.be.a('string')
      expect(secondHash).to.exist()
      expect(secondHash).to.be.a('string')
      expect(secondHash).to.equal(hash)
    })

    it('should generate different values for different inputs', () => {
      const companies = [
        {
          name: 'Javascripters Anonymous'
        },
        {
          name: 'The Big Company Inc.'
        }
      ]
      const firstId = generateId('company', companies[0])
      const secondId = generateId('company', companies[1])
      expect(firstId).to.exist()
      expect(firstId).to.be.a('string')
      expect(secondId).to.exist()
      expect(secondId).to.be.a('string')
      expect(firstId).to.not.equal(secondId)
    })

    it('should throw error if passed invalid data', () => {
      const badData = {
        name: null
      }
      expect(
        () => generateId('company', badData)
      ).to.throw('Unable to generate id for company with input {"name":null}')
    })
  })

  describe('for type `role`', () => {
    it('should generate a hash id', () => {
      const roles = [
        {
          name: 'Diet Coke Machine Technician'
        },
        {
          name: 'Pun Inventor'
        }
      ]
      const hash = generateId('role', roles[0])
      expect(hash).to.exist()
      expect(hash).to.be.a('string')
    })

    it('should always generate the hash based on input', () => {
      const roles = [
        {
          name: 'Diet Coke Machine Technician'
        },
        {
          name: 'Pun Inventor'
        }
      ]
      const hash = generateId('role', roles[0])
      const secondHash = generateId('role', roles[0])
      expect(hash).to.exist()
      expect(hash).to.be.a('string')
      expect(secondHash).to.exist()
      expect(secondHash).to.be.a('string')
      expect(secondHash).to.equal(hash)
    })

    it('should generate different values for different inputs', () => {
      const roles = [
        {
          name: 'Diet Coke Machine Technician'
        },
        {
          name: 'Pun Inventor'
        }
      ]
      const firstId = generateId('role', roles[0])
      const secondId = generateId('role', roles[1])
      expect(firstId).to.exist()
      expect(firstId).to.be.a('string')
      expect(secondId).to.exist()
      expect(secondId).to.be.a('string')
      expect(firstId).to.not.equal(secondId)
    })

    it('should throw error if passed invalid data', () => {
      const badData = {
        name: null
      }
      expect(
        () => generateId('role', badData)
      ).to.throw('Unable to generate id for role with input {"name":null}')
    })
  })

  describe('for type `person`', () => {
    it('should generate a hash id', () => {
      const people = [
        {
          email: 'dave@funhouse.dave'
        },
        {
          email: 'phil@lemonlaw.co'
        }
      ]
      const hash = generateId('person', people[0])
      expect(hash).to.exist()
      expect(hash).to.be.a('string')
    })

    it('should always generate the hash based on input', () => {
      const people = [
        {
          email: 'dave@funhouse.dave'
        },
        {
          email: 'phil@lemonlaw.co'
        }
      ]
      const hash = generateId('person', people[0])
      const secondHash = generateId('person', people[0])
      expect(hash).to.exist()
      expect(hash).to.be.a('string')
      expect(secondHash).to.exist()
      expect(secondHash).to.be.a('string')
      expect(secondHash).to.equal(hash)
    })

    it('should generate different values for different inputs', () => {
      const people = [
        {
          email: 'dave@funhouse.dave'
        },
        {
          email: 'phil@lemonlaw.co'
        }
      ]
      const firstId = generateId('person', people[0])
      const secondId = generateId('person', people[1])
      expect(firstId).to.exist()
      expect(firstId).to.be.a('string')
      expect(secondId).to.exist()
      expect(secondId).to.be.a('string')
      expect(firstId).to.not.equal(secondId)
    })

    it('should throw error if passed invalid data', () => {
      const badData = {
        email: null
      }
      expect(
        () => generateId('person', badData)
      ).to.throw('Unable to generate id for person with input {"email":null}')
    })
  })

  describe('for type `connection`', () => {
    it('should generate a hash id', () => {
      const connections = [
        {
          from: 'person5',
          person: 'person1'
        }
      ]
      const hash = generateId('connection', connections[0])
      expect(hash).to.exist()
      expect(hash).to.be.a('string')
    })

    it('should always generate the hash based on input', () => {
      const connections = [
        {
          from: 'person5',
          person: 'person1'
        }
      ]
      const hash = generateId('connection', connections[0])
      const secondHash = generateId('connection', connections[0])
      expect(hash).to.exist()
      expect(hash).to.be.a('string')
      expect(secondHash).to.exist()
      expect(secondHash).to.be.a('string')
      expect(secondHash).to.equal(hash)
    })

    it('should generate different values for different inputs', () => {
      const connections = [
        {
          from: 'person5',
          person: 'person1'
        },
        {
          from: 'person99',
          person: 'person101'
        }
      ]
      const firstId = generateId('connection', connections[0])
      const secondId = generateId('connection', connections[1])
      expect(firstId).to.exist()
      expect(firstId).to.be.a('string')
      expect(secondId).to.exist()
      expect(secondId).to.be.a('string')
      expect(firstId).to.not.equal(secondId)
    })

    it('should throw error if passed invalid data', () => {
      const badData = {
        from: null,
        person: 'person4'
      }
      expect(
        () => generateId('connection', badData)
      ).to.throw('Unable to generate id for connection with input {"from":null,"person":"person4"}')
    })
  })

  describe('for unrecognised type', () => {
    it('should generate a generic random hash', () => {
      const hash = generateId('goobz', { name: 'things' })
      expect(hash).to.exist()
      expect(hash).to.be.a('string')
    })
  })

  describe('for no provided type', () => {
    it('should generate a generic random hash', () => {
      const hash = generateId()
      expect(hash).to.exist()
      expect(hash).to.be.a('string')
    })
  })
})
