import { useEffect, useRef } from 'react';

type EffectCallback = () => void | (() => void);

function useSingleEffect(effect: EffectCallback) {
  const calledOnce = useRef(false);
  const renderAfterCalled = useRef(false);

  const destroy = useRef<ReturnType<EffectCallback>>();

  if (calledOnce.current) renderAfterCalled.current = true;

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    calledOnce.current = true;
    destroy.current = effect();

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }

      if (destroy.current && typeof destroy.current === 'function')
        destroy.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useSingleEffect;
