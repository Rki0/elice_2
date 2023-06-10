import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import FullModal from '../common/FullModal';
import AdminProfile from './AdminProfile';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

import {
  addChat,
  setChatRoomDetail,
  setChatRoomDetailChatList,
} from 'reducers/chat';
import { online } from 'actions/access';

import { convertDate } from 'utils/convertDate';
import styles from './chatModal.module.scss';

/* 소켓 객체 */
import { io } from 'socket.io-client';

function ChatModal() {
  const [modalTitle, setModalTitle] = useState<string>('');
  // const {isAdmin} = useAppSelector(state => state.user); // 임의 -> 로그인 성공 후 전역으로 isAdmin 저장 성공 시 주석 해제
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // 임의 ~> 추후 로그인하고 res값으로 받은 admin boolean값 전역에 저장해주세요
  const [isOnline, setIsOnline] = useState<boolean>(true); // 임의 ~> 채팅 페이지에 머물러 있을 때 vs 로그인 했을 때 vs 사이트 창에 머물러 있을 때  기준 정해야함
  const [inputValue, setInputValue] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const dispatch = useAppDispatch();
  const { chatList } = useAppSelector(state => state.chat.chatRoomDetail);
  const chatRoomDetail = useAppSelector(state => state.chat.chatRoomDetail);

  /** 자동 스크롤 */
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  /** socket선언은 꼭꼭 사용하는 컴포넌트 내에서 선언해야 인식을 한다. */

  useEffect(() => {
    if (scrollContainerRef.current && chatList) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [chatList]);

  /** 소켓 연결 */
  useEffect(() => {
    dispatch(setChatRoomDetailChatList(chatList));
    const socket = io(`${process.env.REACT_APP_SOCKET_ENDPOINT}`, {
      path: '/socket.io',
      transports: ['websocket'],
    });
    socket.on('connect', () => {
      console.log('소켓 연결 성공');
      const userEmail = 'test3@example.com';
      const email = userEmail;
      const message = 'hi';
      // let interval = 2000;

      // setTimeout(() => {
      //   socket.emit('checkChatRoom', email, message);
      // }, interval);

      // socket.on('messages', messages => {
      //   console.log('messages:', messages, 'messages길이: ', messages.length);
      // });
    });
  }, []);

  /** 채팅 각 하나의 시간 */
  const nowDate = convertDate(new Date());
  const time = `${nowDate.split(' ')[4]} ${nowDate.split(' ')[5]}`; // 오전 1:11

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  /** 채팅방 첫 입성시 위에 제목, 날짜 결정 */
  useEffect(() => {
    console.log('채팅방 입장:', chatRoomDetail);
    setDate(convertDate(new Date()));
    /** 전역으로 관리되는 유저 정보 가져와서 분기 실행 */
    if (isAdmin) setModalTitle(chatRoomDetail.memberName);
    else setModalTitle('1:1 문의 채팅방');
  }, [chatRoomDetail, isAdmin, chatList]);

  /** 임의로 보내는 것 -> socket 연결되면 지워라 */
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      const newOtherChat = {
        chatFromMe: false,
        chatMessage: '무엇을 도와드릴까욧?',
        fromName: '성수동 소방관',
        isOnline: true,
        sentTime: time,
      };
      const newAnotherChat = {
        chatFromMe: false,
        chatMessage: `프로그래밍존 팀플석에서 물이 새요. 살려주세요.`,
        fromName: chatRoomDetail.memberName,
        isOnline: true,
        sentTime: time,
      };

      if (isAdmin) {
        dispatch(
          addChat({
            chatMessage: newAnotherChat,
          }),
        );
      } else {
        dispatch(addChat({ chatMessage: newOtherChat }));
      }
      count++;

      if (count === 5) {
        clearInterval(interval);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function handleSend() {
    if (inputValue.trim().length === 0) {
      return;
    }

    const newMyChat = {
      chatFromMe: true,
      chatMessage: inputValue,
      sentTime: time,
    };

    dispatch(addChat({ chatMessage: newMyChat }));

    setInputValue('');
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <FullModal title={modalTitle} modalType='chat'>
      <div className={styles.chatModalContainer}>
        <div className={styles.scrollContainer} ref={scrollContainerRef}>
          {!isAdmin && <AdminProfile isOnline={isOnline} />}
          <div className={styles.nowDate}>{date}</div>
          <div className={styles.chatListContainer}>
            {chatList?.map((msg, i) => (
              <ChatMessage
                key={i}
                chatFromMe={msg.chatFromMe}
                chatMessage={msg.chatMessage}
                fromName={msg.fromName}
                isOnline={msg.isOnline}
                sentTime={msg.sentTime}
              />
            ))}
          </div>
        </div>
        <div className={styles.chatInputContainer}>
          <ChatInput
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleClick={handleSend}
            handleEnter={handleEnter}
          />
        </div>
      </div>
    </FullModal>
  );
}

export default ChatModal;
