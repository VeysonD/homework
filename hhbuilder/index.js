// your code goes here ...
const form = document.querySelector('form');
const addButton = document.querySelector('.add');
const house = document.querySelector('ol.household');
const builder = document.querySelector('div.builder');

const age = document.querySelector('input[name="age"]');
const relationship = document.querySelector('select');
const smoker = document.querySelector('input[name="smoker"]');

const household = [];

// CURRENT TODO:
// - Change preview div member as they are being typed into the form
// - Add button clears the preview div and adds it to the household ol
// - Household li has span button to remove that member
// - JSON.stringify() the household array and append to ".debug" on submit
//   - check if household isn't empty first before sending

// Prevent default submit behavior
addButton.type = 'button';

// // Delete these
// console.dir(form);
// console.dir(addButton);
// console.dir(house);

function checkAge() {
  // check if it is a number first or less than 1
  let currAge = parseInt(age.value);
  if (!isNumeric(age.value) || currAge < 1) {
    console.error('this value is NO GOOD: ', age.value);
    return false;
    // show error message
  } else {
    console.log('Here is the current age: ', currAge);
    return true;
  }

}

function checkRelationship() {
  // console.dir(relationship);
  // console.log('What is the relationship value: ', relationship.value);
  if (relationship.value === '') {
    console.error('this relationship is NO GOOD: ', relationship.value);
    return false;
  } else {
    console.log('Current relationship: ', relationship.value);
    return true;
  }
}

function checkSmoke() {
  if (smoker.checked) {
    return 'Smoker';
  } else {
    return 'Non-smoker';
  }
}

function handleAdd(e) {
  const member = {};
  console.log('add button clicked');

  if (checkAge() && checkRelationship()) {
    member.age = age.value;
    member.relationship = relationship.value;
    member.smoker = checkSmoke();
    console.log('Currrent member: ', member);
  }
}

function handlePreviewChange(e) {
  console.log('What changed: ', e);
}

function handleSubmit(e) {
  e.preventDefault();
  console.log('Submit has been fired');

}

function initialize() {
  const html = `
    <ol class="preview">
      <li class="age">${age.value}</li>
      <li class="relationship">${relationship.value}</li>
      <li class="smoker">${checkSmoke()}</li>
    </ol>
  `
  builder.insertAdjacentHTML('beforeend', html);
}

function isNumeric(num) {
  return !isNaN(num);
}


addButton.addEventListener('click', handleAdd);
form.addEventListener('submit', handleSubmit);

smoker.addEventListener('change', handlePreviewChange);
relationship.addEventListener('change', handlePreviewChange);
age.addEventListener('keyup', handlePreviewChange);

initialize();
