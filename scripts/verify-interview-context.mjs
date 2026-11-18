// Pure regression checks: no API credits, accounts or database writes.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../src/lib/interview.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022}}).outputText;
const {fallbackInterview, interviewContext, MAX_INTERVIEW_QUESTIONS, MIN_INTERVIEW_QUESTIONS, interviewAskedForDocument} = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
let checks = 0;
const pass = label => { checks++; console.log('PASS ' + label); };
const transcript = (...answers) => answers.flatMap(text => [{from:'ai',text:'Tell me about the cause.'},{from:'me',text}]);
const first = transcript('Hi I am Miracle and I need help for school fees.');
const next = fallbackInterview(first);
assert.equal(next.done, false);
assert.match(next.reply, /which school.*how much/i);
assert.doesNotMatch(next.reply, /who is affected|name.*person/i);
pass('does not ask Miracle to identify herself again');
const exact = [...first,{from:'ai',text:next.reply},{from:'me',text:'I am the one affected, I am a UNILAG student and I need 300,000 for my fees'}];
function complete(base, attachments = []) {
  const messages = [...base];
  let turn = fallbackInterview(messages, attachments);
  for (let i = 0; !turn.done && i < 7; i++) {
    const count = messages.filter(m => m.from === 'me').length;
    if (count < MIN_INTERVIEW_QUESTIONS) assert.equal(turn.done, false);
    const answer = /document|advice|attach|bill.*available/i.test(turn.reply)
      ? 'I can attach my payment advice.'
      : /due|deadline|delayed/i.test(turn.reply) ? 'The fees are due next week.'
      : /difficult|shortfall/i.test(turn.reply) ? 'My family lost income and cannot afford it.'
      : /entire|remaining balance/i.test(turn.reply) ? 'It covers the entire fee.'
      : 'That will let me continue the final year of my studies.';
    messages.push({from:'ai',text:turn.reply},{from:'me',text:answer});
    turn = fallbackInterview(messages, attachments);
  }
  assert.ok(messages.filter(m => m.from === 'me').length >= 5);
  assert.ok(messages.filter(m => m.from === 'me').length <= 7);
  assert.ok(interviewAskedForDocument(messages));
  assert.equal(turn.done, true);
  return turn;
}
const twoAnswers = fallbackInterview(exact);
assert.equal(twoAnswers.done, false);
assert.match(twoAnswers.reply, /attach.*payment advice/i);
const ready = complete(exact);
assert.equal(ready.done,true);
assert.equal(ready.extracted.title,'Help Miracle pay school fees');
assert.deepEqual(ready.extracted.budget,[{label:'School fees',amount:300000,vendorName:'University of Lagos'}]);
pass('screenshot facts are retained, with an early document request and five-question minimum');
const amountOnly = fallbackInterview(transcript('I am Miracle. I need 300k for school fees.'));
assert.match(amountOnly.reply,/which school/i);
assert.doesNotMatch(amountOnly.reply,/how much|what.*amount/i);
pass('asks only for the missing institution');
const schoolOnly = fallbackInterview(transcript('I am Miracle. I need fees for UNILAG.'));
assert.match(schoolOnly.reply,/total amount.*University of Lagos/i);
assert.doesNotMatch(schoolOnly.reply,/which school/i);
pass('asks only for the missing amount');
const numeric = complete([...transcript('I am Miracle. I need fees for UNILAG.'),{from:'ai',text:schoolOnly.reply},{from:'me',text:'300000'}]);
assert.equal(numeric.extracted.budget[0].amount,300000);
pass('understands a numeric answer in the context of its own amount question');
const later = fallbackInterview([...first,{from:'me',text:'Can I add my documents later?'}]);
assert.match(later.reply,/add.*after publishing/i);
assert.match(later.reply,/supporting document.*later/i);
assert.doesNotMatch(later.reply,/who is affected/i);
pass('answers the document question and retains prior facts');
const payout = fallbackInterview([...first,{from:'me',text:'Who gets the money?'}]);
assert.match(payout.reply,/paid directly/i);
pass('answers the creator’s payment question directly');
const corrected = complete([...exact,{from:'me',text:'Actually I need 350k, not 300k.'}]);
assert.equal(corrected.extracted.budget[0].amount,350000);
pass('latest amount correction supersedes the earlier amount');
const ids = interviewContext(transcript('I am Miracle and need school fees at UNILAG. RRR: 345688359933. NIN: 12345678901.'));
assert.equal(ids.amount,null);
pass('never mistakes an RRR or NIN for money');
assert.equal(interviewContext(transcript('I am sick and need 500k for treatment at LUTH.'),'Abby').name,'Abby');
pass('does not mistake a medical condition for the creator’s name');
const medical = complete(transcript('My daughter Ada needs surgery at Example Hospital. The total is 250000 naira.'));
assert.equal(medical.extracted.title,'Help Ada with medical care');
assert.equal(medical.extracted.budget[0].amount,250000);
pass('keeps a different beneficiary separate from the signed-in organizer');
const documentQuestion = complete([...exact,{from:'me',text:'Do I need a hospital bill?'}]);
assert.equal(documentQuestion.extracted.category,'Education');
pass('a question about document types does not change the established cause');
const demo = complete(transcript('This is a demonstration. Use Ada Example, tuition due at Example School next week, 10000 naira, payable directly to Example School for tuition.'),['fee-notice.pdf']);
assert.equal(demo.done,true);
assert.equal(demo.extracted.budget[0].vendorName,'Example School');
assert.doesNotMatch(demo.reply+' '+demo.extracted.title+' '+demo.extracted.story,/\b(?:demo|demonstration|prototype|simulated)\b/i);
pass('accepts supplied examples without exposing internal context');
assert.equal(MIN_INTERVIEW_QUESTIONS,5);
assert.equal(MAX_INTERVIEW_QUESTIONS,7);
const limit = fallbackInterview(transcript(...Array(7).fill('I need help.')));
assert.equal(limit.done,true);
assert.ok(limit.extracted);
assert.equal(limit.extracted.budget.length,0);
pass('stops after seven answers and leaves missing amounts for review');
console.log(`Verified ${checks} contextual interview checks.`);
