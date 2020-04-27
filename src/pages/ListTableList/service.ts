import request from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/rule2', {
    params,
  });
}

export async function removeRule(params: { id: number }) {
  return request('/api/rule2', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/rule2', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule2', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
