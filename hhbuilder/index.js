// your code goes here ...
const form = document.querySelector('form');
const addButton = document.querySelector('.add');
const house = document.querySelector('ol.household');
const builder = document.querySelector('div.builder');

const age = document.querySelector('input[name="age"]');
const relationship = document.querySelector('select');
const smoker = document.querySelector('input[name="smoker"]');

const household = [];
let index = 0;

// CURRENT TODO:

// - Household li has span button to remove that member
// - JSON.stringify() the household array and append to ".debug" on submit
//   - check if household isn't empty first before sending

// Prevent default submit behavior
addButton.type = 'button';

// // Delete these
console.dir(form);
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

function clearForm() {
  console.log('Reset form works: ', form.reset);
  document.querySelector('ul.preview li.age').textContent = 'Age: ';
  document.querySelector('ul.preview li.relationship').textContent = 'Relationship: ';
  document.querySelector('ul.preview li.smoker').textContent = 'Habit: Non-smoker';
  form.reset();
}

function handleAdd(e) {
  const member = {};
  console.log('add button clicked');

  if (checkAge() && checkRelationship()) {
    const addAge = age.value;
    const addRelationship = relationship.value;
    const addSmoker = checkSmoke();
    // const preview = document.querySelector('ul.preview').cloneNode(true);
    const html = `
      <li data-index=${index}>
        <strong>Family Member</strong>
        <ul class="family" data-index="${index}">
            <li class="age">Age: ${age.value}</li>
            <li class="relationship">Relationship: ${relationship.value}</li>
            <li class="smoker">Habit: ${checkSmoke()}</li>
        </ul>
      </li>
    `

    member.age = addAge;
    member.relationship = addRelationship;
    member.smoker = addSmoker;
    member.index = index;
    household.push(member);

    house.insertAdjacentHTML('beforeend', html);

    index++;
    clearForm();
  }
}

function handlePreviewChange(e) {
  const type = e.target.type;

  if (type === 'text') {
    const pAge = document.querySelector('ul.preview li.age');
    pAge.textContent = 'Age: ' + e.target.value;
  } else if (type === 'select-one') {
    const pRel = document.querySelector('ul.preview li.relationship');
    pRel.textContent = 'Relationship: ' + e.target.value;
  } else if (type === 'checkbox') {
    const pSmoke = document.querySelector('ul.preview li.smoker');
    pSmoke.textContent = 'Habit: ' + checkSmoke();
  } else {
    console.error('Invalid event type: ', e.target);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  console.log('Submit has been fired');

}

function initialize() {
  const html = `
    <h3>Family Member Preview</h3>
    <ul class="preview" data-index="${index}">
        <li class="age">Age: ${age.value}</li>
        <li class="relationship">Relationship: ${relationship.value}</li>
        <li class="smoker">Habit: ${checkSmoke()}</li>
    </ul>
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
