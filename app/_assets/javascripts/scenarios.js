Vue.component('timeline-left', {
  template: `
    <div>
      <div class='timeline-title'>{{info.title}} <div class='timeline-title-dot'></div></div>
      <div class='timeline-feature' v-for='feature in info.features'>
        <div class='timeline-feature-info f fd-c jc-c ml-a'>
          <div class='timeline-feature-title'>{{feature.title}}</div>
          <div class='timeline-feature-message'>{{feature.message}}</div>
          <div class='timeline-info-dot-right'>
            <i class='fa fa-caret-right'></i>
          </div>
        </div>
        <div class='timeline-image ml-a' :style='feature.style'></div>
      </div>
    </div>`,
  props: ['info'],
});

Vue.component('timeline-right', {
  template: `
    <div>
      <div class='timeline-title'></div>
      <div class='timeline-feature' v-for='feature in info.features'>
        <div class='timeline-image mr-a' :style='feature.style'></div>
        <div class='timeline-feature-info f fd-c jc-c mr-a'>
          <div class='timeline-feature-title'>{{feature.title}}</div>
          <div class='timeline-feature-message'>{{feature.message}}</div>
          <div class='timeline-info-dot-left'>
            <i class='fa fa-caret-left'></i>
          </div>
        </div>
      </div>
    </div>`,
  props: ['info'],
});

var app = new Vue({
  el: '#scenarios',

  // this is required if we need to use {{foo}} directly in the .html page
  // we must do ${foo} instead of {{foo}} because jekyll uses {{}} syntax already
  delimiters: ['${', '}'],

  data: {
    left: [
      {
        title: 'Debug with simple one step Scenarios.',
        features: [{
          title: 'Send API Requests.',
          message: 'Save requests for later, share them with the team, and send them with a single click.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'Test with assertions, JSON Schema, and scripts.',
        features: [{
          title: 'Property assertions.',
          message: 'Make sure your web services and lambda functions return what they are supposed to.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'Add steps to chain together more complex scenarios.',
        features: [{
          title: 'Run one step, or the entire scenario.',
          message: 'Capture and use variables to pass data between steps.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'One click deploy & share Scenarios.',
        features: [{
          title: 'Share Scenarios',
          message: 'Generate simple URLs to share them with the team, customers, or even the general public.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Deploy Scenarios',
          message: 'Deployed scenarios can be triggered with a simple GET request.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
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
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Contract Testing With JSON Schema',
          message: 'Define a JSON schema to add a contract test to your request, or link it to your existing API specification.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Environments',
          message: 'Use environments to quickly change out the variables being used.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        features: [{
          title: 'Run Button',
          message: 'Embed run buttons into your existing documentation, so that your customers can try your API - no software install or signup required.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Run Scenarios From The Command Line',
          message: 'Run scenarios directly from your terminal, with a single command. Integrates easily into your existing continuous integration process.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }
    ],
    mobile: [
      {
        title: 'Debug with simple one step Scenarios.',
        features: [{
          title: 'Send API Requests.',
          message: 'Save requests for later, share them with the team, and send them with a single click.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Invoke Lambda Functions.',
          message: 'Quick and easy lambda function debugging, without needing to expose them via an API.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'Test with assertions, JSON Schema, and scripts.',
        features: [{
          title: 'Property assertions.',
          message: 'Make sure your web services and lambda functions return what they are supposed to.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Contract Testing With JSON Schema',
          message: 'Define a JSON schema to add a contract test to your request, or link it to your existing API specification.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'Add steps to chain together more complex scenarios.',
        features: [{
          title: 'Run one step, or the entire scenario.',
          message: 'Capture and use variables to pass data between steps.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Environments',
          message: 'Use environments to quickly change out the variables being used.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }, {
        title: 'One click deploy & share Scenarios.',
        features: [{
          title: 'Share Scenarios',
          message: 'Generate simple URLs to share them with the team, customers, or even the general public.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Deploy Scenarios',
          message: 'Deployed scenarios can be triggered with a simple GET request.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Run Button',
          message: 'Embed run buttons into your existing documentation, so that your customers can try your API - no software install or signup required.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }, {
          title: 'Run Scenarios From The Command Line',
          message: 'Run scenarios directly from your terminal, with a single command. Integrates easily into your existing continuous integration process.',
          style: {
            backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
          },
        }],
      }
    ],
    betaEmail: '',
  },

  methods: {
    addToBeta: function (email, event) {
      event.preventDefault();

      var buttons = document.getElementsByClassName('register-beta-button') || [];
      var inputs = document.getElementsByClassName('register-beta-input') || [];

      for (var el of buttons) {
        el.setAttribute('disabled', 'disabled');
      };

      for (var el of inputs) {
        el.setAttribute('disabled', 'disabled');
      };

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.stoplight.io/beta/email`, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify({email}));
    }
  },
});
