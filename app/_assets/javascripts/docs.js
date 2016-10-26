new Vue({
  el: '#docs',

  // this is required if we need to use {{foo}} directly in the .html page
  // we must do ${foo} instead of {{foo}} because jekyll uses {{}} syntax already
  delimiters: ['${', '}'],

  data: {
    left: [
      {
        title: 'Layout & Theming',
        features: [{
          title: 'Pick a layout',
          message: 'Choose between a large or constrained layout.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/docs/theming.png')`,
          },
        }],
      }, {
        title: 'Add some basic options',
        features: [{
          title: 'Choose a title, logo, and favicon',
          message: 'Enhance your docs with a gif as a logo.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/docs/mocking.png')`,
          },
        }],
      }, {
        title: 'Advanced Options',
        features: [{
          title: 'Basic Authentication',
          message: 'Protect your docs with a username and password.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/docs/custom-integrations.png')`,
          },
        },{
          title: 'Custom Javascript',
          message: 'Add some extra Javascript to your docs.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/docs/custom-variables.png')`,
          },
        }],
      }, {
        title: 'Preview and Publish',
        features: [{
          title: 'Preview',
          message: 'View your docs before publishing.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/docs/implement-it.png')`,
          },
        }],
      }
    ],
    right: [
      {
        features: [{
          title: 'Add some custom theming.',
          message: 'Pick three colors and we will generate the rest, or tackle some custom CSS.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/docs/layout.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Mocking',
          message: 'Enable mocked responses in the Try it out section.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/docs/basic-options.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Enable some integrations',
          message: 'Turn on Segment, Intercom, or Google Analytics.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/docs/basic-auth.png')`,
          },
        }, {
          title: 'Custom Variables',
          message: 'Request user input variables such an API key to be used across your docs.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/docs/custom-javascript.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Implement it',
          message: 'Host on our domain, your own custom domain, or embed to another website.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/docs/preview.png')`,
          },
        }],
      }
    ],
  },

  computed: {
    mobile() {
      var combined = _.cloneDeep(this.left);
      for (var i in combined) {
        combined[i].features = combined[i].features.concat(this.right[i].features);
      }
      return combined;
    },
  }
});
