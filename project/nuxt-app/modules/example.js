export default function ExampleModule(moduleOptions) {
    console.log(moduleOptions.token)
    console.log(this.options.exampleMsg, this.options);

    this.nuxt.hook('ready', async nuxt => {
        console.log('nuxt is ready.');
    })
    this.nuxt.hook('error', async error => {
        // Your custom code here
    })
    this.nuxt.hook('close', async nuxt => {
        // Your custom code here
    })
    this.nuxt.hook('listen', async (server, { host, port }) => {
        // Your custom code here
    })
    this.nuxt.hook('modules:done', moduleContainer => {
        // This will be called when all modules finished loading
    })

    this.nuxt.hook('render:before', renderer => {
        // Called after the renderer was created
    })

    this.nuxt.hook('build:compile', async ({ name, compiler }) => {
        // Called before the compiler (default: webpack) starts
    })

    this.nuxt.hook('generate:before', async generator => {
        // This will be called before Nuxt generates your pages
    })
    // Register `plugin.js` template
    // this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}