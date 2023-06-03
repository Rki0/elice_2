import { useContext } from 'react';
import { ReservationContext, ReservationInfo } from './ReservationProvider';
import { CreateTypeSelector } from './ReservationOptions';
import styles from './ReservationOptions.module.scss';

interface SeatLayoutProps {
  className: string;
  clickEvent?: (value: string) => void;
}
// 더미데이터
const alreadyReservedSeat = [
  '2',
  '3',
  '4',
  '7',
  '8',
  '10',
  '23',
  '31',
  '32',
  '33',
  '34',
  '35',
  '39',
  '47',
  '55',
  '56',
  '57',
  '59',
  '61',
  '63',
  '66',
  '67',
  '69',
  '70',
  '71',
  '72',
  '77',
  '78',
  '79',
];

// axios.get('api', {
//   headers: {
//     date: reservationInfo.date,
//   },
// })
//   .then(response => {
//
//   })
//   .catch(error => {
//     // 에러 처리
//   });
// 날짜, 서버에 보내서 예약된 좌석 받아오기
// const { reserved, updateReserved } = useContext(ReservationContext);
// updateReserved(예약된 좌석 정보);
/* 받아오는 데이터 형식
      {
      "status": "success",
      "seats": [
        {
          "seat_number": "A1",
          "available_10to14": true,
          "available_14to18": false,
          "available_18to22": true
        },
        {
          "seat_number": "A2",
          "available_10to14": true,
          "available_14to18": true,
          "available_18to22": false
        },
        {
          "seat_number": "A3",
          "available_10to14": false,
          "available_14to18": true,
          "available_18to22": true
        },
        ...
      ]
    }
   */

function drawPersonalSeatLayout(
  startSeatNumber: number,
  reserved: string[],
  onClick?: (value: string) => void,
): JSX.Element[] {
  const seatingCapacity: number = 12;
  const visibleSeats: number[] = [1, 3, 5, 8, 10, 12];
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber;

  for (let i = 1; i <= seatingCapacity; i++) {
    const key = keyValue.toString();
    const isImpossibleSeat = alreadyReservedSeat.includes(key);
    // const isImpossibleSeat = !reserved.includes(key);
    const className = isImpossibleSeat
      ? `${styles.visible} ${styles.alreadyReserved}`
      : styles.visible;
    const event = !isImpossibleSeat
      ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          onClick?.(event.currentTarget.textContent || '')
      : undefined;

    if (visibleSeats.includes(i)) {
      seats.push(
        <div key={key} className={className} onClick={event}>
          {key}
        </div>,
      );
      keyValue++;
    } else {
      seats.push(<div key={i + 200} className={styles.invisible}></div>);
    }
  }

  return seats;
}

function drawGroupSeatLayout(
  startSeatNumber: number,
  reserved: string[],
  onClick?: (value: string) => void,
): JSX.Element[] {
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber;

  for (let i = 1; i <= 4; i++) {
    const key = keyValue.toString();
    const isImpossibleSeat = alreadyReservedSeat.includes(key);
    // const isImpossibleSeat = !reserved.includes(key);
    const className = isImpossibleSeat
      ? `${styles.visible} ${styles.groupSeat} ${styles.alreadyReserved}`
      : `${styles.visible} ${styles.groupSeat}`;
    const event = !isImpossibleSeat
      ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          onClick?.(event.currentTarget.textContent || '')
      : undefined;

    seats.push(
      <div key={key} className={className} onClick={event}>
        {key}
      </div>,
    );
    keyValue++;
  }

  for (let i = 5; i <= 6; i++) {
    const key = keyValue.toString();
    const isImpossibleSeat = alreadyReservedSeat.includes(key);
    // const isImpossibleSeat = !reserved.includes(key);
    const className = isImpossibleSeat
      ? `${styles.visible} ${styles.groupSeat} ${styles.alreadyReserved}`
      : `${styles.visible} ${styles.groupSeat}`;
    const event = !isImpossibleSeat
      ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          onClick?.(event.currentTarget.textContent || '')
      : undefined;

    seats.push(
      <div key={key} className={className} onClick={event}>
        {key}
      </div>,
    );
    keyValue++;
  }

  return seats;
}

function drawGraduateSeatLayout(
  startSeatNumber: number,
  reserved: string[],
  onClick?: (value: string) => void,
): JSX.Element[] {
  const seatingCapacity: number = 12;
  const visibleSeats: number[] = [2, 4, 7, 9, 12];
  const seats: JSX.Element[] = [];
  let keyValue = startSeatNumber;

  for (let i = 1; i <= seatingCapacity; i++) {
    const key = keyValue.toString();
    const isImpossibleSeat = alreadyReservedSeat.includes(key);
    // const isImpossibleSeat = !reserved.includes(key);
    const className = isImpossibleSeat
      ? `${styles.visible} ${styles.graduateSeat} ${styles.alreadyReserved}`
      : `${styles.visible} ${styles.graduateSeat}`;
    const event = !isImpossibleSeat
      ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          onClick?.(event.currentTarget.textContent || '')
      : undefined;

    if (visibleSeats.includes(i)) {
      seats.push(
        <div key={key} className={className} onClick={event}>
          {key}
        </div>,
      );
      keyValue++;
    } else {
      seats.push(<div key={i + 200} className={styles.invisible}></div>);
    }
  }

  return seats;
}

function PersonalSeatLayout({ className, clickEvent }: SeatLayoutProps) {
  const { reserved } = useContext(ReservationContext);
  return (
    <>
      <div className={className}>
        {drawPersonalSeatLayout(1, reserved, clickEvent)}
      </div>
      <div className={className}>
        {drawPersonalSeatLayout(7, reserved, clickEvent)}
      </div>
      <div className={className}>
        {drawPersonalSeatLayout(13, reserved, clickEvent)}
      </div>
      <div className={className}>
        {drawPersonalSeatLayout(19, reserved, clickEvent)}
      </div>
      <div className={className}>
        {drawPersonalSeatLayout(25, reserved, clickEvent)}
      </div>
    </>
  );
}

function FirstGroupSeatLayout({ className, clickEvent }: SeatLayoutProps) {
  const { reserved } = useContext(ReservationContext);
  return (
    <>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(31, reserved, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(37, reserved, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(43, reserved, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(49, reserved, clickEvent)}
      </div>
    </>
  );
}

function GraduateSeatLayout({ className, clickEvent }: SeatLayoutProps) {
  const { reserved } = useContext(ReservationContext);

  return (
    <>
      <div className={`${styles.graduateSeat} ${className}`}>
        {drawGraduateSeatLayout(55, reserved, clickEvent)}
      </div>
      <div className={`${styles.graduateSeat} ${className}`}>
        {drawGraduateSeatLayout(60, reserved, clickEvent)}
      </div>
    </>
  );
}

function SecondGroupSeatLayout({ className, clickEvent }: SeatLayoutProps) {
  const { reserved } = useContext(ReservationContext);
  return (
    <>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(65, reserved, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(71, reserved, clickEvent)}
      </div>
      <div className={`${styles.group} ${className}`}>
        {drawGroupSeatLayout(77, reserved, clickEvent)}
      </div>
    </>
  );
}

const ShowSeatLayout: React.FC = () => {
  const { reservationInfo, updateReservationInfo } =
    useContext(ReservationContext);

  const updateReservation = (updatedInfo: Partial<ReservationInfo>) => {
    const updatedReservationInfo = {
      ...reservationInfo,
      ...updatedInfo,
    };
    updateReservationInfo(updatedReservationInfo);
  };

  const handleClickEvent = (value: string) => {
    updateReservation({ seat: value });
  };

  const ShowSeatLayout = () => {
    if (reservationInfo.seatType === '개인석') {
      return (
        <>
          <div className={styles.seatKindContainer}>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>다른좌석유형/이용불가</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>내예약</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능</div>
            </div>
          </div>
          <div className={styles.seatContainer}>
            <PersonalSeatLayout
              className={styles.possible}
              clickEvent={handleClickEvent}
            />
            <FirstGroupSeatLayout className={styles.impossible} />
            <GraduateSeatLayout className={styles.impossible} />
            <SecondGroupSeatLayout className={styles.impossible} />
          </div>
        </>
      );
    } else if (reservationInfo.seatType === '팀플석') {
      return (
        <>
          <div className={styles.seatKindContainer}>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>다른좌석유형/이용불가</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>내예약</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (4인석)</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (2인석)</div>
            </div>
          </div>
          <div className={styles.seatContainer}>
            <PersonalSeatLayout className={styles.impossible} />
            <FirstGroupSeatLayout
              className={styles.possible}
              clickEvent={handleClickEvent}
            />
            <GraduateSeatLayout className={styles.impossible} />
            <SecondGroupSeatLayout
              className={styles.possible}
              clickEvent={handleClickEvent}
            />
          </div>
        </>
      );
    } else if (reservationInfo.seatType === '수료기수석') {
      return (
        <>
          <div className={styles.seatKindContainer}>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>다른좌석유형/이용불가</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>내예약</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (개인석)</div>
            </div>
            <div>
              <div className={styles.box}></div>
              <div className={styles.kindText}>이용가능 (2인석)</div>
            </div>
          </div>
          <div className={styles.seatContainer}>
            <PersonalSeatLayout className={styles.impossible} />
            <FirstGroupSeatLayout className={styles.impossible} />
            <GraduateSeatLayout
              className={styles.possible}
              clickEvent={handleClickEvent}
            />
            <SecondGroupSeatLayout className={styles.impossible} />
          </div>
        </>
      );
    } else if (reservationInfo.seatType === '미팅룸') {
      return (
        <div>
          <CreateTypeSelector
            typeList={['미팅룸A (최대 6인)', '미팅룸B (최대 10인)']}
            onSelect={(value: string) => {
              updateReservation({ seat: value.charAt(3) });
            }}
          />
          <div className={styles.visitor}>모든 방문자 성함을 작성해주세요.</div>
          <input
            className={styles.visitorInput}
            onChange={e => {
              updateReservation({ visitors: e.target.value });
            }}
            type='text'
            placeholder='필수입력*'
          />
          <div className={styles.submitButton}>예약하기</div>
        </div>
      );
    } else {
      return null;
    }
  };

  return <>{ShowSeatLayout()}</>;
};

export default ShowSeatLayout;
