import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('Test App cmp', () => {
  const setup = () => {
    const utils = render(<App />);
    const selectPrice = utils.getByTestId('select-price-testing');
    const selectGenre = utils.getByTestId('select-genre-testing');
    const input = utils.getByTestId('text-field-testing');
    return {
      selectPrice,
      selectGenre,
      input,
      ...utils
    };
  };
  test('on change select price', () => {
    const { selectPrice } = setup();
    fireEvent.click(selectPrice, { target: { value: '11' } });
    expect(selectPrice.value).toBe('11');
  });

  test('on change select genre', () => {
    const { selectGenre } = setup();
    fireEvent.click(selectGenre, { target: { value: '11' } });
    expect(selectGenre.value).toBe('11');
  });

  test('on change input', async () => {
    const { input } = setup();
    fireEvent.keyDown(input, { target: { key: 'Enter', value: '11    ' } });
    // const item = await screen.findByDisplayValue('11');
    // screen.debug();

    expect(input.value).toBe('11');
    // const trim = input.value.trim();
    // expect(trim).toBe('11');
  });
});
