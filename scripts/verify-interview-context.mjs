// Pure regression checks: no API credits, accounts or database writes.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../src/lib/interview.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022}}).outputText;
const {fallbackInterview, interviewContext, MAX_INTERVIEW_QUESTIONS} = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
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
const ready = fallbackInterview(exact);
assert.equal(ready.done,true);
assert.equal(ready.extracted.title,'Help Miracle pay school fees');
assert.deepEqual(ready.extracted.budget,[{label:'School fees',amount:300000,vendorName:'University of Lagos'}]);
pass('screenshot conversation finishes with the supplied school and amount');
const amountOnly = fallbackInterview(transcript('I am Miracle. I need 300k for school fees.'));
assert.match(amountOnly.reply,/which school/i);
assert.doesNotMatch(amountOnly.reply,/how much|what.*amount/i);
pass('asks only for the missing institution');
const schoolOnly = fallbackInterview(transcript('I am Miracle. I need fees for UNILAG.'));
assert.match(schoolOnly.reply,/total amount.*University of Lagos/i);
assert.doesNotMatch(schoolOnly.reply,/which school/i);
pass('asks only for the missing amount');
const numeric = fallbackInterview([...transcript('I am Miracle. I need fees for UNILAG.'),{from:'ai',text:schoolOnly.reply},{from:'me',text:'300000'}]);
assert.equal(numeric.extracted.budget[0].amount,300000);
pass('understands a numeric answer in the context of its own amount question');
const later = fallbackInterview([...first,{from:'me',text:'Can I add my documents later?'}]);
assert.match(later.reply,/add.*after publishing/i);
assert.match(later.reply,/which school/i);
assert.doesNotMatch(later.reply,/who is affected/i);
pass('answers the document question and retains prior facts');
const payout = fallbackInterview([...first,{from:'me',text:'Who gets the money?'}]);
assert.match(payout.reply,/paid directly/i);
pass('answers the creator’s payment question directly');
const corrected = fallbackInterview([...exact,{from:'me',text:'Actually I need 350k, not 300k.'}]);
assert.equal(corrected.extracted.budget[0].amount,350000);
pass('latest amount correction supersedes the earlier amount');
const ids = interviewContext(transcript('I am Miracle and need school fees at UNILAG. RRR: 345688359933. NIN: 12345678901.'));
assert.equal(ids.amount,null);
pass('never mistakes an RRR or NIN for money');
const medical = fallbackInterview(transcript('My daughter Ada needs surgery at Example Hospital. The total is 250000 naira.'),[],false,'Parent Name');
assert.equal(medical.extracted.title,'Help Ada with medical care');
assert.equal(medical.extracted.budget[0].amount,250000);
pass('keeps a different beneficiary separate from the signed-in organizer');
const documentQuestion = fallbackInterview([...exact,{from:'me',text:'Do I need a hospital bill?'}]);
assert.equal(documentQuestion.extracted.category,'Education');
pass('a question about document types does not change the established cause');
const demo = fallbackInterview(transcript('This is a demonstration. Use Ada Example, tuition due at Example School next week, 10000 naira, payable directly to Example School for tuition.'),['fee-notice.pdf']);
assert.equal(demo.done,true);
assert.equal(demo.extracted.budget[0].vendorName,'Example School');
assert.doesNotMatch(demo.reply+' '+demo.extracted.title+' '+demo.extracted.story,/\b(?:demo|demonstration|prototype|simulated)\b/i);
pass('accepts supplied examples without exposing internal context');
assert.equal(MAX_INTERVIEW_QUESTIONS,7);
const limit = fallbackInterview(transcript(...Array(7).fill('I need help.')));
assert.equal(limit.done,true);
assert.ok(limit.extracted);
assert.equal(limit.extracted.budget.length,0);
pass('stops after seven answers and leaves missing amounts for review');
// Regression: amount with a fee label must not restart the same question.
const amountQuestion = 'What is the total amount needed for University of Lagos?';
const docQuestion = 'Please attach your fee notice or payment advice using Add documents. Do you have one available? You can add it later if needed.';
const screenshot = [
  ...transcript('I am Miracle. I need help with school fees at UNILAG.'),
  {from:'ai',text:docQuestion},
  {from:'me',text:'Yes I will add it later'},
  {from:'ai',text:amountQuestion},
  {from:'me',text:'Just the 300000 Tuition'},
];
const tuition = fallbackInterview(screenshot);
assert.equal(tuition.done,true);
assert.equal(tuition.extracted.budget[0].amount,300000);
assert.doesNotMatch(tuition.reply,/what is the total amount/i);
pass('recognizes the exact 300000 Tuition reply without repeating the amount question');
for (const answer of ['300000 tuition','300000 for school fees','The tuition is 300000','Just the 300000','300000 only','It is 300000']) {
  const turn = fallbackInterview([...transcript('I am Miracle. I need fees for UNILAG.'),{from:'ai',text:amountQuestion},{from:'me',text:answer}]);
  assert.equal(turn.done,true,answer);
  assert.equal(turn.extracted.budget[0].amount,300000,answer);
}
pass('accepts ordinary unformatted amount replies and fee labels');
for (const answer of ['RRR: 345688359933','NIN: 12345678901','My account: 1234567890','Due 30 November 2026','2026/2027 tuition']) {
  assert.equal(interviewContext([{from:'ai',text:amountQuestion},{from:'me',text:answer}]).amount,null,answer);
}
pass('does not turn identifiers or fee-session dates into money');
const oneAnswer = fallbackInterview(transcript('I am Miracle. I need 300000 tuition at UNILAG.'));
assert.equal(oneAnswer.done,true);
assert.equal(oneAnswer.extracted.budget[0].amount,300000);
pass('finishes a complete interview immediately without a minimum or forced extra questions');
const deferred = fallbackInterview([...transcript('I am Miracle. I need help with school fees at UNILAG.'),{from:'ai',text:docQuestion},{from:'me',text:'Yes I will add it later'}]);
assert.match(deferred.reply,/add.*after publishing/i);
pass('acknowledges a document deferred until later in context');
assert.equal(interviewContext(transcript('I am sick and need 500k for treatment at LUTH.'),'Abby').name,'Abby');
pass('retains the fix for a medical condition being mistaken for a name');
console.log(`Verified ${checks} contextual interview checks.`);
