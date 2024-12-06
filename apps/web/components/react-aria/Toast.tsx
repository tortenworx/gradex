"use client";
import type { AriaToastProps } from '@react-aria/toast';
import { useToast } from '@react-aria/toast';
import { ToastState } from '@react-stately/toast';
import { useRef } from 'react';

// Reuse the Button from your component library. See below for details.

interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
}

export default function Toast<T extends React.ReactNode>({ state, ...props }: ToastProps<T>) {
  const ref = useRef(null);
  const { toastProps, contentProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    ref
  );

  return (
    <div {...toastProps} ref={ref} className="bg-oct-yellow px-8 py-4">
      <div {...contentProps}>
        <div {...titleProps}>{props.toast.content}</div>
      </div>
      <button {...closeButtonProps}>x</button>
    </div>
  );
}