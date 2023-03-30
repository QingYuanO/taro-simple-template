/* eslint-disable no-undef */

Component({
  properties: {
    // music-play | music-stop | move-up-down | download | sort | copy | vertical-more | note | video | excel | word | pdf | ppt | play-circle | music | play-stop-circle | play-stop-circle1 | mediaMaterial | arrow-up-circle | email | phone1 | address | x-square | wechart-fill | help-circle | square | subtract-checked | square-ckecked | more-horizontal | unbound | authorization-manage | task | user | gift | qr | partner | stop-circle | log-in | material-square | promote | customer-clues | personal-card | arrow-down | repeat | unlock | leaver | phone-outgoing | logo | empty | women | user-info | service | tip | delete | clear | close | down | doubt | date | file-plus | file-text | lock | id-card | left | external-link | ad-material | edit | camera | men | leaver-message | phone | plus-square | right | plus-circle | message-collect | square-check | send | search | save | up | my-article | warning-circle-fill | warning-circle | wechart | check-circle-fill | alert-rimless | check-circle | alert-circle | delete-circle | grid
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size / 750 * wx.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 18 / 750 * wx.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
