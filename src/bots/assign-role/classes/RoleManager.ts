import { Collection, Guild, GuildMember, Snowflake } from "discord.js";

class RoleManager {
  members: Collection<Snowflake, GuildMember>;
  addedRoleMembers: string[] = [];
  removedRoleMembers: string[] = [];

  constructor(guild: Guild) {
    this.members = guild.members.cache.filter((member) =>
      Boolean(member && member.user && !member.user.bot)
    );
  }

  findKeys(names: string[]): string[] {
    const keys: string[] = [];

    names.forEach((name) => {
      const key = this.members.findKey(({ user }) => user.tag === name);

      if (key) {
        keys.push(key);
      }
    });

    return keys;
  }

  addRole(memberId: Snowflake, roleId: Snowflake): void {
    const member = this.members.get(memberId);
    if (member) {
      member.roles.add(roleId);
      this.addedRoleMembers.push(member.user.tag);
    }
  }

  removeRole(memberId: Snowflake, roleId: Snowflake): void {
    const member = this.members.get(memberId);
    if (member) {
      member.roles.remove(roleId);
      this.removedRoleMembers.push(member.user.tag);
    }
  }
}

export { RoleManager };
