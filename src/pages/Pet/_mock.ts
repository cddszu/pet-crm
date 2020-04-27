// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from './data.d';


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

// mock tableListDataSource

function getPetName(index: number) {
  const nameList = ['柴犬', '贵宾犬', '杜宾犬', '吉娃娃', '法国斗牛犬', '沙皮狗', '阿拉斯加犬', '秋田犬', '牧羊犬', '藏獒']
  const i = randomNum(0, nameList.length)
  return nameList[i]
}



const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    const type = getPetName(index)
    tableListDataSource.push({
      id: index,
      name: `${type} ${index}`,
      type: `${type}`,
      master: `主人${index}`,
      birth: `生日${index}`,
      ill: `病情${index}`,
      desc: `描述${index}`,
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 10);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as TableListParams;

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
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
  const { method, name, id, type, master, birth, ill, desc} = body;
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
          type,
          master,
          birth,
          ill,
          desc
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
            newRule = { ...item, desc, name, type, master, birth, ill};
            return { ...item, desc, name, type, master, birth, ill};
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

function getMasList(req: Request, res: Response, u: string) {
  const list = [];
  for (let i = 0; i < 5; i += 1) {
    const index = i;
    list.push({
      id: index,
      value: `master${index}`,
    });
  }
  const result = {
    data: list,
    success: true,
  };

  return res.json(result);
}

export default {
  'GET /api/rule5': getRule,
  'POST /api/rule5': postRule,
  'GET /api/list5': getList,
  'GET /api/master5': getMasList,
};
