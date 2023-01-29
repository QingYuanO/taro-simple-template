import mockjs from 'mockjs';

const Random = mockjs.Random;

const count = 105;
const originList = new Array(count).fill(null).map((item, idx) => ({
  id: idx,
  name: Random.cname() as string,
  number: 'P202203' + Random.integer(1, 1000),
  time: Random.now() as string,
  desc: Random.csentence() as string,
}));


export type MockList = typeof originList

export default {
  'GET /api/list': ctx => {
    ctx.res.send(
      mockjs.mock(options => {
        console.log(ctx.query);
        const query = ctx.query;
        let page = +query.page;
        let pageSize = +query.pageSize;
        let total = originList.length;
        let len = total / pageSize;
        const totalPage = Math.ceil(len);
        const list = originList.slice((page - 1) * pageSize, page * pageSize);

        return {
          code: 200,
          message: 'success',
          data: {
            page,
            pageSize,
            total,
            totalPage,
            isLastPage: page === totalPage,
            list,
          },
        };
      })
    );
  },
};
