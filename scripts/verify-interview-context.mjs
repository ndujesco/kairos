// Pure regression checks: no API credits, accounts or database writes.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../src/lib/interview.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022}}).outputText;
const {fallbackInterview, interviewContext, interviewReadiness, MAX_INTERVIEW_QUESTIONS, INTAKE_OPENER} = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
let checks = 0;
const pass = label => { checks++; console.log('PASS ' + label); };
const transcript = (...answers) => answers.flatMap(text => [{from:'ai',text:INTAKE_OPENER},{from:'me',text}]);
const add = (messages, turn, text) => [...messages,{from:'ai',text:turn.reply},{from:'me',text}];
function complete(base, attachments = [], profileName = '') {
  let messages = [...base];
  let turn = fallbackInterview(messages, attachments, false, profileName);
  while (!turn.done && messages.filter(m => m.from === 'me').length < MAX_INTERVIEW_QUESTIONS) {
    let answer;
    if (/RRR|Remita/.test(turn.reply)) answer = 'RRR: 000000000000';
    else if (/supporting document.*upload/i.test(turn.reply)) answer = 'I will add the supporting documents later.';
    else if (/when.*(?:due|needed)|missing that payment|delayed/i.test(turn.reply)) answer = 'The payment is due next week. Otherwise I cannot continue.';
    else if (/difficult|circumstances|shortfall/i.test(turn.reply)) answer = 'My family lost income and cannot afford the bill.';
    else throw new Error('Unexpected missing-topic question: ' + turn.reply);
    messages = add(messages, turn, answer);
    turn = fallbackInterview(messages, attachments, false, profileName);
  }
  assert.equal(turn.done, true);
  assert.ok(messages.filter(m => m.from === 'me').length <= MAX_INTERVIEW_QUESTIONS);
  return turn;
}
const first = transcript('Hi I am Miracle and I need help for school fees.');
const next = fallbackInterview(first);
assert.equal(next.done, false);
assert.match(next.reply, /which school.*how much/i);
assert.doesNotMatch(next.reply, /who is affected|name.*person/i);
pass('does not ask Miracle to identify herself again');
const exact = add(first,next,'I am the one affected, I am a UNILAG student and I need 300,000 for my fees');
const basic = fallbackInterview(exact);
assert.equal(basic.done,false);
assert.match(basic.reply,/Remita.*Reference/i);
assert.doesNotMatch(basic.reply,/what.*total amount|which school/i);
const ready = complete(exact);
assert.equal(ready.extracted.title,'Help Miracle pay school fees');
assert.deepEqual(ready.extracted.budget,[{label:'School fees',amount:300000,vendorName:'University of Lagos'}]);
pass('retains supplied facts but explores the actual case before finishing');

// Reconstructed from the actual Ugo recording at 0:23-0:57.
let original = transcript('I am Ndujekwu Ugochukwu, a final year indigent orphan and I need to pay my school fees');
let turn = fallbackInterview(original);
assert.match(turn.reply,/which school.*how much/i);
original = add(original,turn,'UNILAG, I need to pay 300000');
turn = fallbackInterview(original);
assert.match(turn.reply,/Remita Unique Reference/);
assert.equal(interviewContext(original).amount,300000);
original = add(original,turn,'Yes, 3456 8835 9933');
turn = fallbackInterview(original);
assert.match(turn.reply,/supporting document.*name.*300,000.*University of Lagos/i);
original = add(original,turn,'No for now.');
turn = fallbackInterview(original);
assert.match(turn.reply,/add.*after publishing/i);
assert.match(turn.reply,/when.*due.*studies/i);
original = add(original,turn,'I am final year student. If I do not pay I cannot graduate.');
turn = fallbackInterview(original);
assert.equal(turn.done,true);
assert.equal(turn.extracted.title,'Help Ndujekwu Ugochukwu pay school fees');
assert.equal(turn.extracted.budget[0].amount,300000);
assert.equal(original.filter(m=>m.from==='me').length,5);
pass('original Ugo exchange covers school, amount, reference, evidence and urgency');

const amountOnly = fallbackInterview(transcript('I am Miracle. I need 300k for school fees.'));
assert.match(amountOnly.reply,/which school/i);
assert.doesNotMatch(amountOnly.reply,/how much|what.*amount/i);
pass('asks only for the missing institution');
const schoolOnly = fallbackInterview(transcript('I am Miracle. I need fees for UNILAG.'));
assert.match(schoolOnly.reply,/total amount.*University of Lagos/i);
pass('asks for the missing amount before moving to supporting detail');
const numeric = complete(add(transcript('I am Miracle. I need fees for UNILAG.'),schoolOnly,'300000'));
assert.equal(numeric.extracted.budget[0].amount,300000);
pass('understands a numeric answer in the context of its amount question');
const later = fallbackInterview([...first,{from:'me',text:'Can I add my documents later?'}]);
assert.match(later.reply,/add.*after publishing/i);
assert.match(later.reply,/which school/i);
pass('answers document questions and retains prior facts');
const payout = fallbackInterview([...first,{from:'me',text:'Who gets the money?'}]);
assert.match(payout.reply,/paid directly/i);
pass('answers the creator’s payment question directly');
const corrected = complete([...exact,{from:'me',text:'Actually I need 350k, not 300k.'}]);
assert.equal(corrected.extracted.budget[0].amount,350000);
pass('latest amount correction supersedes the earlier amount');
const ids = interviewContext(transcript('I am Miracle and need school fees at UNILAG. RRR: 345688359933. NIN: 12345678901.'));
assert.equal(ids.amount,null);
pass('never mistakes an RRR or NIN for money');
const medical = complete(transcript('My daughter Ada needs surgery at Example Hospital. The total is 250000 naira.'),[],'Parent Name');
assert.equal(medical.extracted.title,'Help Ada with medical care');
assert.equal(medical.extracted.budget[0].amount,250000);
pass('keeps a different beneficiary separate from the signed-in organizer');
const documentQuestion = complete([...exact,{from:'me',text:'Do I need a hospital bill?'}]);
assert.equal(documentQuestion.extracted.category,'Education');
pass('a question about document types does not change the cause');
const demo = complete(transcript('This is a demonstration. Use Ada Example, tuition due at Example School next week, 10000 naira, payable directly to Example School for tuition.'),['fee-notice.pdf']);
assert.equal(demo.extracted.budget[0].vendorName,'Example School');
assert.doesNotMatch(demo.reply+' '+demo.extracted.title+' '+demo.extracted.story,/\b(?:demo|demonstration|prototype|simulated)\b/i);
pass('accepts supplied examples without exposing internal context');
assert.equal(MAX_INTERVIEW_QUESTIONS,8);
assert.equal(fallbackInterview(transcript(...Array(7).fill('I need help.'))).done,false);
const limit = fallbackInterview(transcript(...Array(8).fill('I need help.')));
assert.equal(limit.done,true);
assert.equal(limit.extracted.budget.length,0);
pass('stops at eight answers and leaves genuinely missing amounts for review');
const amountQuestion = 'What is the total amount needed for University of Lagos?';
const docQuestion = 'What supporting document can you upload?';
const screenshot = [
  ...transcript('I am Miracle. I need help with school fees at UNILAG.'),
  {from:'ai',text:docQuestion},{from:'me',text:'Yes I will add it later'},
  {from:'ai',text:amountQuestion},{from:'me',text:'Just the 300000 Tuition'},
];
const tuition = fallbackInterview(screenshot);
assert.doesNotMatch(tuition.reply,/what is the total amount/i);
assert.equal(complete(screenshot).extracted.budget[0].amount,300000);
pass('recognizes 300000 Tuition without repeating the amount question');
for (const answer of ['300000 tuition','300000 for school fees','The tuition is 300000','Just the 300000','300000 only','It is 300000']) {
  const messages = add(transcript('I am Miracle. I need fees for UNILAG.'),{reply:amountQuestion},answer);
  assert.equal(interviewContext(messages).amount,300000,answer);
  assert.doesNotMatch(fallbackInterview(messages).reply,/what is the total amount/i,answer);
}
pass('accepts ordinary unformatted amount replies and fee labels');
for (const answer of ['RRR: 345688359933','NIN: 12345678901','My account: 1234567890','Due 30 November 2026','2026/2027 tuition']) {
  assert.equal(interviewContext([{from:'ai',text:amountQuestion},{from:'me',text:answer}]).amount,null,answer);
}
pass('does not turn identifiers or fee-session dates into money');
const fullySupplied = transcript('I am Miracle. I need 300000 tuition at UNILAG. My family lost income. The fees are due next week and RRR is 000000000000. I will add the payment advice later.');
assert.equal(fallbackInterview(fullySupplied).done,true);
assert.equal(fallbackInterview(fullySupplied).extracted.budget[0].amount,300000);
pass('has no turn minimum when the full case is already supplied');
assert.equal(interviewReadiness(transcript('I am Miracle. I need 300000 tuition at UNILAG.'),['fee-notice.pdf']).documents,true);
assert.equal(fallbackInterview(transcript('I am Miracle. I need 300000 tuition at UNILAG. RRR is 000000000000. The fees are due tomorrow and my family lost income.'),['fee-notice.pdf']).done,true);
pass('accepted uploads count as evidence without demanding another file');
assert.equal(interviewContext(transcript('I am sick and need 500k for treatment at LUTH.'),'Abby').name,'Abby');
pass('retains the fix for a medical condition being mistaken for a name');
console.log(`Verified ${checks} contextual interview checks.`);
