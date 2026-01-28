

Choosing and Defending the Best Algorithm
// check if tasks overlap

function isCompatible(schedule, task) {
  return schedule.every(t => task.start >= t.end || task.end <= t.start);
}

// Brute-Force Approach (Exponential) - This explores all subsets and keeps the largest compatible one.

function bruteForceActivitySelection(tasks) {
  let maxSet = [];

  function backtrack(index, currentSet) {
    if (index === tasks.length) {
      if (currentSet.length > maxSet.length) {
        maxSet = [...currentSet];
      }
      return;
    }

    // Option 1: skip current task
    backtrack(index + 1, currentSet);

    // Option 2: take current task if compatible
    if (isCompatible(currentSet, tasks[index])) {
      currentSet.push(tasks[index]);
      backtrack(index + 1, currentSet);
      currentSet.pop();
    }
  }

  backtrack(0, []);
  return maxSet;
}

// Greedy Approach (Earliest Finish Time)

function greedyActivitySelection(tasks) {
  const sorted = [...tasks].sort((a, b) => a.end - b.end);
  const result = [];

  let lastEnd = -Infinity;

  for (const task of sorted) {
    if (task.start >= lastEnd) {
      result.push(task);
      lastEnd = task.end;
    }
  }

  return result;
}

// Validate Correctness - Sample Input

const tasks = [
  { start: 1, end: 3 },
  { start: 2, end: 5 },
  { start: 4, end: 6 },
  { start: 6, end: 7 },
  { start: 5, end: 9 },
  { start: 8, end: 10 }
];

console.log(bruteForceActivitySelection(tasks));
console.log(greedyActivitySelection(tasks));


// Generate Random Tasks

function generateTasks(n) {
  const tasks = [];
  for (let i = 0; i < n; i++) {
    const start = Math.floor(Math.random() * 10000);
    const end = start + Math.floor(Math.random() * 50) + 1;
    tasks.push({ start, end });
  }
  return tasks;
}

const largeInput = generateTasks(10000);

// Timing

console.time("Greedy");
greedyMaxTasks(largeTasks);
console.timeEnd("Greedy");

// DO NOT run brute-force on 10,000 tasks
// bruteForceMaxTasks(largeTasks); // Practically impossible
// Brute-force becomes unusable beyond ~25 tasks
// Greedy finishes in milliseconds




Verifying correctness of other algorithms in tests

For a real-time delivery backend, brute-force is a non-starter.

