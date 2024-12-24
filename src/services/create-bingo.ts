import { easyTasks } from "../constants/tasks/easy-task";
import { hardTasks } from "../constants/tasks/hard-task";
import { mustPerkTasks, mustSpellTasks } from "../constants/tasks/must-task";
import { normalTasks } from "../constants/tasks/normal-task";
import Chance from "chance";
import type { Task } from "../interfaces/task";

function selectRandomItemsFromArray<T>(
	amount: number,
	targetArray: T[],
	chance: Chance.Chance,
) {
	const sourceArray = structuredClone(targetArray);
	const array = [];
	for (let i = 0; i < amount; i++) {
		const targetIndex = chance.integer({ min: 0, max: sourceArray.length - 1 });
		array.push(sourceArray[targetIndex]);
		sourceArray.splice(targetIndex, 1);
	}
	return array;
}

export function createBingo(
	seed: number | string,
	mustTaskSize = 20,
	bingoMaxNumber = 75,
) {
	const chance = new Chance(seed);
	const totalTaskSize =
		easyTasks.length + normalTasks.length + hardTasks.length - mustTaskSize;

	if (totalTaskSize < bingoMaxNumber) {
		throw new Error("ビンゴのタスク数が足りていません");
	}

	const bingoTasks: string[] = [];

	const mustPerkTaskSize = Math.floor(mustTaskSize / 2);
	const mustSpellTaskSize = mustTaskSize - mustPerkTaskSize;

	bingoTasks.push(
		...selectRandomItemsFromArray(mustPerkTaskSize, mustPerkTasks, chance),
	);
	bingoTasks.push(
		...selectRandomItemsFromArray(mustSpellTaskSize, mustSpellTasks, chance),
	);

	console.log(bingoTasks);

	const requiredTaskSize = bingoMaxNumber - mustTaskSize;
	const optionalTaskTypes: Task[] = [];

	let easyTaskAmount = easyTasks.length;
	let normalTaskAmount = normalTasks.length;
	let hardTaskAmount = hardTasks.length;

	while (optionalTaskTypes.length < requiredTaskSize) {
		const rand = chance.integer({ min: 1, max: 100 });

		if (rand < 25 && easyTaskAmount > 0) {
			easyTaskAmount--;
			optionalTaskTypes.push("easy");
		} else if (rand < 85 && normalTaskAmount > 0) {
			normalTaskAmount--;
			optionalTaskTypes.push("normal");
		} else if (hardTaskAmount > 0) {
			hardTaskAmount--;
			optionalTaskTypes.push("hard");
		}
	}

	const taskCount = optionalTaskTypes.reduce<Record<Task, number>>(
		(acc, char) => {
			acc[char]++;
			return acc;
		},
		{ easy: 0, normal: 0, hard: 0 },
	);

	console.debug(taskCount);

	bingoTasks.push(
		...selectRandomItemsFromArray(taskCount.easy, easyTasks, chance),
	);
	bingoTasks.push(
		...selectRandomItemsFromArray(taskCount.normal, normalTasks, chance),
	);
	bingoTasks.push(
		...selectRandomItemsFromArray(taskCount.hard, hardTasks, chance),
	);

	const map = new Map<number, string>();

	for (const [index, text] of chance.shuffle(bingoTasks).entries()) {
		map.set(index + 1, text);
	}

	return map;
}
