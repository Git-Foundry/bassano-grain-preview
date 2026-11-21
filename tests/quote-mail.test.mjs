import test from 'node:test';
import assert from 'node:assert/strict';
import {compose, recipient} from '../assets/js/quote/compose.mjs';
test('preserves international text, multiline content and literal delimiters',()=>{
  const result=compose('Rye & oats','Zoé #1\nA&B');
  const link=new URL(result.url);
  assert.equal(link.pathname,recipient);
  assert.equal(link.searchParams.get('body'),'Zoé #1\r\nA&B');
  assert.equal(link.searchParams.get('subject'),'Rye & oats');
});
test('cap covers the encoded URI, including unusually long subjects',()=>{
  for(const n of [1,300,1750,1800,1900,5000]){
    const r=compose('穀'.repeat(n),'é&#'.repeat(n));
    assert(r.url.length<=1800);
    if(r.compact) assert(r.copiedUrl.length<=1800);
    assert.equal(r.fullText,'é&#'.repeat(n));
  }
});
