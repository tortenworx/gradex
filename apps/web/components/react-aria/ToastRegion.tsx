"use client";
import type { AriaToastRegionProps } from '@react-aria/toast';
import type { ToastState } from '@react-stately/toast';
import { useToastRegion } from '@react-aria/toast';
import { useRef } from 'react';
import Toast from './Toast';

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
}

export default function ToastRegion<T extends React.ReactNode>(
  { state, ...props }: ToastRegionProps<T>
) {
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);

  return (
    <div {...regionProps} ref={ref} className="bg-oct-darkgreen w-screen h-screen z-50">
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
}