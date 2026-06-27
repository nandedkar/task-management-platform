declare module 'bcryptjs' {
  type HashFunction = (value: string, saltRounds: number) => Promise<string>;

  const bcrypt: {
    hash: HashFunction;
  };

  export default bcrypt;
}