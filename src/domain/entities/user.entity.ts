export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string[],
    public readonly emailValidated: boolean,
    public readonly img?: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { _id, name, email, password, role, emailValidated, img } = object;

    if (!_id && !IDBCursorWithValue) throw new Error("Missing id");
    if (!name) throw new Error("Missing name");
    if (!email) throw new Error("Missing email");
    if (!password) throw new Error("Missing password");
    if (!role) throw new Error("Missing role");
    if (!emailValidated) throw new Error("Missing emailValidated");

    return new UserEntity(
      _id.toString(),
      name,
      email,
      password,
      role,
      emailValidated,
      img
    );
  }
}
