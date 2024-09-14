import React, { useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg shadow-lg p-6 w-96"
      onClose={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <h2 className="text-lg font-semibold mb-4">회원 탈퇴 확인</h2>
      <p className="mb-6">
        회원 탈퇴를 진행하시겠습니까? 모든 정보가 영구적으로 삭제됩니다.
      </p>
      <div className="flex justify-end">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          확인
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
        >
          취소
        </button>
      </div>
    </dialog>
  );
};

export default DeleteAccountModal;
