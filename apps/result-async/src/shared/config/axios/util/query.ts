import { Result, ResultAsync } from 'neverthrow';
import { ApiError } from '../error';

/**
 * ResultAsync를 Promise로 변환합니다.
 * React Query의 queryFn은 Promise를 요구하므로 필요합니다.
 */
export const toPromise = <T, E>(result: ResultAsync<T, E>): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    result.match(
      (data) => resolve(data),
      (error) => reject(error)
    );
  });
};

/**
 * 일반 Promise를 ResultAsync로 변환합니다.
 * 일반 Promise가 반환하는 API와 호환성을 위해 사용합니다.
 */
export const fromPromise = <T>(promise: Promise<T>): ResultAsync<T, ApiError> => {
  return ResultAsync.fromPromise(
    promise,
    (error) => new ApiError('API 호출 중 오류가 발생했습니다.', error)
  );
};

/**
 * 일반 Result를 Promise로 변환합니다.
 */
export const resultToPromise = <T, E>(result: Result<T, E>): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    result.match(
      (data) => resolve(data),
      (error) => reject(error)
    );
  });
}; 