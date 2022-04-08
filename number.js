const $form = $('#number-form');
const $results = $('#results');
const baseURL = 'http://numbersapi.com';
const favNumber = 16;

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

async function getFact() {
  let fact = await axios.get(`${baseURL}/${favNumber}?json`);
  console.log(fact.data.text);
}
getFact();

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
$(document).ready(function () {
  const nums = [1, 16, 21, 22];
  async function getMultipleFacts() {
    let fact = await axios.get(`${baseURL}/${nums}?json`);
    for (let i of nums) {
      $results.append($(`<li class="mb-3">${fact.data[i]}</li>`));
    }
    console.log(fact.data);
  }
  getMultipleFacts();
});

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

async function getInputFacts() {
  const $number = $('#number-input').val();

  let facts = await Promise.all(
    Array.from({ length: 4 }, () => axios.get(`${baseURL}/${$number}?json`))
  );
  facts.forEach(num =>
    $results.append($(`<li class="mb-3">${num.data.text}</liclass=>`))
  );
}

$form.on('submit', e => {
  e.preventDefault();
  $results.empty();
  getInputFacts();
  $form.trigger('reset');
});
