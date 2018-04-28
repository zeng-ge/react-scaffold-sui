const env = {
  local: 'http://localhost.paas.cmbuat.com:3000',
  dev: 'http://lphomepad-dev.paas.cmbuat.com',
}

const target = env.dev

module.exports = [
  {
    context: ['/mock/PaasClientServletForJson'],
    target: env.local,
    changeOrigin: true,
  },
  {
    context: ['/PaasClientServletForJson'],
    target,
    changeOrigin: true,
  },
  {
    context: ['/TrackLog'],
    target: env.dev,
    changeOrigin: true,
  },
]
