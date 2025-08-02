#!/bin/bash

# Define test scripts
LOAD_TEST="load-test.js"
STRESS_TEST="stress-test.js"
SPIKE_TEST="spike-test.js"

# Define log files
LOAD_LOG="load-test-results.txt"
STRESS_LOG="stress-test-results.txt"
SPIKE_LOG="spike-test-results.txt"

# Function to run a test and log the output
run_test() {
    TEST_NAME=$1
    TEST_FILE=$2
    LOG_FILE=$3

    echo "🚀 Running $TEST_NAME..."
    k6 run $TEST_FILE | tee $LOG_FILE
    echo "✅ Finished $TEST_NAME! Results saved to $LOG_FILE"
    echo "--------------------------------------------------"
}

# Run all tests one by one
run_test "Load Test" $LOAD_TEST $LOAD_LOG
run_test "Stress Test" $STRESS_TEST $STRESS_LOG
run_test "Spike Test" $SPIKE_TEST $SPIKE_LOG

# Display a summary of results
echo "🎯 All tests completed! Summary of results:"
echo "--------------------------------------------------"
grep "http_req_failed\|http_req_duration" $LOAD_LOG | tail -n 3
grep "http_req_failed\|http_req_duration" $STRESS_LOG | tail -n 3
grep "http_req_failed\|http_req_duration" $SPIKE_LOG | tail -n 3
echo "--------------------------------------------------"
echo "📊 Check the full logs for detailed results."