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
        <div v-if='feature.style' class='timeline-image ml-a' :style='feature.style'></div>
        <div v-if='feature.html' class='timeline-image f ai-c jc-fe ml-a' v-html='feature.html'></div>
      </div>
    </div>`,
  props: ['info'],
});

Vue.component('timeline-right', {
  template: `
    <div>
      <div class='timeline-title'></div>
      <div class='timeline-feature' v-for='feature in info.features'>
        <div v-if='feature.style' class='timeline-image mr-a' :style='feature.style'></div>
        <div v-if='feature.html' class='timeline-image f ai-c mr-a' v-html='feature.html'></div>
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

// Animation

jQuery.extend( jQuery.easing, {
  def: 'easeInOutExpo',
  swing: function (x, t, b, c, d) {
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  },
  easeInExpo: function (x, t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b; if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
});
