import React from 'react';

import styles from './seatOption.module.scss';
import ZoneOption from './ZoneOption';

interface SeatOptionInterface {
  zoneOption: string;
  zoneChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  seatInput: string;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SeatOption(props: SeatOptionInterface) {
  const zoneArr = [
    {
      zoneName: '-공간 선택-',
      zoneValue: '',
    },
    {
      zoneName: '개인석',
      zoneValue: '개인석',
    },
    {
      zoneName: '팀플석(4인)',
      zoneValue: '팀플석(4인)',
    },
    {
      zoneName: '팀플석(2인)',
      zoneValue: '팀플석(2인)',
    },
    {
      zoneName: '미팅룸',
      zoneValue: '미팅룸',
    },
  ];

  return (
    <div className={styles.optionDiv}>
      <label>좌석 선택</label>

      <div className={styles.selectDiv}>
        {/* <select
          value={props.zoneOption}
          onChange={props.zoneChangeHandler}
          className={styles.select}
        >
          <option value='default'>-공간 선택-</option>

          {zoneArr.map((zone, index) => (
            <option value={zone} key={index}>
              {zone}
            </option>
          ))}

          {zoneArr.map((data, index) => (
            <option value={data.zoneValue} key={index}>
              {data.zoneName}
            </option>
          ))}
        </select> */}

        <div className={styles.zoneDiv}>
          <ZoneOption
            zoneOption={props.zoneOption}
            changeHandler={props.zoneChangeHandler}
          />
        </div>

        {/* <ZoneOption
          zoneOption={props.zoneOption}
          changeHandler={props.zoneChangeHandler}
        /> */}

        <input
          type='text'
          placeholder='좌석 번호를 입력해주세요.'
          className={styles.input}
          maxLength={10}
          minLength={1}
          value={props.seatInput}
          onChange={props.inputHandler}
        />
      </div>
    </div>
  );
}

export default SeatOption;
