import { Collection, GuildMember, Snowflake } from "discord.js";

class RoleManager {
  members: Collection<Snowflake, GuildMember>;
  addedRoleMembers: string[] = [];
  removedRoleMembers: string[] = [];

  constructor(members: Collection<Snowflake, GuildMember>) {
    this.members = members;
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

  hasRole(member: GuildMember, roleId: Snowflake): boolean {
    return member.roles.cache.has(roleId);
  }

  addRole(memberId: Snowflake, roleId: Snowflake): void {
    const member = this.members.get(memberId);
    if (member && !this.hasRole(member, roleId)) {
      member.roles.add(roleId);
      this.addedRoleMembers.push(member.user.tag);
    }
  }

  removeRole(memberId: Snowflake, roleId: Snowflake): void {
    const member = this.members.get(memberId);
    if (member && this.hasRole(member, roleId)) {
      member.roles.remove(roleId);
      this.removedRoleMembers.push(member.user.tag);
    }
  }
}

export { RoleManager };
