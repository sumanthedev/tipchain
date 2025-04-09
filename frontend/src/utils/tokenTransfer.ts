import { Coin } from "@cosmjs/stargate";


export const toMicroXion = (xion: string): string => {
  const amount = parseFloat(xion);
  if (isNaN(amount)) {
    throw new Error("Invalid XION amount");
  }
  const microXion = Math.floor(amount * 1_000_000).toString();
  return microXion;
};


export const fromMicroXion = (uxion: string): string => {
  const amount = parseInt(uxion);
  if (isNaN(amount)) {
    throw new Error("Invalid xion amount");
  }
  return (amount / 1_000_000).toString();
};


export const sendXionTokens = async (
  client: any,
  senderAddress: string,
  recipientAddress: string,
  amount: string
) => {
  if (!client || !senderAddress || !recipientAddress || !amount) {
    throw new Error("Missing required parameters");
  }
  
  try {
    
    const coin: Coin = {
      denom: "xion",
      amount: amount
    };
    
    const result = await client.sendTokens(
      recipientAddress,
      senderAddress,
      [coin],
    );
    
    return result;
  } catch (error) {
    console.error("Token transfer error:", error);
    throw error;
  }
};


export const getXionBalance = async (
  queryClient: any,
  address: string
): Promise<string> => {
  if (!queryClient || !address) {
    throw new Error("Missing required parameters");
  }
  
  try {
    const balanceResponse = await queryClient.getHolding(address, "xion");
    
    return fromMicroXion(balanceResponse.amount);
  } catch (error) {
    console.error("Error getting balance:", error);
    throw error;
  }
}; 