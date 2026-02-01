import type { ReactNode } from 'react';
import Button from './Button';
import Modal from './Modal';

type DeleteModalPropsType = {
  title: ReactNode;
  description: ReactNode;
  cancelFn: () => void;
  clickFn: () => void;
  isLoading: boolean;
};

export default function DeleteModal({
  title,
  description,
  cancelFn,
  clickFn,
  isLoading,
}: DeleteModalPropsType) {
  return (
    <Modal
      onMouseDown={cancelFn}
      className="w-full max-w-112.5 rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <div className="mb-6">
        <h4 className="mb-3">{title}</h4>
        <p className="text-neutral-600">{description}</p>
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={cancelFn}>
          <span className="grid h-9 place-items-center px-5">Cancel</span>
        </Button>
        <button
          disabled={isLoading}
          onClick={() => {
            if (isLoading) return;
            clickFn();
          }}
          className="grid h-9 min-w-22.5 place-items-center rounded-xl border border-red-600 bg-red-600 px-5 text-sm text-white transition-colors active:scale-98 pointer-fine:cursor-pointer"
        >
          <span>Delete</span>
        </button>
      </div>
    </Modal>
  );
}
