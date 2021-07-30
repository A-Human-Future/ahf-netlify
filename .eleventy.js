module.exports = config => {
  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  config.addPassthroughCopy('./src/audio');
  config.addPassthroughCopy('./src/fonts');
  config.addPassthroughCopy('./src/js');
  config.addPassthroughCopy('./src/images');

  config.setBrowserSyncConfig({
    callbacks: {
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false
      }
    }
  });
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
