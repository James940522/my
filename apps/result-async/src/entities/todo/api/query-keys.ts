import { QueryParams } from '@/shared/model/types';
import { removeUndefined } from '@/shared/model/types';

export const TodoQueryKeys = {
  all: ['todos'],
  lists: () => [...TodoQueryKeys.all, 'list'],
  list: (queryParams?: QueryParams) => 
    removeUndefined([...TodoQueryKeys.lists(), queryParams]),
  details: () => [...TodoQueryKeys.all, 'detail'],
  detail: (id: number) => [...TodoQueryKeys.details(), id],
} as const; 