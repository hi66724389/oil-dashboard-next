module.exports = {
  apps: [
    {
      name: "oil-dashboard",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 5000",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
    {
      name: "oil-dashboard-dev",
      script: "node_modules/next/dist/bin/next",
      args: "dev -p 5000",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
    },
  ],
};
