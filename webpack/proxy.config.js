const env = {
  local: 'http://localhost.gerry.com:3000',
  dev: 'http://project.gerry.com.com',
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
