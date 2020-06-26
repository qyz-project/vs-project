import * as api from './smarthome-store-api'

test('api test', async () => {
  await api.start()
  expect(typeof api.getDevice(1)).toBe('object')
  expect(typeof api.getDevice(1)).toBe('object')
  expect(typeof api.getRoom(9)).toBe('object')
  expect(typeof api.roomGetDevices(9)).toBe('object')
  expect(typeof api.getRooms()).toBe('object')
  expect(typeof api.getDevices()).toBe('object')
})
