Vue.component('timeline-left', {
  template: `
    <div>
      <div class='timeline-title pb-100'>{{info.title}} <div class='timeline-title-dot'></div></div>
      <div class='timeline-feature' v-for='feature in info.features' :feature='feature'>
        <div class='timeline-feature-info pb-100 ml-a'>
          <div class='timeline-feature-title'>{{feature.title}}</div>
          <div class='timeline-feature-message'>{{feature.message}}</div>
          <div class='timeline-info-dot'></div>
        </div>
        <div class='timeline-image ml-a' :style='feature.style'></div>
      </div>
    </div>`,
  props: ['info'],
});

Vue.component('timeline-right', {
  template: `
    <div>
      <div class='timeline-feature pt-50' v-for='feature in info.features' :feature='feature'>
        <div class='timeline-image mr-a mb-100' :style='feature.style'></div>
        <div class='timeline-feature-info pb-100 mr-a'>
          <div class='timeline-feature-title'>{{feature.title}}</div>
          <div class='timeline-feature-message'>{{feature.message}}</div>
        </div>
      </div>
    </div>`,
  props: ['info'],
});

var app = new Vue({
  el: '#vue-timeline',

  // this is required if we need to use {{foo}} directly in the .html page
  // we must do ${foo} instead of {{foo}} because jekyll uses {{}} syntax already
  delimiters: ['${', '}'],

  data: {
    left: [{
      title: 'Debug with simple one step Scenarios.',
      features: [{
        title: 'Send API Requests.',
        message: 'Save requests for later, share them with the team, and send them with a single click.',
        style: {
          backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
        },
      }],
    }],
    right: [{
      features: [{
        title: 'Invoke Lambda Functions.',
        message: 'Quick and easy lambda function debugging, without needing to expose them via an API.',
        style: {
          backgroundImage: `url('https://cdn.stoplight.io/stoplightio/scenarios-hero.png')`,
        },
      }],
    }],
  },
});
