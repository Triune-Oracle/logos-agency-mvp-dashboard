module.exports = {
  apps: [{
    name: 'logos-agency-dashboard',
    script: 'dist/index.js',
    node_args: '--experimental-specifier-resolution=node',
    max_restarts: 10,
    restart_delay: 5000,
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
