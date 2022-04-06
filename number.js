const $form = $('#number-form');
const $results = $('#results');
const baseURL = 'http://numbersapi.com';
const favNumber = 16;

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  console.log(data);
});

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
$(document).ready(function () {
  const nums = [1, 16, 21, 22];
  $.getJSON(`${baseURL}/1,16,21,22?json`).then(data => {
    for (let i of nums) {
      $results.append($(`<li class="mb-3">${data[i]}</li>`));
    }
    console.log(data);
  });
});

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

$form.on('submit', e => {
  e.preventDefault();
  $results.empty();
  const $number = $('#number-input').val();

  Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${baseURL}/${$number}?json`);
    })
  )
    .then(data =>
      data.forEach(num =>
        $results.append($(`<li class="mb-3">${num.text}</liclass=>`))
      )
    )
    .catch(err => console.log(err));

  $form.trigger('reset');
});
