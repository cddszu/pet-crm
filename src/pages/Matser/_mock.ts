// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from '@/pages/Matser/data';

// mock tableListDataSource
function randomNum(minNum: number,maxNum: number){ 
  switch(arguments.length){ 
      case 1: 
          return parseInt((Math.random()*minNum+1,10).toString()); 
      break; 
      case 2: 
          return parseInt((Math.random()*(maxNum-minNum+1)+minNum).toString(),10); 
      break; 
          default: 
              return 0; 
          break; 
  } 
} 
const nameList = ['张观博', '张欣竹', '张欣阳', '张刚军', '张扬阳', '张靖阳', '张熙阳', '张嘉萱', '张铭阳', '张飞', '张雨荨', '张文博', '张诗含', '张诗若', '李四', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']

const genList = (current: number, pageSize: number) => {
  pageSize = nameList.length

  const tableListDataSource: TableListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index,
      name: `${nameList[index]}`,
      address: `address${index}`,
      city: `city ${index}`,
      phone: `phone ${index}`,
      age: randomNum(12,60),
      sex: randomNum(1,10) > 5 ? '男' : '女'
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

export const mastList =  tableListDataSource

export  function getMaster(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10, searchKey = '' } = req.query;
  const params = (parse(realUrl, true).query as unknown) as TableListParams;
  let dataSource = [...tableListDataSource].filter(d => d.name.toLocaleLowerCase().includes((searchKey as string).toLocaleLowerCase()))
  let total = dataSource.length

  dataSource = dataSource.slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }
  const result = {
    data: dataSource,
    total,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  // console.log('-----')
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, id, address, city, phone,age, sex} = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => id !== item.id);
      console.log(tableListDataSource)
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule = {
          id: tableListDataSource.length,
          name,
          address,
          city,
          phone,
          age,
          sex
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.id === id) {
            newRule = { ...item, name, address, city, phone };
            return { ...item, name, address, city, phone };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

function getMasList(req: Request, res: Response, u: string) {
  const list = [];
  for (let i = 0; i < tableListDataSource.length; i += 1) {
    const index = i;
    list.push({
      id: index,
      value: tableListDataSource[i].name,
    });
  }
  const result = {
    data: list,
    success: true,
  };

  return res.json(result);
}


export default {
  'GET /api/getMasterList': getMaster,
  'POST /api/getMasterList': postRule,
  'GET /api/master5': getMasList,
};
