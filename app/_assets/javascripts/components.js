var featureRowTemplate = `
  <li>
    {{feature.title}}
  </li>
`;

Vue.component('feature-row', {
  template: featureRowTemplate,
  props: ['feature'],
});

var app = new Vue({
  el: '#vue-test',

  // this is required if we need to use {{foo}} directly in the .html page
  // we must do ${foo} instead of {{foo}} because jekyll uses {{}} syntax already
  delimiters: ['${', '}'],

  data: {
    features: [{
      title: 'foo',
    }, {
      title: 'bar',
    }],
  },
});
