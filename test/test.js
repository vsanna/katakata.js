var assert = require('assert');
var Katakata = require('../src/katakata');

describe('katakata.js tests', ()=>{
  it('katakata has several default parameters', ()=>{
     var kata = new Katakata({});
     assert.equal(kata.text, 'katakata');
  })

})
