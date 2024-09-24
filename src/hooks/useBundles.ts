import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state';
import { bundleStart, bundleComplete } from '../state/reducers/bundlesReducer';
import bundler from '../bundler';

export const useBundles = () => {
  const dispatch = useDispatch();
  const bundles = useSelector((state: RootState) => state.bundles);

  const createBundle = useCallback(
    async (cellId: string, input: string) => {
      dispatch(bundleStart(cellId));

      const result = await bundler(input);

      dispatch(
        bundleComplete({
          cellId,
          bundle: {
            code: result.code,
            err: result.error,
          },
        })
      );
    },
    [dispatch]
  );

  return {
    bundles,
    createBundle,
  };
};
