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
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'Add some basic options',
        features: [{
          title: 'Choose a title, logo, and favicon',
          message: 'Enhance your docs with a gif as a logo.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'Advanced Options',
        features: [{
          title: 'Basic Authentication',
          message: 'Protect your docs with a username and password.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        },{
          title: 'Custom Javascript',
          message: 'Add some extra Javascript to your docs.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'Preview and Publish',
        features: [{
          title: 'Preview',
          message: 'View your docs before publishing.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Custom Domain',
          message: 'See your docs at any domain with SSL included',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
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
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Mocking',
          message: 'Enable mocked responses in the Try it out section.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Enable some integrations',
          message: 'Turn on Segment, Intercom, or Google Analytics.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Custom Variables',
          message: 'Request user input variables such an API key to be used across your docs.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Use our domain',
          message: 'Pick a subdomain and base path where your docs will be hosted',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Embedded Your Docs',
          message: 'Embed your docs on another website.',
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
