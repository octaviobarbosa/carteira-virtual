interface ICreateWalletDTO {
  id?: string;
  user_id: string;
  operation: string;
  description: string;
  value: number;
  category_id?: string;
}

export { ICreateWalletDTO };
