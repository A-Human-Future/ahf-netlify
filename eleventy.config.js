import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

export default function (config) {
  // Adds a short hash of the file's contents to an asset URL, so the URL only
  // changes when the file does. Looks in src first (JS) then dist (compiled CSS).
  config.addFilter('assetUrl', url => {
    for (const dir of ['src', 'dist']) {
      try {
        const hash = createHash('md5')
          .update(readFileSync(`${dir}${url}`))
          .digest('hex')
          .slice(0, 8);
        return `${url}?v=${hash}`;
      } catch {}
    }
    console.warn(`[assetUrl] Couldn't find ${url} in src or dist, so it won't be cache-busted`);
    return url;
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  config.addPassthroughCopy('./src/audio');
  config.addPassthroughCopy('./src/fonts');
  config.addPassthroughCopy('./src/js');
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/_headers');

  // Reload the browser when Sass writes new CSS to dist
  config.setServerOptions({
    watch: ['dist/css/**/*.css']
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
}
