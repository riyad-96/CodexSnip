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
      className="bg-code w-full max-w-[450px] rounded-2xl p-4 shadow"
    >
      <div>
        <h4 className="text-code-800 text-xl font-medium">{title}</h4>
        <p className="py-4">{description}</p>
      </div>
      <div className="flex justify-end gap-1">
        <GlossyButton
          content={
            <span className="grid h-7.5 place-items-center px-4 text-sm tracking-wide">
              Cancel
            </span>
          }
          onClick={cancelFn}
        />
        <GlossyButton
          content={
            <span className="grid h-7.5 w-[75px] place-items-center bg-red-200 text-sm tracking-wide">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs opacity-80"></span>
              ) : (
                <span>Delete</span>
              )}
            </span>
          }
          onClick={() => {
            if (isLoading) return;
            clickFn();
          }}
        />
      </div>
    </Modal>
  );
}
