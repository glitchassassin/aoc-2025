import { readInput } from "../utils";

// const lines = readInput("sample2.txt").split("\n");
const lines = readInput("input.txt").split("\n");

const graph = new Map<string, string[]>();
const reverseGraph = new Map<string, string[]>();
for (const line of lines) {
  const [from, to] = line.split(": ");
  graph.set(from, to.split(" "));
  for (const toNode of to.split(" ")) {
    reverseGraph.set(toNode, [...(reverseGraph.get(toNode) ?? []), from]);
  }
}

// return a list of all paths from start to out
function graphSearch(from: string, to: string, graph: Map<string, string[]>) {
  const paths = [[from]];
  const finishedPaths = [];
  const visitedNodes = new Set<string>();
  let lastPathLength = 0;
  while (paths.length > 0) {
    const currentPath = paths.shift();
    if (!currentPath) break;
    // console.log(paths.length, finishedPaths.length, currentPath.length);
    if (currentPath.length > lastPathLength) {
      lastPathLength = currentPath.length;
      console.log("Path length", lastPathLength);
    }
    const current = currentPath.at(-1);
    if (!current) break;
    const nextPaths = graph.get(current);
    if (!nextPaths) continue;
    for (const path of nextPaths) {
      const newPath = [...currentPath, path];
      if (path === to) {
        finishedPaths.push(newPath);
      } else if (newPath.length !== new Set(newPath).size) {
        // path contains duplicates, skip
        throw new Error("Path contains duplicates");
      } else {
        visitedNodes.add(path);
        paths.push(newPath);
      }
    }
  }
  return [finishedPaths, visitedNodes] as const;
}

function countPaths(from: string, to: string, graph: Map<string, string[]>) {
  const pathsToPoint = new Map<string, number>();
  pathsToPoint.set(from, 1);

  const frontier = new Map<string, number>();
  frontier.set(from, 1);
  while (frontier.size > 0) {
    const current = frontier.keys().next().value;
    if (!current) break;
    const count = frontier.get(current);
    if (!count) continue;
    frontier.delete(current);
    const paths = graph.get(current);
    if (!paths) continue;
    for (const path of paths) {
      pathsToPoint.set(path, (pathsToPoint.get(path) ?? 0) + count);
      if (path !== to) {
        frontier.set(path, (frontier.get(path) ?? 0) + count);
      }
    }
  }

  const result = pathsToPoint.get(to);

  if (!result) {
    throw new Error("No path found");
  }

  return result;
}

const svrToFft = countPaths("fft", "svr", reverseGraph);
console.log("svrToFft", svrToFft);
const dacToOut = countPaths("dac", "out", graph);
console.log("dacToOut", dacToOut);

// const [svrToFft2] = graphSearch("fft", "svr", reverseGraph);
// console.log("svrToFft2", svrToFft2.length);
// const [dacToOut2] = graphSearch("dac", "out", graph);
// console.log("dacToOut2", dacToOut2.length);

const fftToDac = countPaths("dac", "fft", reverseGraph);
console.log("fftToDac", fftToDac);

console.log("total paths", svrToFft * fftToDac * dacToOut);
