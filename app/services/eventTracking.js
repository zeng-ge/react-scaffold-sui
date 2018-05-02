import Http from './http'

class EventTracking {
  constructor() {
    this.http = new Http()
  }

  tracking = async (module, action) => {
    const params = {
      S_MODULE: module,
      S_ACTION: action,
    }

    return await this.http.axios.get('/TrackLog', {
      params: {
        params: JSON.stringify(params),
      },
    })
  }
}

/**
 * export eventTracking是为了方便写测试, 便于mock axios实例
*/
const eventTracking = new EventTracking()
const { tracking } = eventTracking
export { tracking, eventTracking }
