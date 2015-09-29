var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');

module.exports = generators.Base.extend({

  npminstall: function () {
      this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });
  },
  prompting: function () {
      var done = this.async();
      var prompts = [{
        type: 'list',
        name: 'cssPreprocessor',
        message: 'Which CSS preprocessor would you like to use?',
        choices: [{
          name: 'Stylus',
          value: 'stylus',
          checked: true
        }, {
          name: 'SCSS',
          value: 'scss'
        }, {
          name: 'Less',
          value: 'less'
        }, {
          name: 'None (plain css)',
          value: 'none'
        }]
      }];

      this.prompt(prompts, function (props) {
        this.cssPreprocessor = props.cssPreprocessor;

        var cssExtensions = {
          "none": ".css",
          "stylus": ".styl",
          "scss": ".scss",
          "less": ".less"
        };
        this.cssExtension = cssExtensions[this.cssPreprocessor];
        done();
      }.bind(this));
    },
  create: function () {
    this.fs.copy(
            this.templatePath('index.html'),
            this.destinationPath('app/index.html')
          );

    this.fs.copy(
      this.templatePath('main' + this.cssExtension),
      this.destinationPath('app/content/css/main' + this.cssExtension)
    );

    this.template('_package.json', 'package.json');

    this.template('_gulpfile.js', 'gulpfile.js');
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false,
      skipInstall: this.options['skip-install'],
      callback: function () {
        this.log(yosay("All is installed, start the server with the command: gulp serve"));
      }.bind(this)
    });
  }
});
