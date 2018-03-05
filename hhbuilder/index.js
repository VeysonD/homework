const form = document.querySelector('form');
const addButton = document.querySelector('.add');
const house = document.querySelector('ol.household');
const builder = document.querySelector('div.builder');

const age = document.querySelector('input[name="age"]');
const relationship = document.querySelector('select');
const smoker = document.querySelector('input[name="smoker"]');

let household = [];
let index = 0;

// Prevent default submit behavior
addButton.type = 'button';


function checkAge() {
  let currAge = parseInt(age.value);
  if (!isNumeric(age.value) || currAge < 1 || age.value ==='') {
    console.error('this value is NO GOOD: ', age.value);
    handleError('num');
    return false;
  } else {
    clearErrors('num');
    return true;
  }
}

function checkHousehold() {
  if (household.length === 0) {
    handleError('submit');
    return false;
  } else {
    clearErrors('submit');
    return true;
  }
}

function checkRelationship() {
  if (relationship.value === '') {
    console.error('this relationship is NO GOOD: ', relationship.value);
    handleError('rel');
    return false;
  } else {
    clearErrors('rel');
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

function clearErrors(type) {
  if (type === 'num') {
    document.querySelectorAll('.error h2')[0].textContent = '';
  } else if (type === 'rel') {
    document.querySelectorAll('.error h2')[1].textContent = '';
  } else if (type === 'submit') {
    document.querySelectorAll('.error h2')[2].textContent = '';
  } else if (type === 'all') {
    document.querySelectorAll('.error h2')[0].textContent = '';
    document.querySelectorAll('.error h2')[1].textContent = '';
  } else {
    document.querySelectorAll('.error h2')[2].textContent = '';
    console.error('wrong error type');
  }
}

function clearForm() {
  clearErrors('all');
  document.querySelector('ul.preview li.age').textContent = 'Age: ';
  document.querySelector('ul.preview li.relationship').textContent = 'Relationship: ';
  document.querySelector('ul.preview li.smoker').textContent = 'Habit: Non-smoker';
  form.reset();
}

function handleAdd(e) {
  const member = {};
  const ageCheck = checkAge();
  const relCheck = checkRelationship();

  if (ageCheck && relCheck) {
    const addAge = age.value;
    const addRelationship = relationship.value;
    const addSmoker = checkSmoke();

    const html = `
      <li data-index=${index}>
        <strong>Family Member</strong>
        <ul class="family" data-index="${index}">
            <li class="age">Age: ${age.value}</li>
            <li class="relationship">Relationship: ${relationship.value}</li>
            <li class="smoker">Habit: ${checkSmoke()}</li>
        </ul>
        <button class="remove" type="button" onClick=handleRemove(event)>Remove</button>
      </li>
    `

    member.age = addAge;
    member.relationship = addRelationship;
    member.smoker = addSmoker;
    member.index = index;
    household.push(member);

    house.insertAdjacentHTML('beforeend', html);

    index++;
    checkHousehold();
    clearForm();
  }
}

function handleError(type) {
  const error = document.querySelectorAll('.error h2');
  if (type === 'num') {
    error[0].textContent = 'Please select a valid age that is greater than 0';
  } else if (type === 'rel') {
    error[1].textContent = 'Please select a reationship';
  } else if (type === 'submit') {
    error[2].textContent = 'Please add at least one member before submitting';
  } else {
    console.error('handleError error with a type of: ', type);
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

function handleRemove(e) {
  const removeIndex = parseInt(e.target.parentNode.attributes[0].value);
  const removeNode = document.querySelector(`li[data-index="${removeIndex}"]`);

  household = household.filter(member => {
    return member.index !== removeIndex;
  });

  removeNode.remove();
}

function handleSubmit(e) {
  const debug = document.querySelector('pre');
  e.preventDefault();

  if (checkHousehold()) {
    const houseJSON = JSON.stringify(household);
    debug.textContent = houseJSON;
    debug.style.display = 'inline';
  } else {
    console.error('Make sure to add at least one member before submitting');
  }
}

function initialize() {
  const html = `
  <div class="error" style="color:red;">
    <h2></h2>
    <h2></h2>
    <h2></h2>
  </div>
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
