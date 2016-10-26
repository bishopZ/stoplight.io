new Vue({
  el: '#design',

  // this is required if we need to use {{foo}} directly in the .html page
  // we must do ${foo} instead of {{foo}} because jekyll uses {{}} syntax already
  delimiters: ['${', '}'],

  data: {
    left: [
      {
        title: 'Get started in 30 seconds.',
        features: [{
          title: 'Automatic API Discovery.',
          message: 'Send HTTP traffic through Prism, and Stoplight will map out your API specification.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Start From Scratch.',
          message: 'Don\'t have an API yet? No problem! Design first is the way to go.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'Model your APIs with intuitive visual editors.',
        features: [{
          title: 'Describe Endpoints',
          message: 'Headers, bodies, multiple responses, query string params, you name it.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'CRUD Builder',
          message: 'Quickly create all of the endpoints for a resource, and the corresponding models.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'Instant mock servers.',
        features: [{
          title: 'Flexible Mocking',
          message: 'Mock the entire API, or just particular endpoints.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'Share your API.',
        features: [{
          title: 'Invite Teammates',
          message: 'Invite teammates to view and collaborate on your API designs privately.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }
    ],
    right: [
      {
        features: [{
          title: 'OAS & RAML Import',
          message: 'Already have a specification file? Import it with a click.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Programatic Access',
          message: 'Already generate a specification file from code? Build processes around our API to automatically import.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Create Models',
          message: 'Build up complex models quickly with our JSON Schema editor, and then reference them.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Shared Models',
          message: 'Create a repository of models, and share them amongst your APIs.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Dynamic Mocking',
          message: 'Define response schemas for your endpoints, and Stoplight will generate example data.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        features: [{
          title: 'One Click Export',
          message: 'Export to OAS or RAML using our API.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }
    ],
  },

  computed: {
    mobile() {
      const combined = _.cloneDeep(this.left);
      for (const i in combined) {
        combined[i].features = combined[i].features.concat(this.right[i].features);
      }
      return combined;
    },
  }
});
