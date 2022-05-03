import useMount from './useMount';
import { renderHook } from '@testing-library/react-hooks/dom';

describe('test hooks', () => {
  test('test mount hook', () => {
    const countSpy = jest.spyOn(console, 'count');
    renderHook(({ func, deps }) => useMount(func, deps), {
      initialProps: {
        func: jest.fn(),
        deps: []
      }
    });
    expect(countSpy).toBeCalledTimes(0);
  });
});
