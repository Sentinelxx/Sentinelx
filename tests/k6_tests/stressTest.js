import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },  // Normal load
    { duration: '2m', target: 200 },  // Increased load
    { duration: '2m', target: 400 },  // Stress level
    { duration: '2m', target: 0 },    // Recovery
  ],
};

export default function () {
  let res = http.get('https://sentinel-interface-lyart.vercel.app/');

  check(res, {
    'is status 200': (r) => r.status === 200,
    'response time < 1000ms': (r) => r.timings.duration < 1000,
  });

  sleep(0.5);
}
