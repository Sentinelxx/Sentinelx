import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
};

export default function() {
  let res = http.get('https://sentinel-interface-lyart.vercel.app/');
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
