import Http from '../http'

describe('http service', () => {

  let http = null
  beforeEach(() => {
    http = new Http('lpclt')
    http.axios.post = jest.fn()
  })

  test('shoud buildWorkdbarParameters without special parameters work right', () => {
    const body = http.buildWorkdbarParameters('fakeWorkBar', [{ name: 'sky' }, { age: 20 }, [{ province: 'zhejiang' }]])
    expect(body).toEqual({
      fakeWorkBarX1: [{ name: 'sky' }],
      fakeWorkBarX2: [{ age: 20 }],
      fakeWorkBarX3: [{ province: 'zhejiang' }],
    })
  })

  test('shoud buildWorkdbarParameters with special parameters work right', () => {
    const body = http.buildWorkdbarParameters('fakeWorkBar', [
      { name: 'sky' },
      { age: 20 },
      {
        PLSPECUSER: { id: '123456' },
      },
    ])
    expect(body).toEqual({
      fakeWorkBarX1: [{ name: 'sky' }],
      fakeWorkBarX2: [{ age: 20 }],
      PLSPECUSER: [{ id: '123456' }],
    })
  })

  test('shoud buildResponse without public interface work right', () => {
    const response = {
      INFBDY: {
        fakeWorkBarZ1: [1],
        fakeWorkBarZ2: [2],
      },
    }
    const body = http.buildResponse(response, 'fakeWorkBar')
    expect(body).toEqual([[1], [2]])
  })

  test('shoud buildResponse with public interface work right', () => {
    const response = {
      INFBDY: {
        fakeWorkBarZ1: [1],
        fakeWorkBarZ2: [2],
        PLRECOSEND: [{ id: '123456' }],
      },
    }
    const body = http.buildResponse(response, 'fakeWorkBar')
    expect(body).toEqual([{ PLRECOSEND: [{ id: '123456' }]}, [1], [2]])
  })

  test('shoud http send without workbar parameters match response', async () => {
    http.axios.post.mockReturnValue(Promise.resolve({
      data: {
        INFBDY: {
          'fakeWorkBarZ1': [1],
          'fakeWorkBarZ2': [2],
        },
      },
    }))
    const response = await http.send('fakeWorkBar')
    expect(response).toEqual([[1], [2]])
  })

  test('shoud http send with special parameters match response', async () => {
    http.axios.post.mockReturnValue(Promise.resolve({
      data: {
        INFBDY: {
          PLRECOSEND: 'PLRECOSEND',
          'fakeWorkBarZ1': [1],
          PLSPECUSER: 'PLSPECUSER',
          'fakeWorkBarZ2': [2],
        },
      },
    }))
    const response = await http.send('fakeWorkBar', { PLSPECUSER: ['PLSPECUSER'], PLRECOSEND: {}})
    expect(response).toEqual([{ PLRECOSEND: 'PLRECOSEND', PLSPECUSER: 'PLSPECUSER' }, [1], [2]])
  })
})

