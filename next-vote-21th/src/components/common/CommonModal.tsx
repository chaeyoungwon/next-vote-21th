import React from "react";

import { modalData } from "@/constants/modalData";

interface ButtonConfig {
  label: string;
  onClick: () => void;
  className: string;
}

interface CommonModalProps {
  messageKey: keyof typeof modalData;
  buttons: ButtonConfig[];
}

const CommonModal = ({ messageKey, buttons }: CommonModalProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
      <div className="flex h-[280px] w-[320px] flex-col overflow-hidden rounded-3xl bg-white md:h-[320px] md:w-[400px]">
        {/* 모달 본문 */}
        <div className="text-heading2 flex h-[217px] w-full flex-col items-center justify-center text-center md:h-[257px]">
          <div className="flex flex-col items-center justify-center gap-2">
            {modalData[messageKey].split("<br />").map((line, index) => (
              <span key={index}>{line}</span>
            ))}
          </div>
        </div>

        {/* 버튼 영역 */}
        {buttons.length === 1 ? (
          <button
            className={`text-heading2 text-gray-0 h-[63px] w-full cursor-pointer ${buttons[0].className}`}
            onClick={buttons[0].onClick}
          >
            {buttons[0].label}
          </button>
        ) : (
          <div className="text-heading2 text-gray-0 flex h-[63px] w-full items-center justify-end">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`h-full w-1/2 cursor-pointer ${button.className}`}
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonModal;
