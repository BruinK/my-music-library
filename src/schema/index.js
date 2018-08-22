import { schema } from 'normalizr';


// const personInfo = new schema.Entity('personInfo', {}, {
//   idAttribute: 'mid'
// });
// export const PERSONINFO = personInfo;

export const PERSONINFO = new schema.Entity('personInfo', {}, {
  idAttribute: 'mid'
});


const list = new schema.Entity('list', {}, {
  idAttribute: 'id'
});
export const LIST = [list];

