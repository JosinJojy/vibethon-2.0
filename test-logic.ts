import { formatEventDate } from './lib/dates';
import { getButtonState } from './components/sections/EventActions';

function runTests() {
  console.log('--- DATE FORMATTING ---');
  console.log('Null:', formatEventDate(null));
  console.log('Invalid:', formatEventDate('not-a-date'));
  console.log('Valid (+05:30):', formatEventDate('2026-09-25T10:00:00+05:30'));
  
  console.log('\n--- BUTTON STATE LOGIC ---');
  const now = Date.now();
  
  // Test 1: Missing URL
  console.log('Missing URL:', getButtonState(null, null, null, now));
  
  // Test 2: Invalid URL
  console.log('Invalid URL:', getButtonState('javascript:alert(1)', null, null, now));
  
  // Test 3: Pre-open
  const futureOpen = new Date(now + 100000).toISOString();
  console.log('Pre-open:', getButtonState('https://unstop.com/test', futureOpen, null, now));
  
  // Test 4: Open
  const pastOpen = new Date(now - 100000).toISOString();
  const futureClose = new Date(now + 100000).toISOString();
  console.log('Open:', getButtonState('https://unstop.com/test', pastOpen, futureClose, now));
  
  // Test 5: Closed
  const pastClose = new Date(now - 100000).toISOString();
  console.log('Closed:', getButtonState('https://unstop.com/test', pastOpen, pastClose, now));
}

runTests();
