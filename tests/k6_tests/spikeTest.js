import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 500 }, // Sudden spike to 500 users
    { duration: '1m', target: 500 },  // Hold spike load
    { duration: '10s', target: 0 },   // Drop to 0
  ],
};

export default function () {
  let res = http.get('https://sentinel-interface-lyart.vercel.app/');

  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(0.5);
}
