module.exports = {
    apps: [
      {
        name: "noteServer",
        script: "./noteServer.js",
        watch: true,
        instances: 2,
        exec_mode: "cluster",
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "authServer",
        script: "./authServer.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "gateway",
        script: "./gateway.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "statsServer",
        script: "./statsServer.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "fileServer",
        script: "./fileServer.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
    ]
  }