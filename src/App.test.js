import {render, fireEvent, screen} from '@testing-library/react'
import Header from './Header'

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<Header />)

  const element = screen.getByTestId('my-test')
  fireEvent.change(element, {
    target: {value: 'chuck'},
  })

  expect(element).toHaveValue('chuck')
})