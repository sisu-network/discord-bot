import { Client } from "discord.js";

import { RoleManager } from "../classes/RoleManager";
import config from "../config.json";
import { getNames } from "../utils";

module.exports = async (client: Client): Promise<void> => {
  const guild = await client.guilds.fetch(config.guildId);

  if (!guild) return;
  const names = await getNames();

  const m = await guild.members.fetch();
  const members = m.filter((member) =>
    Boolean(member && member.user && !member.user.bot)
  );

  const manager = new RoleManager(members);
  const keys = manager.findKeys(names);
  keys.forEach((key) => {
    manager.addRole(key, config.testnet1SupporterRoleId);
  });

  console.log({
    members: manager.addedRoleMembers,
    count: manager.addedRoleMembers.length,
  });
};
