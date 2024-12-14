import { perks, spells } from "../noita-data";

export const mustSpellTasks = spells.map(
	(spell) => `呪文「${spell}」を取得する`,
);
export const mustPerkTasks = perks.map((perk) => `特典「${perk}」を取得する`);
