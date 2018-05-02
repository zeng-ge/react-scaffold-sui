import { eventTracking, tracking } from '../eventTracking'

describe('event tracking', () => {

  const axios = eventTracking.http.axios
  beforeEach(() => {
    axios.get = jest.fn()
  })

  test('shoud tracking() generate params right', async () => {
    await tracking('Login', 'cltjob')
    const calls = axios.get.mock.calls
    expect(calls[0][0]).toBe('/TrackLog')
    expect(calls[0][1]).toEqual(
      {
        params: {
          params: JSON.stringify({
            S_MODULE: 'Login',
            S_ACTION: 'cltjob',
          }),
        },
      }
    )
  })

  test('shoud tracking() get right result', async () => {
    axios.get.mockReturnValue(Promise.resolve({
      data: {
        ok: true,
      },
    }))

    const result = await tracking('Login', 'cltjob')
    expect(result).toEqual({
      data: { ok: true },
    })
  })
})
