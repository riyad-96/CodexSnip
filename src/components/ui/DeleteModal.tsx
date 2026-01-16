import type { ReactNode } from 'react';
import Modal from './ModalLayout';
import GlossyButton from './GlossyButton';

type DeleteModalPropsType = {
  layoutId?: string;
  title: ReactNode;
  description: ReactNode;
  cancelFn: () => void;
  clickFn: () => void;
  isLoading: boolean;
};

export default function DeleteModal({
  layoutId,
  title,
  description,
  cancelFn,
  clickFn,
  isLoading,
}: DeleteModalPropsType) {
  return (
    <Modal
      layoutId={layoutId}
      onMouseDown={cancelFn}
      className="w-full max-w-[450px] rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <div className="mb-6">
        <h4 className="mb-3 tracking-tight">{title}</h4>
        <p className="leading-relaxed text-neutral-600">{description}</p>
      </div>
      <div className="flex justify-end gap-2">
        <GlossyButton
          content={
            <span className="grid h-9 place-items-center px-5">Cancel</span>
          }
          onClick={cancelFn}
        />
        <button
          onClick={() => {
            if (isLoading) return;
            clickFn();
          }}
          className="grid h-9 min-w-22.5 place-items-center rounded-xl border border-red-600 bg-red-600 px-5 text-sm text-white transition-colors active:scale-98 pointer-fine:cursor-pointer"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs opacity-80"></span>
          ) : (
            <span>Delete</span>
          )}
        </button>
      </div>
    </Modal>
  );
}
