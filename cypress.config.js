// let's increase the browser window size when running headlessly
// this will produce higher resolution images and videos
// https://on.cypress.io/browser-launch-api
module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(
          'launching browser %s is headless? %s',
          browser.name,
          browser.isHeadless,
        )

        // the browser width and height we want to get
        // our screenshots and videos will be of that resolution
        const width = 1920
        const height = 1080

        console.log('setting the browser window size to %d x %d', width, height)

        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push(`--window-size=${width},${height}`)

          // force screen to be non-retina and just use our given resolution
          launchOptions.args.push('--force-device-scale-factor=1')
        }

        if (browser.name === 'electron' && browser.isHeadless) {
          // might not work on CI for some reason
          launchOptions.preferences.width = width
          launchOptions.preferences.height = height
        }

        if (browser.name === 'firefox' && browser.isHeadless) {
          launchOptions.args.push(`--width=${width}`)
          launchOptions.args.push(`--height=${height}`)
        }

        // IMPORTANT: return the updated browser launch options
        return launchOptions
      })
    },
  },
}
