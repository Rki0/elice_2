export interface ModalState {
  isConfirmModalOpen: boolean;
  isChatModalOpen: boolean;
  isMyRevervationModalOpen: boolean;
}

/**
 * @props modalMessage 모달에 들어갈 메세지
 * @props modalController 추후 확인 버튼을 통해 api 연동할 때 넘겨줄 함수
 */
export interface ModalProps {
  modalMessage: string;
  modalController?: () => void;
}

/**
 * @props title 모달 제목
 * @props children 모달 안 컴포넌트
 * @props modalType 풀모달 사용하는 타입은 2가지임-예약조회, 채팅
 */
export interface FullModalProps {
  title: string;
  children: React.ReactNode;
  modalType: string;
}