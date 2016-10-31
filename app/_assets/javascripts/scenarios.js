new Vue({
  el: '#scenarios',

  // this is required if we need to use {{foo}} directly in the .html page
  // we must do ${foo} instead of {{foo}} because jekyll uses {{}} syntax already
  delimiters: ['${', '}'],

  data: {
    betaEmail: '',
    submitting: false,
    submitted: false,
    error: null,
    referralData: null,
    left: [
      {
        title: 'Debug with simple one step Scenarios.',
        features: [{
          title: 'Send API Requests.',
          message: 'Save requests for later, share them with the team, and send them with a single click.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios/invoke-lambda-functions.png')`,
          },
        }],
      }, {
        title: 'Test with assertions, JSON Schema, and scripts.',
        features: [{
          title: 'Property assertions.',
          message: 'Make sure your web services and lambda functions return what they are supposed to.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios/contract-testing-with-json-schema.png')`,
          },
        }],
      }, {
        title: 'Add steps to chain together more complex scenarios.',
        features: [{
          title: 'Run one step, or the entire scenario.',
          message: 'Capture and use variables to pass data between steps.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios/environments.png')`,
          },
        }],
      }, {
        title: 'One click deploy & share Scenarios.',
        features: [{
          title: 'Share Scenarios',
          message: 'Generate simple URLs to share them with the team, customers, or even the general public.',
          html: `
            <div style='display: inline-block;'>
              <a href='https://app.stoplight.io/scenarios/share/XJtQcjiz8AJwWHbb9?__alias=production'>
                <img width='215' src='https://cdn.stoplight.io/run-buttons/solid-blue.png' alt='Run in Stoplight' style='display: block;' />
              </a>
            </div>
          `,
        }, {
          title: 'Deploy Scenarios',
          message: 'Deployed scenarios can be triggered with a simple GET request.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios/run-scenarios-from-the-command-line.png')`,
          },
        }],
      }
    ],
    right: [
      {
        features: [{
          title: 'Invoke Lambda Functions.',
          message: 'Quick and easy lambda function debugging, without needing to expose them via an API.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios/send-api-requests.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Contract Testing With JSON Schema',
          message: 'Define a JSON schema to add a contract test to your request, or link it to your existing API specification.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios/property-assertions.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Environments',
          message: 'Use environments to quickly change out the variables being used.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios/run-one-step-or-the-entire-scenario.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Run Button',
          message: 'Embed run buttons into your existing documentation, so that your customers can try your API - no software install or signup required.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios/share-scenarios.png')`,
          },
        }, {
          title: 'Run Scenarios From The Command Line',
          message: 'Run scenarios directly from your terminal, with a single command. Integrates easily into your existing continuous integration process.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios/deploy-scenarios.png')`,
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
  },

  methods: {
    addToBeta: function(event) {
      event.preventDefault(event);
      var vm = this;
      var email = vm.betaEmail;

      if (!email.match(/^\S+@\S+$/)) {
        alert('Please enter a valid email.');
        return;
      }

      vm.submitting = true;
      vm.error = null;

      const search = (window.location.search || '?').slice(1);
      const parts = search.split('&');
      let referralToken;
      for (const k of parts) {
        const part = k.split('=');
        if (part[0] === 'ref') {
          referralToken = part[1];
        }
      }

      Untorch.submitSignup({
        email,
        referralToken,
      }, function (error, data) {
        vm.submitting = false;
        if (error) {
          vm.error = error;
        } else {
          vm.submitted = true;
          vm.referralData = data;
        }
      });

      var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open('POST', `https://api.stoplight.io/beta-request`, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({email, referralToken, feature: 'scenarios'}));
    }
  },
});
