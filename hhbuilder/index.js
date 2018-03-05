// your code goes here ...
const form = document.querySelector('form');
const age = document.querySelector('input[name="age"]');
const relationship = document.querySelector('select')
const household = [];

// Form valid only if the following are true
age.required = true;
relationship.required = true;

// console.dir(form);

function handleSubmit(e) {
  e.preventDefault();
  checkAge();
  checkRelationship();

}

function checkAge() {
  // check if it is a number first or less than 1
  let currAge = parseInt(age.value);
  if (!isNumeric(age.value) || currAge < 1) {
    // show error message
  }
  console.dir(age);
}

function checkRelationship() {
  // console.dir(relationship);
  // console.log('What is the relationship value: ', relationship.value);
}

function isNumeric(num) {
  return !isNan(num);
}

form.addEventListener('submit', handleSubmit);
relationship.addEventListener('change', checkRelationship());
