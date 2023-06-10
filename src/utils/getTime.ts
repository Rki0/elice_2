/**
 * YYYY-MM-DD 형식의 현재 날짜 데이터를 얻는 함수
 * @returns YYYY-MM-DD 형식의 현재 날짜 데이터
 */
export function getDate(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  const dateString = year + '-' + month + '-' + day;

  return dateString;
}

/**
 * HH:00 형식의 현재 시간 데이터를 얻는 함수
 * @returns HH:00 형식의 시현재 간 데이터
 */
export function getHour(): string {
  const today = new Date();

  const hour = today.getHours();

  return `${hour}:00`;
}
