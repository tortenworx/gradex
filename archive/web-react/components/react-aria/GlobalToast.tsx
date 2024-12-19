import { ToastQueue, useToastQueue } from '@react-stately/toast';
import { createPortal } from 'react-dom';
import ToastRegion from './ToastRegion';

// Create a global toast queue.
export const toastQueue = new ToastQueue({
  maxVisibleToasts: 5
});

export default function GlobalToastRegion(props) {
  // Subscribe to it.
  const state = useToastQueue(toastQueue);

  // Render toast region.
  return state.visibleToasts.length > 0
    ? createPortal(<ToastRegion {...props} state={state} />, document.body)
    : null;
}