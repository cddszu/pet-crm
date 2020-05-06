// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from './data.d';
import { sprcialityList } from '../Speciality/_mock'



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

function getSpecial(index: number) {
  const nameList = sprcialityList
  const i = randomNum(0, nameList.length - 1)
  return nameList[i].name
}






// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index,
      name: `医生 ${index}`,
      specially: `特长${getSpecial(index)}`,
      phone: `phone ${index}`,
      age: randomNum(12,60),
      sex: randomNum(1,10) > 5 ? '男' : '女'
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 30);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10, searchKey = '' } = req.query;
  const params = (parse(realUrl, true).query as unknown) as TableListParams;

  let dataSource = [...tableListDataSource].filter((d) =>  d.name.toLocaleLowerCase().includes((searchKey as string).toLocaleLowerCase()))
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
  console.log('-----')
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, id, specially, sex, age, phone } = body;
  console.log(method)
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
          specially,
          sex, age, phone
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
            newRule = { ...item, desc, name, specially};
            return { ...item, desc, name, specially};
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

function getList(req: Request, res: Response, u: string) {
  const list = [];
  for (let i = 0; i < 5; i += 1) {
    const index = i;
    list.push({
      id: index,
      value: `list${index}`,
    });
  }
  const result = {
    data: list,
    success: true,
  };

  return res.json(result);
}

export default {
  'GET /api/rule4': getRule,
  'POST /api/rule4': postRule,
};
