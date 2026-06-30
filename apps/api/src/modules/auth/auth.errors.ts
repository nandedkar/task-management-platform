export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists');
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid email or password');
  }
}

export class UserInactiveError extends Error {
  constructor() {
    super('User is inactive');
  }
}

export class RoleNotFoundError extends Error {
  constructor() {
    super('Default Role not found');
  }
}
