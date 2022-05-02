import useMount from './useMount';
import { renderHook, act } from '@testing-library/react-hooks';

describe('test hooks', () => {
  test('test mount hook', () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useMount(fn));

    act(() => {
      console.log(result.container);
    });
    // expect(result.current).toBe(1);
  });
});
