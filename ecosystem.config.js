module.exports = {
    apps: [
      {
        name: "Backend_Technician",
        cwd: "/home/ubuntu/Backend_Technician",
        script: "dist/src/main.js",
        instances: 1,            // 1 instance for now
        exec_mode: "fork",       // fork mode for single instance
        autorestart: true,
        watch: false,
        max_memory_restart: "400M",
        env: {
          NODE_ENV: "production",
          PORT: 5000,
        },
      },
    ],
  };
  