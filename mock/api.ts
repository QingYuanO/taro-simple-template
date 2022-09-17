import mockjs from 'mockjs';

const Random = mockjs.Random;

const count = 100;
const originList = new Array(count).fill({
  id: Random.increment(),
  name: Random.ctitle(5, 10),
  number: 'P202203' + Random.integer(1, 1000),
  time: Random.now(),
  desc: Random.csentence(),
});

export default {
  'GET /api/tags': mockjs.mock((options) => {
    // console.log(options.url);

    // const body = JSON.parse(params.body);
    let { page, pageSize } = { page: 2, pageSize: 10 };
    let total = originList.length;
    let len = total / pageSize;
    const totalPage = Number.isInteger(len) ? len + 1 : len;
    const list = originList.slice((page - 1) * pageSize, page * pageSize);

    return {
      code: 200,
      message: 'success',
      data: {
        page,
        pageSize,
        total,
        totalPage,
        list,
      },
    };
  }),
};
